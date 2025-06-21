import { FaCheck, FaUser, FaShippingFast, FaCreditCard } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-8 py-8">
      {/* Step 1: Login */}
      <div className={`flex flex-col items-center ${step1 ? "text-tech-emerald" : "text-tech-text-secondary"}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
          step1 
            ? "bg-gradient-to-r from-tech-emerald to-tech-cyan shadow-lg shadow-tech-emerald/30" 
            : "bg-tech-light border border-tech-text-secondary"
        }`}>
          {step1 ? (
            <FaCheck className="text-white text-lg" />
          ) : (
            <FaUser className="text-tech-text-secondary text-lg" />
          )}
        </div>
        <span className="font-display font-semibold text-sm uppercase tracking-wider">Login</span>
      </div>

      {/* Connector Line */}
      {step2 && (
        <div className="h-0.5 w-16 bg-gradient-to-r from-tech-emerald to-tech-cyan"></div>
      )}

      {/* Step 2: Shipping */}
      {step2 && (
        <>
          <div className={`flex flex-col items-center ${step1 ? "text-tech-emerald" : "text-tech-text-secondary"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
              step1 
                ? "bg-gradient-to-r from-tech-emerald to-tech-cyan shadow-lg shadow-tech-emerald/30" 
                : "bg-tech-light border border-tech-text-secondary"
            }`}>
              {step1 ? (
                <FaCheck className="text-white text-lg" />
              ) : (
                <FaShippingFast className="text-tech-text-secondary text-lg" />
              )}
            </div>
            <span className="font-display font-semibold text-sm uppercase tracking-wider">Shipping</span>
          </div>
        </>
      )}

      {/* Connector Line */}
      {step1 && step2 && step3 && (
        <div className="h-0.5 w-16 bg-gradient-to-r from-tech-emerald to-tech-cyan"></div>
      )}

      {/* Step 3: Summary */}
      <div className={`flex flex-col items-center ${step3 ? "text-tech-emerald" : "text-tech-text-secondary"}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
          step3 
            ? "bg-gradient-to-r from-tech-emerald to-tech-cyan shadow-lg shadow-tech-emerald/30" 
            : "bg-tech-light border border-tech-text-secondary"
        }`}>
          {step3 ? (
            <FaCheck className="text-white text-lg" />
          ) : (
            <FaCreditCard className="text-tech-text-secondary text-lg" />
          )}
        </div>
        <span className="font-display font-semibold text-sm uppercase tracking-wider">Summary</span>
      </div>
    </div>
  );
};

export default ProgressSteps;