import React, {useEffect} from "react";
import {useUserContext} from "../utils/utils";

interface BackendErrorProps {
  message: string;
  errorCode: number;
  onClose: () => void;
  onRedirect: () => void;
}

const BackendError: React.FC<BackendErrorProps> = ({
  message,
  errorCode,
  onClose,
  onRedirect,
}) => {
  const {setCurrentTab} = useUserContext();

  useEffect(() => {
    // Perform redirect based on specific error codes
    if (errorCode === 401 || errorCode === 403) {
      onRedirect();
      setCurrentTab("home");
    }
  }, [errorCode, onRedirect, setCurrentTab]);

  return (
    <div className='fixed top-0 left-0 right-0 bg-red-500 text-white p-4 z-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <span>{message}</span>
        <button onClick={onClose} className='text-xl font-bold'>
          &times;
        </button>
      </div>
    </div>
  );
};

export default BackendError;
