import {useState} from 'react';
import type { SubmitEvent } from 'react';

export interface MessageSubmitProps {
    disabled?: boolean;
    submit: (text: string) => Promise<void>;
}

function TextSubmit({ submit, disabled = false }: MessageSubmitProps) {
  const [text, setText] = useState('');

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      await submit(text);

      setText('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="w-full flex flex-row justify-center items-center gap-sm" onSubmit={onSubmit}>
        <input type="text" disabled={disabled} value={text} onChange={(event) => setText(event.target.value)} className="input input-primary" />

        <button type="submit" disabled={disabled} className="btn btn-primary">Send</button>
      </form>
    </>
  );
}

export default TextSubmit;
