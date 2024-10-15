import { ToastOptions, toast } from 'react-toastify';


const toastConfig: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: false,
    style: {
        marginTop: "10px",
    },

}

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

class ToastMessage {
    error(errorMessage: string) {
        toast.error(capitalizeFirstLetter(errorMessage), toastConfig);
    }
    success(successMessage: string) {
        toast.success(capitalizeFirstLetter(successMessage), toastConfig);
    }
    warning(successMessage: string) {
        toast.warn(capitalizeFirstLetter(successMessage), toastConfig);
    }
    info(successMessage: string) {
        toast.info(capitalizeFirstLetter(successMessage), toastConfig);
    }
}

export const toastMessage = new ToastMessage();