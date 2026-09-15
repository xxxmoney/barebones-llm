import Delete from './Delete.tsx';
import type { KeyboardEvent, ClipboardEvent, FocusEvent } from 'react';

interface EditableTextProps {
   text?: string;
   maxLength?: number;
   allowEnterNewLine?: boolean;
   className?: string;
   update: (text: string) => Promise<void>;
   clear?: () => Promise<void>;
}

function EditableText({ text, maxLength, allowEnterNewLine, className, update, clear }: EditableTextProps) {

  async function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    const isWithinMaxLength = !maxLength || event.currentTarget.textContent.length <= maxLength;
    const isDelete = event.key === 'Backspace' || event.key === 'Delete';
    const isSelectAll = (event.ctrlKey || event.metaKey) && event.key === 'a';

    const preventInput = !isWithinMaxLength && !isDelete && !isSelectAll;
    const preventEnter = !allowEnterNewLine && event.key === 'Enter';
    if (preventInput || preventEnter) {
      event.preventDefault();
    }

    if (preventEnter) {
      event.currentTarget.blur();
      if (event.currentTarget.textContent !== text) {
        await update(event.currentTarget.textContent);
      }
    }
  }
  function handlePaste(event: ClipboardEvent<HTMLSpanElement>) {
    event.preventDefault();
  }
  async function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (event.currentTarget.textContent !== text) {
      await update(event.currentTarget.textContent);
    }
  }

  return (
    <>
      <span onKeyDown={handleKeyDown} onPaste={handlePaste} onBlur={handleBlur} className={`relative group ${className}`} contentEditable suppressContentEditableWarning>
        {text}
        {clear && <Delete click={clear} absolute className="opacity-0 group-hover:opacity-100" />}
      </span>
    </>
  );
}

export default EditableText;