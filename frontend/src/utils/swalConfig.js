import Swal from 'sweetalert2';

// Custom Swal configuration with tech theme
const techSwalConfig = {
  // Background and container styling
  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(20, 20, 35, 0.98))',
  backdrop: 'rgba(0, 0, 0, 0.8)',
  customClass: {
    popup: 'tech-swal-popup',
    container: 'tech-swal-container',
    title: 'tech-swal-title',
    htmlContainer: 'tech-swal-content',
    confirmButton: 'tech-swal-confirm-btn',
    cancelButton: 'tech-swal-cancel-btn',
    input: 'tech-swal-input',
    actions: 'tech-swal-actions',
    icon: 'tech-swal-icon'
  },
  // Animation settings
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  },
  // Button styling
  confirmButtonColor: '#00d4ff',
  cancelButtonColor: '#ef4444',
  // Typography
  titleTextColor: '#f8f9fa',
  textColor: '#9ca3af',
  // Other settings
  allowOutsideClick: false,
  allowEscapeKey: true,
  focusConfirm: true,
  reverseButtons: true
};

// Success alert configuration
export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    ...techSwalConfig,
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#10b981',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-success',
      icon: 'tech-swal-icon tech-swal-success-icon'
    }
  });
};

// Error alert configuration
export const showErrorAlert = (title, text) => {
  return Swal.fire({
    ...techSwalConfig,
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#ef4444',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-error',
      icon: 'tech-swal-icon tech-swal-error-icon'
    }
  });
};

// Warning alert configuration
export const showWarningAlert = (title, text) => {
  return Swal.fire({
    ...techSwalConfig,
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#f59e0b',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-warning',
      icon: 'tech-swal-icon tech-swal-warning-icon'
    }
  });
};

// Info alert configuration
export const showInfoAlert = (title, text) => {
  return Swal.fire({
    ...techSwalConfig,
    icon: 'info',
    title,
    text,
    confirmButtonColor: '#00d4ff',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-info',
      icon: 'tech-swal-icon tech-swal-info-icon'
    }
  });
};

// Question/Confirmation alert
export const showConfirmAlert = (title, text, confirmText = 'Yes', cancelText = 'No') => {
  return Swal.fire({
    ...techSwalConfig,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#00d4ff',
    cancelButtonColor: '#ef4444',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-question',
      icon: 'tech-swal-icon tech-swal-question-icon'
    }
  });
};

// Input alert
export const showInputAlert = (title, inputPlaceholder, inputType = 'text') => {
  return Swal.fire({
    ...techSwalConfig,
    title,
    input: inputType,
    inputPlaceholder,
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#00d4ff',
    cancelButtonColor: '#ef4444',
    customClass: {
      ...techSwalConfig.customClass,
      popup: 'tech-swal-popup tech-swal-input-popup'
    }
  });
};

export default techSwalConfig; 