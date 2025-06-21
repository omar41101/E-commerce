import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from '../../utils/swalConfig';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaGamepad, FaRocket } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showWarningAlert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials(res));
      navigate(redirect);
      showSuccessAlert('Login Successful', 'Welcome back to TechGaming!');
    } catch (error) {
      console.error("Login Error:", error);

      if (error?.data?.message === "Incorrect password") {
        showErrorAlert('Incorrect Password', 'The password you entered is incorrect. Please try again.');
      } else if (error?.data?.message === "User not found") {
        showErrorAlert('User Not Found', 'No account exists with this email. Please check your email or register.');
      } else {
        showErrorAlert('Login Failed', error?.data?.message || 'Invalid email or password.');
      }
    }
  };

  return (
    <div className="text-tech-white">
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaGamepad className="text-white text-2xl" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2 gradient-text">
          WELCOME BACK
        </h1>
        <p className="text-tech-text-secondary text-sm">
          Sign in to continue your gaming journey
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-tech-blue font-display font-semibold mb-2 uppercase tracking-wider text-sm">
            <FaEnvelope className="inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            className="tech-search w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-tech-purple font-display font-semibold mb-2 uppercase tracking-wider text-sm">
            <FaLock className="inline mr-2" />
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-tech-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              className="tech-search w-full pl-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={isLoading}
          className="tech-btn w-full bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              SIGNING IN...
            </>
          ) : (
            <>
              <FaSignInAlt size={16} />
              SIGN IN
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-tech-text-secondary text-sm">
          New to Tech Store?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-tech-blue hover:text-tech-cyan transition-colors duration-300 font-display font-semibold"
          >
            Create Account
          </Link>
        </p>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="tech-card p-3 text-center">
          <FaRocket className="text-tech-blue text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Instant Access</p>
        </div>
        <div className="tech-card p-3 text-center">
          <FaGamepad className="text-tech-purple text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Premium Games</p>
        </div>
        <div className="tech-card p-3 text-center">
          <FaLock className="text-tech-emerald text-lg mx-auto mb-1" />
          <p className="text-xs font-tech">Secure</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
