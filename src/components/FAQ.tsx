import React, {useState, useEffect} from "react";
import {marked} from "marked";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import FAQItem from "./FAQItem";
import {Accordion} from "@telegram-apps/telegram-ui";

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  //   const [content, setContent] = useState<string>("");
  //   const [faqItems, setFaqItems] = useState([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/docs/FAQ.md");
        const markdownContent = await response.text();

        const faqArray = parseMarkdown(markdownContent);
        setFaqItems(faqArray);
        // setContent(markdownContent);
      } catch (error) {
        console.log("Error fetching or parsing FAQ.md");
      }
    };
    fetchMarkdown();
  }, []);

  const parseMarkdown = (markdownContent: string): FaqItem[] => {
    // const tokens = marked.lexer(markdownContent);
    const tokens = marked.lexer(markdownContent);
    const faqArray: FaqItem[] = [];

    let currentQuestion: string | null = null;
    let currentAnswer: string | null = null;

    tokens.forEach(token => {
      if (token.type === "heading" && token.depth === 2) {
        currentQuestion = token.text.trim();
      } else if (token.type === "paragraph" && currentQuestion) {
        currentAnswer = token.text.trim();
        if (currentAnswer) {
          faqArray.push({question: currentQuestion, answer: currentAnswer});
        }
        currentQuestion = null;
        currentAnswer = null;
      }
    });
    return faqArray;
  };

  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className='mx-auto p-4 max-w-4xl prose prose-sm text-left'>
      {/* <ReactMarkdown className='prose prose-lg' remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown> */}
      {/* <div>
        {faqItems.map((faq, index) => (
          <div key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div> */}
      <div className='mb-11'>
        {faqItems.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <div className='mb-11'>
        {faqItems.map((faq, index) => (
          <Accordion
            key={index}
            id={`faq-${index}`}
            expanded={expandedIndex === index}
            onChange={() => handleAccordionChange(index)}
          >
            <Accordion.Summary>{faq.question}</Accordion.Summary>
            <Accordion.Content>
              <div style={{padding: "10px 20px 20px"}}>{faq.answer}</div>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
      <div className='mb-11'>
        {faqItems.map((faq, index) => (
          <Accordion
            key={index}
            id={`faq-${index}`}
            expanded={expandedIndex === index}
            onChange={() => handleAccordionChange(index)}
          >
            <Accordion.Summary
              after={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  aria-hidden='true'
                  data-slot='icon'
                  className={`w-4 h-4 opacity-30 ${expandedIndex === index ? "rotate-180" : ""}`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m19.5 8.25-7.5 7.5-7.5-7.5'
                  ></path>
                </svg>
              }
            >
              <div className='flex items-center justify-between py-4 cursor-pointer select-none'>
                <div className='pr-8'>{faq.question}</div>
              </div>
            </Accordion.Summary>
            <Accordion.Content>
              <div className='py-4'>{faq.answer}</div>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
