import React, {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const FAQ: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/docs/FAQ.md")
      .then(response => response.text())
      .then(text => setContent(text));
  }, []);

  return (
    <div className='mx-auto p-4 max-w-4xl prose prose-sm text-left'>
      <ReactMarkdown className='prose prose-lg' remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
