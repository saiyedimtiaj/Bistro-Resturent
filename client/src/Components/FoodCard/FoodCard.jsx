/* eslint-disable react/prop-types */
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth'
import useAxios from '../../Hooks/useAxios'
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const FoodCard = ({item}) => {
    const {name, image, recipe,price,_id} = item;
    const {user} = useAuth();
    const navegate = useNavigate();
    const location = useLocation();
    const axios = useAxios()
    const [,refetch] = useCart()

    const handleAddToCart = () => {
      if(user && user.email){
        const cartItem = {
          menuId : _id,
          email: user.email,
          name,
          price,
          image
        }
        axios.post('/carts',cartItem)
        .then(res=>{
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} added t the cart sucessfully`,
              showConfirmButton: false,
              timer: 2000
            });
            refetch()
          }
        })
      }
      else{
        Swal.fire({
          title: "You are not logged in ",
          text: "please login to add to the cart ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Please, Log In!"
        }).then((result) => {
          if (result.isConfirmed) {
            navegate('/login', {state:{from : location}})
          }
        });
      }
    }
  return (
    <div className="card bg-[#f2eded] rounded-none relative">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
        <p className="text-lg font-semibold absolute top-4 right-8 bg-black text-white px-3 py-1 rounded">${price}</p>
      <div className="card-body text-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button onClick={handleAddToCart} className="bg-[#c8c3c3] text-[#BB8506] px-5 py-2 font-medium">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
