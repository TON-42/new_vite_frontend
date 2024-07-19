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
        if (currentQuestion && currentAnswer) {
          faqArray.push({question: currentQuestion, answer: currentAnswer});
        }
        currentQuestion = token.text.trim();
        currentAnswer = "";
        //   } else if (token.type === "paragraph" && currentQuestion) {
      } else if (currentQuestion) {
        if (token.type === "list") {
          currentAnswer += marked.parser([token]);
        } else if (token.type === "paragraph") {
          currentAnswer += marked.parser([token]);
        } else {
          currentAnswer += marked.parser([token]);
        }
      }
    });

    if (currentQuestion && currentAnswer) {
      faqArray.push({question: currentQuestion, answer: currentAnswer});
    }
    return faqArray;
  };

  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className='mx-auto p-4 max-w-4xl text-left'>
      <h1 className='text-3xl font-bold'>FAQ</h1>
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
            <Accordion.Summary
              multiline={true}
              className='dark:border-stone-950'
            >
              {faq.question}
            </Accordion.Summary>
            <Accordion.Content>
              <div
                className='dark:bg-stone-950'
                dangerouslySetInnerHTML={{__html: faq.answer}}
                style={{padding: "10px 20px 20px"}}
              />
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
              multiline={true}
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
              {/* <div className='py-4'>{faq.answer}</div> */}
              <div
                className='py-4'
                dangerouslySetInnerHTML={{__html: faq.answer}}
                // style={{padding: "10px 20px 20px"}}
              />
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
