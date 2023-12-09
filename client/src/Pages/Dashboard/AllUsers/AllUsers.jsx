import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user?._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.name} is now updated to admin role`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <div className="mt-2 mb-5">
        <SectionHeading subHeading="How many??" heading="MANAGE ALL USERS" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-semibold">
            Tottal Users: {users?.length}
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-white text-base">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user?._id}>
                  <th>{index + 1}</th>
                  <th>
                    <p>{user?.name}</p>
                  </th>
                  <th>
                    <p>{user?.email}</p>
                  </th>
                  <th>
                    {user?.role === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-lg font-bold p-2 rounded bg-[#D1A054] text-white"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </th>
                  <th>
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="text-lg font-bold p-2 rounded bg-[#B91C1C] text-white"
                    >
                      <AiFillDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
