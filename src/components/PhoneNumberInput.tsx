import React from "react";

interface PhoneNumberInputProps {
  phone: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//using css component from tailwindcss
//because the border of the UI toolkit component is not visible on IOS

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phone,
  onChange,
}) => {
  return (
    <form className='max-w-xs mx-auto'>
      <div className='relative'>
        <span className='absolute start-0 bottom-3 text-gray-500 dark:text-gray-400'>
          <svg
            className='w-4 h-4 rtl:rotate-[270deg]'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 19 18'
          >
            <path d='M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z' />
          </svg>
        </span>
        <input
          type='tel'
          id='floating-phone-number'
          className='block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          placeholder=' '
          value={phone}
          onChange={onChange}
        />
        <label
          htmlFor='floating-phone-number'
          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
        >
          Phone number
        </label>
      </div>
    </form>
  );
};

export default PhoneNumberInput;
