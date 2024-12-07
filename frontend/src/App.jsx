import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
=======
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

>>>>>>> b14cb85f8248ae5b904a0dddfe96f3f5c0e910d1
function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
