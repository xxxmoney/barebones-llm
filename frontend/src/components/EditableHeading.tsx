import Delete from './Delete.tsx';

interface EditableHeadingProps {
   text?: string;
   update: (text: string) => Promise<void>;
   clear?: () => Promise<void>;
}

function EditableHeading({text, update, clear}: EditableHeadingProps) {
  return (
    <>
      <h2 className="text-heading text-center">
        <span onBlur={(event) => update(event.currentTarget.textContent)} className="relative" contentEditable suppressContentEditableWarning >
          {text}
          {clear && <Delete click={clear} absolute />}
        </span>
      </h2>
    </>
  );
}

export default EditableHeading;