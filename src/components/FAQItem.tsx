import React, {useState} from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({question, answer}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=''>
      <div
        className='flex items-center justify-between py-4 cursor-pointer select-none'
        onClick={toggleOpen}
      >
        <div className='pr-8'> {question}</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          aria-hidden='true'
          data-slot='icon'
          className={`w-4 h-4 opacity-30 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          ></path>
        </svg>
      </div>
      {isOpen && <div className='py-4'>{answer}</div>}
    </div>
  );
};

export default FAQItem;
