import React, {useState, useEffect} from "react";
import marked from "marked";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [content, setContent] = useState<string>("");
  //   const [faqItems, setFaqItems] = useState([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    fetch("/docs/FAQ.md")
      .then(response => response.text())
      .then(text => setContent(text));

    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/docs/FAQ.md");
        const markdownContent = await response.text();

        const faqArray = parseMarkdown(markdownContent);
        setFaqItems(faqArray);
      } catch (error) {
        console.log("Error fetching or parsing FAQ.md");
      }
    };
    fetchMarkdown();
  }, []);

  const parseMarkdown = markdownContent => {
    const tokens = marked.lexer(markdownContent);
    const faqArray = [];

    let currentQuestion = null;
    let currentAnswer = null;

    tokens.forEach(token => {
      if (token.type === "heading" && token.depth === 2) {
        currentQuestion = token.text.trim();
      } else if (token.type === "paragraph" && currentQuestion) {
        currentAnswer = token.text.trim();
        faqArray.push({question: currentQuestion, answer: currentAnswer});
        currentQuestion = null;
        currentAnswer = null;
      }
    });
  };
  return (
    <div className='mx-auto p-4 max-w-4xl prose prose-sm text-left'>
      <ReactMarkdown className='prose prose-lg' remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
