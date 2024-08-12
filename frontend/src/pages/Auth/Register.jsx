import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
      });
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have been registered successfully.",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.data?.message || "An error occurred during registration.",
        });
      }
    }
  };

  return (
    <section className="flex justify-between items-center h-screen">
      <div className="w-[40%] pl-[10rem] mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={submitHandler} className="w-full">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium text white">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email" className="block text-sm font-medium text white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-1rem"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[60%] h-full">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="Register Illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default Register;
