import {useState} from 'react';
import type { SubmitEvent, ChangeEvent } from 'react';

export interface MessageSubmitProps {
    disabled?: boolean;
    maxLength?: number;
    submit: (text: string) => Promise<void>;
}

function TextSubmit({ disabled, maxLength, submit }: MessageSubmitProps) {
  const [text, setText] = useState('');

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      await submit(text);

      setText('');
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-row justify-center items-center gap-sm">
        <input type="text" maxLength={maxLength} onChange={handleChange} disabled={disabled} value={text} className="input input-primary" />

        <button type="submit" disabled={disabled} className="btn btn-primary">Send</button>
      </form>
    </>
  );
}

export default TextSubmit;
