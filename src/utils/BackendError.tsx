import React from "react";

interface BackendErrorProps {
  message: string;
  onClose: () => void;
}

const BackendError: React.FC<BackendErrorProps> = ({message, onClose}) => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-red-500 text-white p-4'>
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
