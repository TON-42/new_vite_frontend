interface OnboardUserBProps {
  onClose: () => void;
}

const OnboardUserB: React.FC<OnboardUserBProps> = ({onClose}) => {
  return (
    <div className='fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-5 rounded-lg text-center w-4/5 max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Welcome to ChatPay!</h2>
        <p className='mb-6'>
          You got invited to sell your chats, checkout who invited you and how
          much you can earn.
        </p>
        <button
          onClick={onClose}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Go to Chats
        </button>
      </div>
    </div>
  );
};

export default OnboardUserB;
