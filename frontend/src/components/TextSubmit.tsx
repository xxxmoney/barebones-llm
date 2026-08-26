import {useState} from 'react';
import type { SubmitEvent } from 'react';

export interface MessageSubmitProps {
    disabled?: boolean;
    maxLength?: number;
    submit: (text: string) => Promise<void>;
}

function TextSubmit({ disabled, maxLength, submit }: MessageSubmitProps) {
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
      <form onSubmit={onSubmit} className="w-full flex flex-row justify-center items-center gap-sm">
        <input type="text" maxLength={maxLength} onChange={(event) => setText(event.target.value)} disabled={disabled} value={text} className="input input-primary" />

        <button type="submit" disabled={disabled} className="btn btn-primary">Send</button>
      </form>
    </>
  );
}

export default TextSubmit;
