import Swal from 'sweetalert2';

// Configuración por defecto con el estilo de La Luna
const defaultConfig = {
  confirmButtonColor: '#28a745',
  cancelButtonColor: '#6c757d',
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-secondary'
  }
};

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const showSuccess = (message: string, title: string = '¡Éxito!') => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    ...defaultConfig
  });
};

export const showError = (message: string, title: string = 'Error') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    ...defaultConfig
  });
};

export const showWarning = (message: string, title: string = 'Atención') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    ...defaultConfig
  });
};

export const showInfo = (message: string, title: string = 'Información') => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    ...defaultConfig
  });
};

export const showConfirm = async (
  message: string,
  title: string = '¿Estás seguro?',
  confirmText: string = 'Sí, continuar',
  cancelText: string = 'Cancelar'
) => {
  const result = await Swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...defaultConfig
  });

  return result.isConfirmed;
};

export const showToastSuccess = (message: string) => {
  return Toast.fire({
    icon: 'success',
    title: message
  });
};

export const showToastError = (message: string) => {
  return Toast.fire({
    icon: 'error',
    title: message
  });
};

export const showToastWarning = (message: string) => {
  return Toast.fire({
    icon: 'warning',
    title: message
  });
};

export const showToastInfo = (message: string) => {
  return Toast.fire({
    icon: 'info',
    title: message
  });
};

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  confirm: showConfirm,
  toast: {
    success: showToastSuccess,
    error: showToastError,
    warning: showToastWarning,
    info: showToastInfo
  }
};
