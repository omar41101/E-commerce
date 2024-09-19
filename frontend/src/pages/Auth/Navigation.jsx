import "./Navigation.css";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { Dropdown } from "flowbite-react";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`fixed top-0 left-0 h-full p-4 bg-black text-white ${sidebarExpanded ? 'w-48' : 'w-16'} transition-all duration-300 ease-in-out z-50 flex flex-col justify-between`}
         onMouseEnter={() => setSidebarExpanded(true)}
         onMouseLeave={() => setSidebarExpanded(false)}>
      <div className="flex flex-col space-y-8">
        <Link to="/" className="flex items-center space-x-2 group">
          <AiOutlineHome size={24} className="group-hover:text-pink-500" />
          {sidebarExpanded && <span className="text-sm font-medium group-hover:text-pink-500">Home</span>}
        </Link>
        <Link to="/shop" className="flex items-center space-x-2 group">
          <AiOutlineShopping size={24} className="group-hover:text-pink-500" />
          {sidebarExpanded && <span className="text-sm font-medium group-hover:text-pink-500">Shop</span>}
        </Link>
        <Link to="/cart" className="flex items-center space-x-2 group">
          <AiOutlineShoppingCart size={24} className="group-hover:text-pink-500" />
          {sidebarExpanded && <span className="text-sm font-medium group-hover:text-pink-500">Cart</span>}
        </Link>
        <Link to="/favorite" className="flex items-center space-x-2 group relative">
          <FaHeart size={24} className="group-hover:text-pink-500" />
          {sidebarExpanded && <span className="text-sm font-medium group-hover:text-pink-500">Favorites</span>}
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative group ">
        {userInfo ? (
          <Dropdown
            label={userInfo.username}
            inline={true}
            arrowIcon={false}
            className={`${
              sidebarExpanded ? "block" : "hidden"
            } bg-black text-white ml-14 mt-3 `}
          >
            {userInfo.isAdmin && (
              <>
                <Dropdown.Item className="hover:text-pink-500">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-pink-500">
                  <Link to="/admin/productlist">Products</Link>
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-pink-500">
                  <Link to="/admin/categorylist">Categories</Link>
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-pink-500">
                  <Link to="/admin/orderlist">Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-pink-500">
                  <Link to="/admin/userlist">Users</Link>
                </Dropdown.Item>
              </>
            )}
            <Dropdown.Item className="hover:text-pink-500">
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-pink-500" onClick={logoutHandler}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex flex-col space-y-14">
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:translate-x-2 transition-transform group"
            >
              <AiOutlineLogin size={24} className="hover:text-pink-500" />
              <span
                className={`${
                  sidebarExpanded ? "inline-block" : "hidden"
                } text-sm font-medium hover:text-pink-500`}
              >
                Log In
              </span>
            </Link>

            <Link
              to="/register"
              className="flex items-center space-x-2 hover:translate-x-2 transition-transform group"
            >
              <AiOutlineUserAdd size={24} className="hover:text-pink-500" />
              <span
                className={`${
                  sidebarExpanded ? "inline-block" : "hidden"
                } text-sm font-medium hover:text-pink-500`}
              >
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
