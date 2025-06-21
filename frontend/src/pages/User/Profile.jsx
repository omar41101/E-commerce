import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from '../../utils/swalConfig';
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: updateLoading }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorAlert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredientials({ ...res }));
      showSuccessAlert('Profile Updated', 'Your profile has been updated successfully!');
    } catch (error) {
      const errorMessage = error.data?.message || 'Failed to update profile. Please try again.';
      showErrorAlert('Update Failed', errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-tech-black text-tech-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          Profile Settings
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-tech-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-tech-dark/50 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/50 focus:border-tech-blue transition-all duration-300"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-tech-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-tech-dark/50 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/50 focus:border-tech-blue transition-all duration-300"
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-tech-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-tech-dark/50 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/50 focus:border-tech-blue transition-all duration-300"
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-tech-white">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-tech-dark/50 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/50 focus:border-tech-blue transition-all duration-300"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full bg-gradient-to-r from-tech-blue to-tech-purple text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-purple hover:to-tech-pink transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tech-blue/50 focus:ring-offset-2 focus:ring-offset-tech-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
