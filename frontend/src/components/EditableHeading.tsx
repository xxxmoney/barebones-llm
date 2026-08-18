interface EditableHeadingProps {
   text?: string;
   update: (text: string) => Promise<void>;
}

function EditableHeading({text, update}: EditableHeadingProps) {
  return (
    <>
      <h2 className="text-heading text-center">
        <span contentEditable suppressContentEditableWarning onBlur={(event) => update(event.currentTarget.textContent)}>{text}</span>
      </h2>
    </>
  );
}

export default EditableHeading;