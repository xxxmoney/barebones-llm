import { PencilLine } from 'lucide-react';
import Delete from './Delete.tsx';
import type { KeyboardEvent, ClipboardEvent, FocusEvent } from 'react';

interface EditableTextProps {
   text?: string;
   placeholder?: string;
   maxLength?: number;
   allowShiftEnterNewLine?: boolean;
   allowEnterSubmit?: boolean;
   allowPaste?: boolean;
   className?: string;
   update: (text: string) => Promise<void>;
   clear?: () => Promise<void>;
}

function EditableText({ text, placeholder, maxLength, allowShiftEnterNewLine, allowEnterSubmit, allowPaste, className, update, clear }: EditableTextProps) {
  async function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    const isWithinMaxLength = !maxLength || event.currentTarget.textContent.length <= maxLength;
    const isDelete = event.key === 'Backspace' || event.key === 'Delete';
    const isSelectAll = (event.ctrlKey || event.metaKey) && event.key === 'a';
    const isEnter = event.key === 'Enter';
    const isShift = event.shiftKey;

    if (allowEnterSubmit && isEnter && !isShift) {
      event.preventDefault();
      await update(event.currentTarget.innerText);

      return;
    }

    const preventInput = !isWithinMaxLength && !isDelete && !isSelectAll;
    const preventEnter = !allowShiftEnterNewLine && isEnter && isShift;
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
      <span onKeyDown={handleKeyDown} onPaste={handlePaste} onBlur={handleBlur} className={`inline-block relative group hover:cursor-text ${className}`}>
        <span dangerouslySetInnerHTML={{ __html: text! }} contentEditable suppressContentEditableWarning data-placeholder={placeholder || 'Enter text'} className="whitespace-pre-wrap empty:before:content-[attr(data-placeholder)]" />
        {clear && <Delete click={clear} absolute className="opacity-0 group-hover:opacity-100" />}

        <div className="flex flex-row justify-start opacity-0 group-hover:opacity-100 left-0 top-0 -translate-x-2 translate-y-1">
          <span data-tip="You can edit this" className="tooltip tooltip-right">
            <PencilLine />
          </span>
        </div>
      </span>
    </>
  );
}

export default EditableText;