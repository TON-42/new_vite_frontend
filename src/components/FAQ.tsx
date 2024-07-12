import React, {useState, useEffect} from "react";
import {marked} from "marked";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FAQItem from "./FAQItem";

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [content, setContent] = useState<string>("");
  //   const [faqItems, setFaqItems] = useState([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/docs/FAQ.md");
        const markdownContent = await response.text();

        const faqArray = parseMarkdown(markdownContent);
        setFaqItems(faqArray);
        setContent(markdownContent);
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
  return (
    <div className='mx-auto p-4 max-w-4xl prose prose-sm text-left'>
      <ReactMarkdown className='prose prose-lg' remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
      <div>
        {faqItems.map((faq, index) => (
          <div key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <div>
        {faqItems.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};
