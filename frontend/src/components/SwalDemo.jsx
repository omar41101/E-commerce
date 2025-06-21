import React from 'react';
import { 
  showSuccessAlert, 
  showErrorAlert, 
  showWarningAlert, 
  showInfoAlert, 
  showConfirmAlert, 
  showInputAlert 
} from '../utils/swalConfig';

const SwalDemo = () => {
  const handleSuccessAlert = () => {
    showSuccessAlert('Success!', 'Operation completed successfully.');
  };

  const handleErrorAlert = () => {
    showErrorAlert('Error!', 'Something went wrong. Please try again.');
  };

  const handleWarningAlert = () => {
    showWarningAlert('Warning!', 'Please review your input before proceeding.');
  };

  const handleInfoAlert = () => {
    showInfoAlert('Information', 'Here is some important information for you.');
  };

  const handleConfirmAlert = () => {
    showConfirmAlert('Confirm Action', 'Are you sure you want to proceed?', 'Yes, Continue', 'Cancel')
      .then((result) => {
        if (result.isConfirmed) {
          showSuccessAlert('Confirmed!', 'You clicked the confirm button.');
        } else {
          showInfoAlert('Cancelled', 'You cancelled the action.');
        }
      });
  };

  const handleInputAlert = () => {
    showInputAlert('Enter Your Name', 'Please enter your full name:', 'text')
      .then((result) => {
        if (result.isConfirmed) {
          showSuccessAlert('Hello!', `Nice to meet you, ${result.value}!`);
        }
      });
  };

  return (
    <div className="p-6 bg-tech-dark/50 rounded-lg border border-tech-blue/20">
      <h2 className="text-2xl font-bold text-tech-white mb-6 text-center">
        Swal Alert Demo
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={handleSuccessAlert}
          className="bg-gradient-to-r from-tech-emerald to-tech-cyan text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-cyan hover:to-tech-emerald transform hover:scale-105 transition-all duration-300"
        >
          Success Alert
        </button>

        <button
          onClick={handleErrorAlert}
          className="bg-gradient-to-r from-tech-red to-tech-orange text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-orange hover:to-tech-red transform hover:scale-105 transition-all duration-300"
        >
          Error Alert
        </button>

        <button
          onClick={handleWarningAlert}
          className="bg-gradient-to-r from-tech-yellow to-tech-orange text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-orange hover:to-tech-yellow transform hover:scale-105 transition-all duration-300"
        >
          Warning Alert
        </button>

        <button
          onClick={handleInfoAlert}
          className="bg-gradient-to-r from-tech-blue to-tech-purple text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-purple hover:to-tech-blue transform hover:scale-105 transition-all duration-300"
        >
          Info Alert
        </button>

        <button
          onClick={handleConfirmAlert}
          className="bg-gradient-to-r from-tech-purple to-tech-pink text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-pink hover:to-tech-purple transform hover:scale-105 transition-all duration-300"
        >
          Confirm Alert
        </button>

        <button
          onClick={handleInputAlert}
          className="bg-gradient-to-r from-tech-cyan to-tech-blue text-white font-semibold py-3 px-6 rounded-lg hover:from-tech-blue hover:to-tech-cyan transform hover:scale-105 transition-all duration-300"
        >
          Input Alert
        </button>
      </div>

      <div className="mt-8 p-4 bg-tech-black/50 rounded-lg border border-tech-purple/20">
        <h3 className="text-lg font-semibold text-tech-white mb-3">Features:</h3>
        <ul className="text-tech-text-secondary space-y-2">
          <li>• Tech-themed styling with glassmorphism effects</li>
          <li>• Custom animations and hover effects</li>
          <li>• Type-specific colors and icons</li>
          <li>• Responsive design for all screen sizes</li>
          <li>• Consistent with your app's design system</li>
          <li>• Reduced neon effects for better UX</li>
        </ul>
      </div>
    </div>
  );
};

export default SwalDemo; 