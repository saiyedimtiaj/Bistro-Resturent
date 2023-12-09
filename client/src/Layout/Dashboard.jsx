import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";


const Dashboard = () => {
    return (
        <div className="flex gap-5">
            <div className="min-h-screen">
                <Sidebar/>
            </div>
            <div className="flex-1 pr-5 pt-3">
                <Outlet/>
            </div>
        </div>
    );
};

export default Dashboard;