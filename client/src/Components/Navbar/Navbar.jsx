import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import {FaShoppingCart} from "react-icons/fa"
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin()

  const handleLogOut = () => {
    logOut().then();
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Our Menu
      </NavLink>
      <NavLink
        to="/shop/salad"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Our Shop
      </NavLink>
      {
        user && isAdmin && <NavLink
        to="/dashboard/adminhome"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Dashboard
      </NavLink>
      }
      {
        user && !isAdmin && <NavLink
        to="/dashboard/userhome"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Dashboard
      </NavLink>
      }
      <NavLink
        to="/dashboard/cart"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <button className="btn btn-sm">
          <FaShoppingCart/>
          <div className="badge badge-secondary">+{cart?.length}</div>
        </button>
      </NavLink>
    </>
  );
  return (
    <>
      <div className="navbar fixed z-50 bg-black bg-opacity-40 text-white px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm text-lg font-medium gap-3 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="cursor-pointer text-2xl font-bold">BISTRO BOSS</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium gap-3">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogOut} className="btn btn-accent">
              {" "}
              Log Out
            </button>
          ) : (
            <Link to="/login">
              {" "}
              <button className="btn">Log In</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
