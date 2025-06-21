const Message = ({ children, variant = "info" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "tech-alert success border-tech-emerald text-tech-emerald";
      case "danger":
        return "tech-alert error border-tech-red text-tech-red";
      case "warning":
        return "tech-alert warning border-tech-orange text-tech-orange";
      default:
        return "tech-alert info border-tech-blue text-tech-blue";
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-lg ${getVariantClasses()}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {variant === "success" && (
            <svg className="w-5 h-5 text-tech-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {variant === "danger" && (
            <svg className="w-5 h-5 text-tech-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {variant === "warning" && (
            <svg className="w-5 h-5 text-tech-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {variant === "info" && (
            <svg className="w-5 h-5 text-tech-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-tech font-medium">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Message 