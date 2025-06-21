import { logout } from '../features/auth/authSlice';
import { clearCart } from '../features/cart/cartSlice';
import { clearFavorites } from '../features/favorites/favoriteSlice';

// Comprehensive logout action that clears all state
export const performLogout = () => (dispatch) => {
  // Clear all Redux state
  dispatch(logout());
  dispatch(clearCart());
  dispatch(clearFavorites());
  
  // Clear all localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Clear any cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  
  // Clear any cached data
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Force page reload to clear any remaining state
  window.location.href = '/login';
};

// Logout without page reload (for SPA behavior)
export const performLogoutSPA = () => (dispatch) => {
  // Clear all Redux state
  dispatch(logout());
  dispatch(clearCart());
  dispatch(clearFavorites());
  
  // Clear all localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Clear any cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}; 