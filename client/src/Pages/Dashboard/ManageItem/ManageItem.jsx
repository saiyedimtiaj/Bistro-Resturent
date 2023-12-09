import { BiEdit } from "react-icons/bi";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import UseMenu from "../../../Hooks/UseMenu";
import { AiFillDelete } from "react-icons/ai";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageItem = () => {
    const [menu,,refetch] = UseMenu();
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
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/menus/${id}`);
            console.log(res.data);
            if (res.data.deletedCount > 0) {
                // refetch to update the ui
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `item has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


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
            {/* <h1 className="text-3xl font-semibold">Items : {cart.length}</h1>
            <h1 className="text-3xl font-semibold">Tottal : {tottalPrice}</h1> */}
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
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  menu?.map((item,index)=> <tr key={item?._id}>
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
                      <button onClick={()=>handleDelete(item._id)} className="text-lg font-bold p-2 rounded bg-[#B91C1C] text-white"><AiFillDelete/></button>
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

export default ManageItem;