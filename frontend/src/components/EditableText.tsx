import Delete from './Delete.tsx';
import type { KeyboardEvent, FocusEvent } from 'react';

interface EditableTextProps {
   text?: string;
   maxLength?: number;
   update: (text: string) => Promise<void>;
   clear?: () => Promise<void>;
}

function EditableText({text, maxLength, update, clear}: EditableTextProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    const isWithinMaxLength = !maxLength || event.currentTarget.textContent.length <= maxLength;
    const isDelete = event.key === 'Backspace' || event.key === 'Delete';
    const isSelectAll = (event.ctrlKey || event.metaKey) && event.key === 'a';

    if (isWithinMaxLength || isDelete || isSelectAll) {
      return;
    }

    event.preventDefault();
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
      <span onKeyDown={handleKeyDown} onPaste={handlePaste} onBlur={handleBlur} className="relative" contentEditable suppressContentEditableWarning>
        {text}
        {clear && <Delete click={clear} absolute />}
      </span>
    </>
  );
}

export default EditableText;