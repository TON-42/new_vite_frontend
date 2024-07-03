import React, {useEffect} from "react";

interface BackendErrorProps {
  message: string;
  errorCode: number;
  onClose: () => void;
  onRedirect: () => void;
  setCurrentTab: (tab: string) => void; // New prop for setting the current tab
}

const BackendError: React.FC<BackendErrorProps> = ({
  message,
  errorCode,
  onClose,
  onRedirect,
  setCurrentTab,
}) => {
  useEffect(() => {
    // Perform redirect based on specific error codes
    if (errorCode === 401 || errorCode === 403) {
      // Example error codes
      onRedirect();
    }
  }, [errorCode, onRedirect]);

  // Redirect to home tab when BackendError is rendered
  useEffect(() => {
    setCurrentTab("home");
  }, [setCurrentTab]);

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
