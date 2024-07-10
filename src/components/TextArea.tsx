import React from "react";

interface TextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <div className='max-w-xs mx-auto'>
      <label
        htmlFor='flowbite-textarea'
        className='block mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400'
      >
        {label}
      </label>
      <textarea
        id='flowbite-textarea'
        className='block p-4 w-full h-48 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
