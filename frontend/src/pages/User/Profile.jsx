import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import Swal from "sweetalert2";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials(res));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input p-2 rounded-sm w-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-input p-2 rounded-sm w-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input p-2 rounded-sm w-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="form-input p-2 rounded-sm w-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors duration-200"
            >
              Update
            </button>
            <Link
              to="/user-orders"
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors duration-200"
            >
              My Orders
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
