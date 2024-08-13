import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Spinner } from "flowbite-react"; // Import Spinner from Flowbite

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      Swal.fire({
        icon: "success",
        title: "Logged In Successfully",
        text: "Welcome!",
      });
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if both email and password are provided
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in both email and password fields.",
      });
      return; // Exit the function early
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials(res));
      navigate(redirect);
      Swal.fire({
        icon: "success",
        title: "Logged In Successfully",
        text: "Welcome!",
      });
    } catch (error) {
      // Log the error for debugging
      console.error("Login Error:", error);

      if (error?.data?.message === "Incorrect password") {
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "The password you entered is incorrect. Please try again.",
        });
      } else if (error?.data?.message === "User not found") {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "No account exists with this email. Please check your email or register.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error?.data?.message || "Invalid email or password.",
        });
      }
    }
  };

  return (
    <section className="flex justify-between items-center h-screen">
      <div className="w-[40%] pl-[10rem] mr-[4rem] mt-[5rem]">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign In</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  dark:text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" light={true} /> : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block w-[60%] h-full">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default Login;
