/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";


const AdminRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [isAdmin,isAdminLoading] = useAdmin()

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRouter;