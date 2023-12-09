import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import useCart from "../../../Hooks/useCart";
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart,refetch] = useCart();
  const tottalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/carts/${id}`)
            .then(res=>{
              console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }

  return (
    <>
      <div className="mt-2 mb-5">
        <SectionHeading subHeading="Hurry Up!" heading="MANAGE ALL ITEMS" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-semibold">Items : {cart.length}</h1>
          <h1 className="text-3xl font-semibold">Tottal : {tottalPrice}</h1>
          {
            cart?.length ? <Link to='/dashboard/payment'><button className="btn btn-sm btn-secondary">Pay</button></Link> :
            <button disabled className="btn btn-sm btn-secondary">Pay</button>
          }
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-white text-base">
              <tr>
                <th></th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cart?.map((item,index)=> <tr key={item?._id}>
                    <th>
                        {index + 1}
                    </th>
                   <th>
                    <img className="h-12" src={item?.image} alt="" />
                   </th>
                   <th>
                    <p>{item?.name}</p>
                   </th>
                   <th>
                    <p className="text-xl font-bold">${item?.price}</p>
                   </th>
                   <th>
                    <button className="text-lg font-bold p-2 rounded bg-[#D1A054] text-white"><BiEdit/></button>
                   </th>
                   <th>
                    <button onClick={()=>handleDelete(item?._id)} className="text-lg font-bold p-2 rounded bg-[#B91C1C] text-white"><AiFillDelete/></button>
                   </th>
                 </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
