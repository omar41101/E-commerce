import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../utils/swalConfig";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGamepad, FaRocket, FaShieldAlt, FaGift } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      showWarningAlert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      showErrorAlert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    if (password.length < 6) {
      showWarningAlert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
      showSuccessAlert('Registration Successful', 'Welcome to TechGaming! Your account has been created.');
      } catch (error) {
      const errorMessage = error.data?.message || "An error occurred during registration. Please try again.";
      showErrorAlert('Registration Failed', errorMessage);
    }
  };

  return (
    <div className="text-tech-white">
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-tech-purple to-tech-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaUserPlus className="text-white text-2xl" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2 gradient-text">
          JOIN THE FUTURE
        </h1>
        <p className="text-tech-text-secondary text-sm">
          Create your account and start gaming
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row: Username and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-tech-blue font-display font-semibold mb-2 uppercase tracking-wider text-sm">
              <FaUser className="inline mr-2" />
              Username
            </label>
            <input
              type="text"
              className="tech-search w-full"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-tech-purple font-display font-semibold mb-2 uppercase tracking-wider text-sm">
              <FaEnvelope className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              className="tech-search w-full"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          </div>

        {/* Second Row: Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-tech-cyan font-display font-semibold mb-2 uppercase tracking-wider text-sm">
              <FaLock className="inline mr-2" />
              Password
            </label>
            <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                className="tech-search w-full"
                placeholder="Enter your password"
                name="password"
              value={password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-tech-text-secondary hover:text-tech-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-tech-text-secondary hover:text-tech-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-tech-emerald font-display font-semibold mb-2 uppercase tracking-wider text-sm">
              <FaLock className="inline mr-2" />
              Confirm Password
            </label>
            <div className="relative">
            <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="tech-search w-full"
                placeholder="Confirm your password"
                name="confirmPassword"
              value={confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5 text-tech-text-secondary hover:text-tech-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-tech-text-secondary hover:text-tech-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
          className="tech-btn w-full bg-gradient-to-r from-tech-purple to-tech-pink hover:from-tech-pink hover:to-tech-purple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              CREATING ACCOUNT...
            </>
          ) : (
            <>
              <FaUserPlus size={16} />
              CREATE ACCOUNT
            </>
          )}
          </button>
        </form>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-tech-text-secondary text-sm">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-tech-purple hover:text-tech-pink transition-colors duration-300 font-display font-semibold"
            >
            Sign In
            </Link>
          </p>
      </div>

      {/* Benefits */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="tech-card p-3 text-center">
          <FaGift className="text-tech-blue text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Welcome Bonus</p>
        </div>
        <div className="tech-card p-3 text-center">
          <FaShieldAlt className="text-tech-emerald text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Secure Account</p>
        </div>
        <div className="tech-card p-3 text-center">
          <FaRocket className="text-tech-purple text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Instant Access</p>
        </div>
        <div className="tech-card p-3 text-center">
          <FaGamepad className="text-tech-pink text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Premium Games</p>
        </div>
      </div>
      </div>
  );
};

export default Register;
