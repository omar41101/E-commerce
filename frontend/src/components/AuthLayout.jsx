import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && userInfo) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, userInfo, navigate]);

  // Don't render if already authenticated
  if (isAuthenticated && userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-tech-black relative overflow-hidden">
      {/* Gaming Background - Reduced Neon */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech-black via-tech-dark to-tech-black">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Minimal Floating Particles */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-tech-blue/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-tech-purple/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-tech-pink/30 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-tech-emerald/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Subtle Floating Elements */}
        <div className="absolute top-10 left-1/3 w-16 h-16 bg-tech-blue/3 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-60 right-10 w-24 h-24 bg-tech-purple/3 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-tech-pink/3 rounded-full blur-xl animate-float" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Gaming Setup Background Image - Reduced Opacity */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/5 via-tech-purple/5 to-tech-pink/5"></div>
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Gaming Setup Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Subtle Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-tech-black via-tech-black/90 to-tech-black/70"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Subtle Glowing Border Effect */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-tech-blue/10 via-tech-purple/10 to-tech-pink/10 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-tech-black/60 backdrop-blur-xl border border-tech-blue/10 rounded-2xl p-8 shadow-2xl">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gaming Elements - Reduced */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-tech-black to-transparent pointer-events-none"></div>
      
      {/* Subtle Corner Decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border border-tech-blue/10 rounded-lg opacity-20"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border border-tech-purple/10 rounded-lg opacity-20"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border border-tech-pink/10 rounded-lg opacity-20"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border border-tech-emerald/10 rounded-lg opacity-20"></div>
    </div>
  );
};

export default AuthLayout; 