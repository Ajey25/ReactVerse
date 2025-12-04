// src/components/lesson/LessonCodeBlock.jsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LessonCodeBlock({ language, code }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border">
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
