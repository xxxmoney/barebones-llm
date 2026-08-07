import {useState} from 'react';

export interface MessageSubmitProps {
    submit: (text: string) => Promise<void>;
}

function TextSubmit({ submit }: MessageSubmitProps) {
  const [text, setText] = useState('');

  async function onSubmit() {
    try {
      await submit(text);

      setText('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="w-full flex flex-row gap-sm" onSubmit={onSubmit}>
        <textarea className="textarea-primary" value={text} onChange={(event) => setText(event.target.value)} />

        <button type="submit" className="btn-primary">Send</button>
      </form>
    </>
  );
}

export default TextSubmit;
