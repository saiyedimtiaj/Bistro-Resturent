const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xslrw3a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menusColluction = client.db('BistroDB').collection('menu')
    const reviewsColluction = client.db('BistroDB').collection('reviews')
    const cartColluction = client.db('BistroDB').collection('cart')
    const usersColluction = client.db('BistroDB').collection('users')
    const paymentsColluction = client.db('BistroDB').collection('payments')

    //middleware
     app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })

    // middlewares 
    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }

    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersColluction.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

    // users related api
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersColluction.find().toArray();
      res.send(result);
    });

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await usersColluction.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await usersColluction.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await usersColluction.insertOne(user);
      res.send(result);
    });

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await usersColluction.updateOne(filter, updatedDoc);
      res.send(result);
    })

    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usersColluction.deleteOne(query);
      res.send(result);
    })

    // menu related apis
    app.get('/menus', async (req, res) => {
      const result = await menusColluction.find().toArray();
      res.send(result);
    });

    app.get('/menus/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await menusColluction.findOne(query);
      res.send(result);
    })

    app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menusColluction.insertOne(item);
      res.send(result);
    });

    app.patch('/menus/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          recipe: item.recipe,
          image: item.image
        }
      }

      const result = await menusColluction.updateOne(filter, updatedDoc)
      res.send(result);
    })

    app.delete('/menus/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await menusColluction.deleteOne(query);
      res.send(result);
    })

    app.get('/reviews', async (req, res) => {
      const result = await reviewsColluction.find().toArray();
      res.send(result);
    })

    // carts collection
    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartColluction.find(query).toArray();
      res.send(result);
    });

    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartColluction.insertOne(cartItem);
      res.send(result);
    });

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await cartColluction.deleteOne(query);
      res.send(result);
    })

    app.post('/create-payment-intent',async(req,res)=>{
      const {price} = req.body;
      const amount = parseInt(price * 100)

      const paymentIntent = await stripe.paymentIntents.create({
        amount : amount,
        currency:'usd',
        payment_method_types:['card']
      })

      res.send({
        clientSecret: paymentIntent.client_secret,
      });

    })

    //payment api
    app.post('/payments', async(req,res)=>{
      const payment = req.body;
      const paymentResult = await paymentsColluction.insertOne(payment)
      console.log(payment);
      const query = {_id : {
        $in: payment.cartIds.map(id=> new ObjectId(id))
      }}
      const deleteResult = await cartColluction.deleteMany(query);
      res.send({paymentResult,deleteResult})
    })

    app.get('/payments/:email',verifyToken,async(req,res)=>{
      const query = {email:req.params.email};
      if(req.params?.email !== req.decoded.email){
        return res.status(403).send({message:'porviden access'})
      }
      const result = await paymentsColluction.find(query).toArray()
      res.send(result)
    })

    app.get('/admin-stats', verifyToken,verifyAdmin,async(req,res)=> {
      const user = await usersColluction.estimatedDocumentCount()
      const menuItems = await menusColluction.estimatedDocumentCount()
      const orders = await paymentsColluction.estimatedDocumentCount()

      // const payments = await paymentsColluction.find().toArray();
      // const revenue = payments.reduce((total,item)=>total + item?.price,0)

      const result = await paymentsColluction.aggregate([
        {
          $group: {
            _id:null,
            tottalRevenue : {
              $sum : '$price'
            }
          }
        }
      ]).toArray()

      const revenue = result.length > 0 ? result[0].tottalRevenue : 0

      res.send({
        user,
        menuItems,
        orders,
        revenue
      })
    })

    //using agratepipeline
    
    app.get('/order-state',async(req,res)=>{
      const result= await paymentsColluction.aggregate([
        {
          $unwind : '$menuItemIds'
        },
        {
          $lookup: {
            from: "menu",
            let: { menuItemId: { $toObjectId: "$menuItemIds" } }, // Convert menuItemIds to ObjectId
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$menuItemId", "$_id"], // Compare converted menuItemIds with _id in menuCollection
                  },
                },
              },
            ],
            as: "menuItems",
          }
        },
        {
          $unwind : '$menuItems'
        },
        {
          $group:{
            _id:'$menuItems.category',
            quantity:{ $sum: 1 },
            revenue : { $sum: '$menuItems.price'}
          }
        }
      ]).toArray()
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('boss is sitting')
})

app.listen(port, () => {
  console.log(`Bistro boss is sitting on port ${port}`);
})