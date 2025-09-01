import { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

const CopyToClipboard = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <span
      className={`font-bold text-primary text-lg cursor-pointer underline flex items-center gap-2 ${className}`}
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      {text}
      {copied ? <LuCopyCheck /> : <LuCopy />}
    </span>
  );
};

export default CopyToClipboard;
