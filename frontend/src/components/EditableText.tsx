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
    if (maxLength && event.currentTarget.textContent.length > maxLength && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }
  async function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (event.currentTarget.textContent !== text) {
      await update(event.currentTarget.textContent);
    }
  }

  return (
    <>
      <span onKeyDown={handleKeyDown} onBlur={handleBlur} className="relative" contentEditable suppressContentEditableWarning >
        {text}
        {clear && <Delete click={clear} absolute />}
      </span>
    </>
  );
}

export default EditableText;