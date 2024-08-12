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

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
    <div
      className={`fixed top-0 left-0 h-full p-4 text-white transition-all duration-300 ease-in-out bg-black ${
        sidebarExpanded ? "w-48" : "w-16"
      } flex flex-col justify-between z-50`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      <div className="flex flex-col space-y-8">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
        >
          <AiOutlineHome size={24} />
          <span
            className={`${
              sidebarExpanded ? "inline-block" : "hidden"
            } text-sm font-medium`}
          >
            Home
          </span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
        >
          <AiOutlineShopping size={24} />
          <span
            className={`${
              sidebarExpanded ? "inline-block" : "hidden"
            } text-sm font-medium`}
          >
            Shop
          </span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
        >
          <AiOutlineShoppingCart size={24} />
          <span
            className={`${
              sidebarExpanded ? "inline-block" : "hidden"
            } text-sm font-medium`}
          >
            Cart
          </span>
        </Link>

        <Link
          to="/favorite"
          className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
        >
          <FaHeart size={24} />
          <span
            className={`${
              sidebarExpanded ? "inline-block" : "hidden"
            } text-sm font-medium`}
          >
            Favorites
          </span>
        </Link>
      </div>

      <div className="relative group">
        {userInfo ? (
          <div
            className="flex items-center justify-between w-full text-sm font-medium text-white focus:outline-none cursor-pointer"
            onClick={toggleDropdown}
          >
            <span
              className={`${
                sidebarExpanded ? "inline-block" : "hidden"
              }`}
            >
              {userInfo.username}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </div>
        ) : null}

        {dropdownOpen && userInfo && sidebarExpanded && (
          <ul className="absolute left-0 bottom-full mb-2 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/logout"
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <div className="flex flex-col space-y-8">
          <Link
            to="/login"
            className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
          >
            <AiOutlineLogin size={24} />
            <span
              className={`${
                sidebarExpanded ? "inline-block" : "hidden"
              } text-sm font-medium`}
            >
              LOG IN
            </span>
          </Link>

          <Link
            to="/register"
            className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
          >
            <AiOutlineUserAdd size={24} />
            <span
              className={`${
                sidebarExpanded ? "inline-block" : "hidden"
              } text-sm font-medium`}
            >
              Register
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
