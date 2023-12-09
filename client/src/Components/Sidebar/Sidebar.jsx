import { FaBook, FaCalendar, FaHome, FaShoppingCart, FaThList, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
import {MdOutlineMenu} from 'react-icons/md'
import {GiStarsStack} from 'react-icons/gi'
import { NavLink } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useCart from '../../Hooks/useCart';

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [cart] = useCart()


  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mt-2"
        >
         <MdOutlineMenu/>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 space-y-1 w-80 min-h-full text-lg bg-base-200 text-base-content">
          {/* Sidebar content here */}
        
        {
          isAdmin ? <>
            <li>
            <NavLink to='/dashboard/adminhome' ><FaUser/> Admin Home</NavLink>
          </li>
            <li>
            <NavLink to='/dashboard/additems' ><FaThList/> Add Items</NavLink>
          </li>
            <li>
            <NavLink to='/dashboard/manageitems' ><FaUtensils/> Manage Items</NavLink>
          </li>
            <li>
            <NavLink to='/dashboard/managebookings' ><FaBook/> Manage Bookings</NavLink>
          </li>
            <li>
            <NavLink to='/dashboard/allusers' ><FaUsers/>All Users</NavLink>
          </li>
          </>
          : <>
              <li>
            <NavLink to='/dashboard/userhome' ><FaUser/> User Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/reservation' ><FaCalendar/> Reservation</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/cart' ><FaShoppingCart/>My Cart ({cart.length})</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/review' ><GiStarsStack/> Add Review</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/paymenthistory' ><FaBook/>Payment History</NavLink>
          </li>
          </>
        }


          <div className='divider'></div>
          <li>
          <NavLink to='/' ><FaHome/>Home</NavLink>
          </li>
          <li>
          <NavLink to='/menu' ><MdOutlineMenu/>Menu</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
