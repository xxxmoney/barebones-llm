import Delete from './Delete.tsx';
import type { KeyboardEvent, ClipboardEvent, FocusEvent } from 'react';

interface EditableTextProps {
   text?: string;
   maxLength?: number;
   allowEnterNewLine?: boolean;
   allowPaste?: boolean;
   className?: string;
   update: (text: string) => Promise<void>;
   clear?: () => Promise<void>;
}

function EditableText({ text, maxLength, allowEnterNewLine, allowPaste, className, update, clear }: EditableTextProps) {
  async function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    const isWithinMaxLength = !maxLength || event.currentTarget.textContent.length <= maxLength;
    const isDelete = event.key === 'Backspace' || event.key === 'Delete';
    const isSelectAll = (event.ctrlKey || event.metaKey) && event.key === 'a';
    const isEnter = event.key === 'Enter';

    const preventInput = !isWithinMaxLength && !isDelete && !isSelectAll;
    const preventEnter = !allowEnterNewLine && isEnter;
    if (preventInput || preventEnter) {
      event.preventDefault();
    }
  }
  function handlePaste(event: ClipboardEvent<HTMLSpanElement>) {
    const preventPaste = !allowPaste;
    if (preventPaste) {
      event.preventDefault();
    }
  }
  async function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (event.currentTarget.innerText !== text) {
      await update(event.currentTarget.innerText);
    }
  }

  return (
    <>
      <span onKeyDown={handleKeyDown} onPaste={handlePaste} onBlur={handleBlur} className={`relative group ${className}`} contentEditable suppressContentEditableWarning>
        <span dangerouslySetInnerHTML={{ __html: text! }} className="whitespace-pre-wrap" />
        {clear && <Delete click={clear} absolute className="opacity-0 group-hover:opacity-100" />}
      </span>
    </>
  );
}

export default EditableText;