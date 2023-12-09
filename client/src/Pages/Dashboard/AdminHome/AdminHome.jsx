import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {FaBook, FaIdCard, FaTrash, FaUser} from 'react-icons/fa'

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl mt-7">
        <span>Hi,Welcome {user?.displayName ? user?.displayName : "Back"}</span>
      </h1>
      <div className="stats shadow mt-5">
        <div className="stat">
          <div className="stat-figure text-primary">
          <span className="text-4xl"><FaIdCard/></span>
          </div>
          <div className="stat-title">Tottal Revenue</div>
          <div className="stat-value text-primary">${Math.round(stats?.revenue)}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <span className="text-4xl"><FaUser/></span>
          </div>
          <div className="stat-title">Tottal User</div>
          <div className="stat-value text-secondary">{stats?.user}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <span className="text-4xl"><FaBook/></span>
          </div>
          <div className="stat-title">Tottal Menue</div>
          <div className="stat-value text-secondary">{stats?.menuItems}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
            <span className="text-4xl"><FaTrash/></span>
            </div>
          </div>
          <div className="stat-value">{stats?.orders}</div>
          <div className="stat-title">Orders</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
