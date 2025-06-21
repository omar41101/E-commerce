import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./pages/Auth/Navigation";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  
  // Check if current route is an auth page
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  // Show full layout for authenticated users or non-auth pages
  const showFullLayout = isAuthenticated && userInfo && !isAuthPage;

  return (
    <div className="min-h-screen bg-tech-black">
      {showFullLayout ? (
        <>
          <Header />
          <div className="flex">
            <Navigation />
            <main className="flex-1 ml-16 lg:ml-0 lg:pl-16">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        // Auth pages layout - no navigation or header
        <main className="w-full">
          <Outlet />
        </main>
      )}
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="tech-toast"
      />
    </div>
  );
};

export default App;
