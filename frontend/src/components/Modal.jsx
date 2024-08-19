const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="absolute bg-white p-5 rounded-lg z-10 text-right">
              <button
                className="text-black font-semibold hover:text-gray-700 focus:outline-none mb-3"
                onClick={onClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;
  