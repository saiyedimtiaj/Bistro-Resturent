import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import Cart from '../Pages/Dashboard/Cart/Cart'
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/menu',
                element:<Menu/>
            },
            {
                path:'/shop',
                element:<Shop/>
            },
            {
                path:'/shop/:category',
                element:<Shop/>
            },
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<Signup/>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path:'/dashboard/cart',
                element:<Cart/>
            },
            {
                path:'/dashboard/payment',
                element:<Payment/>
            },
            {
                path:'/dashboard/paymenthistory',
                element:<PaymentHistory/>
            },
            {
                path:'/dashboard/userhome',
                element:<UserHome/>
            },




            {
                path:'/dashboard/allusers',
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:'/dashboard/additems',
                element:<AdminRoute><AddItems/></AdminRoute>
            },
            {
                path:'/dashboard/adminhome',
                element:<AdminRoute><AdminHome/></AdminRoute>
            },
            {
                path:'/dashboard/manageitems',
                element:<AdminRoute><ManageItem/></AdminRoute>
            },
        ]
    }
])

export default routes;