import Messages, {type Message} from './Messages.tsx';
import TextSubmit from './TextSubmit.tsx';
import Loading from './Loading.tsx';
import EditableHeading from './EditableHeading.tsx';
import {memo} from 'react';

interface ChatProps {
    name?: string;
    messages?: Message[];
    disabled?: boolean;
    loading?: boolean;
    messageSubmit: (text: string) => Promise<void>;
    messageUpdate: (messageId: string, text: string) => Promise<void>;
    chatUpdate: (name: string) => Promise<void>;
    chatDelete: () => Promise<void>;
}

const MemoEditableHeading = memo(EditableHeading);
const MemoMessages = memo(Messages);
const MemoTextSubmit = memo(TextSubmit);

function Chat({ name, messages, disabled = false, loading = false, messageSubmit, messageUpdate, chatUpdate, chatDelete }: ChatProps) {
  return (
    <>
      <section className="mx-auto flex flex-col gap-lg max-w-[40rem]">
        <MemoEditableHeading text={name} update={chatUpdate} clear={chatDelete} />

        <MemoMessages messages={messages} update={messageUpdate} />

        {loading && <Loading />}

        <MemoTextSubmit submit={messageSubmit} disabled={disabled} />
      </section>
    </>
  );
}

export default Chat;
