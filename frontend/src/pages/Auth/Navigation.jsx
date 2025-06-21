import "./Navigation.css";
import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineCrown,
  AiOutlineBell,
  AiOutlineTrophy,
  AiOutlineWallet,
  AiOutlineHeart,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { 
  FaGamepad, 
  FaCircle,
  FaCrown,
  FaCoins,
  FaGift,
  FaDiscord,
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaNintendoSwitch
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { performLogout } from "../../redux/actions/logoutActions";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(performLogout());
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(performLogout());
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getCartItemCount = () => {
    return cart.cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const navItems = [
    { path: '/', icon: AiOutlineHome, label: 'HOME', color: 'tech-blue' },
    { path: '/shop', icon: AiOutlineShopping, label: 'SHOP', color: 'tech-purple' },
    { path: '/cart', icon: AiOutlineShoppingCart, label: 'CART', color: 'tech-cyan', badge: getCartItemCount() },
    { path: '/orders', icon: AiOutlineOrderedList, label: 'ORDERS', color: 'tech-emerald' },
    { path: '/profile', icon: AiOutlineUser, label: 'PROFILE', color: 'tech-pink' },
  ];

  const adminItems = [
    { path: '/admin', icon: AiOutlineCrown, label: 'DASHBOARD', color: 'tech-yellow' },
    { path: '/admin/productlist', icon: AiOutlineShopping, label: 'PRODUCTS', color: 'tech-orange' },
    { path: '/admin/categorylist', icon: AiOutlineSetting, label: 'CATEGORIES', color: 'tech-red' },
    { path: '/admin/orderlist', icon: AiOutlineOrderedList, label: 'ORDERS', color: 'tech-indigo' },
    { path: '/admin/userlist', icon: AiOutlineUser, label: 'USERS', color: 'tech-violet' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-tech-black via-tech-dark to-tech-black border-r border-tech-blue/20 backdrop-blur-xl transition-all duration-500 ease-out z-50 ${
        sidebarExpanded ? 'w-72' : 'w-20'
      }`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-blue/5 via-transparent to-tech-purple/5 pointer-events-none"></div>
      
      <div className="relative h-full flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 py-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl flex items-center justify-center shadow-lg shadow-tech-blue/25">
                <FaGamepad className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-tech-emerald to-tech-cyan rounded-full border-2 border-tech-black animate-pulse"></div>
            </div>
            {sidebarExpanded && (
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
                  TECH STORE
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <FaCircle className={`text-xs ${isOnline ? 'text-tech-emerald' : 'text-tech-red'}`} />
                  <span className="text-xs text-tech-text-secondary font-medium">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                  <span className="text-xs text-tech-text-secondary">
                    • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Card */}
          {userInfo && sidebarExpanded && (
            <div className="relative overflow-hidden bg-gradient-to-r from-tech-dark/80 to-tech-gray/80 rounded-2xl p-4 border border-tech-blue/20 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-tech-emerald to-tech-cyan rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-display font-bold text-lg">
                        {userInfo.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-tech-yellow to-tech-orange rounded-full flex items-center justify-center">
                      {userInfo.isAdmin ? <FaCrown className="text-white text-xs" /> : <FaGamepad className="text-white text-xs" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-tech-white text-sm">{userInfo.username}</h3>
                    <span className="text-xs text-tech-text-secondary font-medium">
                      {userInfo.isAdmin ? 'Administrator' : 'Gamer'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 bg-tech-black/50 rounded-lg px-2 py-1">
                    <FaCoins className="text-tech-yellow" />
                    <span className="text-tech-text-secondary font-medium">1,250</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-tech-black/50 rounded-lg px-2 py-1">
                    <FaGift className="text-tech-pink" />
                    <span className="text-tech-text-secondary font-medium">3</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col space-y-2 mt-8">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className={`text-xs font-display font-bold text-tech-text-secondary uppercase tracking-wider mb-3 ${
              sidebarExpanded ? 'block' : 'hidden'
            }`}>
              Navigation
            </h3>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r from-${item.color}/20 to-${item.color}/10 border border-${item.color}/30 shadow-lg shadow-${item.color}/20`
                      : 'hover:bg-tech-light/20 hover:border hover:border-tech-blue/20'
                  }`}
                >
                  <div className={`relative ${isActive ? `text-${item.color}` : 'text-tech-text-secondary group-hover:text-white'}`}>
                    <Icon size={20} className="transition-all duration-300" />
                    {item.badge && item.badge > 0 && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-tech-red to-tech-orange rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{item.badge}</span>
                      </div>
                    )}
                  </div>
                  {sidebarExpanded && (
                    <span className={`text-sm font-display font-semibold transition-all duration-300 ${
                      isActive ? `text-${item.color}` : 'text-tech-text-secondary group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <div className={`absolute right-2 w-2 h-2 bg-gradient-to-r from-${item.color} to-${item.color} rounded-full animate-pulse`}></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Admin Navigation */}
          {userInfo?.isAdmin && (
            <div className="space-y-1 mt-6">
              <h3 className={`text-xs font-display font-bold text-tech-text-secondary uppercase tracking-wider mb-3 ${
                sidebarExpanded ? 'block' : 'hidden'
              }`}>
                Admin Panel
              </h3>
              {adminItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-r from-${item.color}/20 to-${item.color}/10 border border-${item.color}/30 shadow-lg shadow-${item.color}/20`
                        : 'hover:bg-tech-light/20 hover:border hover:border-tech-blue/20'
                    }`}
                  >
                    <div className={`relative ${isActive ? `text-${item.color}` : 'text-tech-text-secondary group-hover:text-white'}`}>
                      <Icon size={20} className="transition-all duration-300" />
                    </div>
                    {sidebarExpanded && (
                      <span className={`text-sm font-display font-semibold transition-all duration-300 ${
                        isActive ? `text-${item.color}` : 'text-tech-text-secondary group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                    )}
                    {isActive && (
                      <div className={`absolute right-2 w-2 h-2 bg-gradient-to-r from-${item.color} to-${item.color} rounded-full animate-pulse`}></div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Quick Actions */}
          {sidebarExpanded && (
            <div className="bg-tech-dark/50 rounded-xl p-3 border border-tech-blue/20">
              <h4 className="text-xs font-display font-bold text-tech-text-secondary uppercase tracking-wider mb-2">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 p-2 bg-tech-black/50 rounded-lg hover:bg-tech-blue/20 transition-colors duration-300">
                  <AiOutlineBell className="text-tech-blue text-sm" />
                  <span className="text-xs text-tech-text-secondary">Alerts</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-2 bg-tech-black/50 rounded-lg hover:bg-tech-purple/20 transition-colors duration-300">
                  <AiOutlineTrophy className="text-tech-purple text-sm" />
                  <span className="text-xs text-tech-text-secondary">Rewards</span>
                </button>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logoutHandler}
            className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-tech-red/20 to-tech-orange/20 hover:from-tech-red/30 hover:to-tech-orange/30 border border-tech-red/30 hover:border-tech-red/50 transition-all duration-300 hover:scale-105 group"
          >
            <AiOutlineLogout size={20} className="text-tech-red group-hover:text-tech-orange transition-colors duration-300" />
            {sidebarExpanded && (
              <span className="text-sm font-display font-semibold text-tech-red group-hover:text-tech-orange transition-colors duration-300">
                LOGOUT
              </span>
            )}
          </button>

          {/* Version Info */}
          {sidebarExpanded && (
            <div className="text-center">
              <p className="text-xs text-tech-text-secondary font-medium">
                Tech Store v2.0
              </p>
              <p className="text-xs text-tech-text-secondary">
                Powered by Gaming Tech
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
