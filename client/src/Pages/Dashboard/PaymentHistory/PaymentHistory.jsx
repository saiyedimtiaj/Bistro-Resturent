import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data:payments } = useQuery({
        queryKey: ['payments'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
      })

    return (
        <>
        <div className="mt-2 mb-5">
          <SectionHeading subHeading="At a Glance!" heading="PAYMENT HISTORY" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl font-semibold">Tottal Payment : {payments?.length}</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] text-white text-base">
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>TransctionId</th>
                  <th>Tottal Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  payments?.map((payment,index)=> <tr key={payment?._id}>
                      <th>
                          {index + 1}
                      </th>
                     <th>
                      <p>{payment?.email}</p>
                     </th>
                     <th>
                      <p>{payment?.transctionId}</p>
                     </th>
                     <th>
                      <p className="text-xl font-bold">${payment?.price}</p>
                     </th>
                     <th>
                      <p>{payment?.status}</p>
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

export default PaymentHistory;