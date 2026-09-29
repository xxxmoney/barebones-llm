import Messages, { type Message } from './Messages.tsx';
import TextSubmit from './TextSubmit.tsx';
import Loading from './Loading.tsx';
import EditableText from './EditableText.tsx';
import { memo } from 'react';

interface ChatProps {
    name?: string;
    nameMaxLength?: number;
    messages?: Message[];
    disabled?: boolean;
    loading?: boolean;
    messageSubmit: (text: string) => Promise<void>;
    messageUpdate: (messageId: string, text: string) => Promise<void>;
    messageDelete: (messageId: string) => Promise<void>;
    chatUpdate: (name: string) => Promise<void>;
    chatDelete: () => Promise<void>;
}

const MemoEditableText = memo(EditableText);
const MemoMessages = memo(Messages);
const MemoTextSubmit = memo(TextSubmit);

function Chat({ name, nameMaxLength, messages, disabled = false, loading = false, messageSubmit, messageUpdate, chatUpdate, chatDelete, messageDelete }: ChatProps) {
  const hasMessages = messages && messages.length > 0;

  return (
    <>
      <section className="mx-auto flex flex-col gap-lg max-w-[35rem]">
        <h2 className="text-heading text-center">
          <MemoEditableText text={name} maxLength={nameMaxLength} update={chatUpdate} clear={chatDelete} allowEnterSubmit />
        </h2>

        <MemoMessages messages={messages} update={messageUpdate} clear={messageDelete} />

        {loading && <Loading />}

        <MemoTextSubmit disabled={disabled} submit={messageSubmit} placeholder={hasMessages ? 'How do you want to continue this conversation with AI?' : 'What do you want to ask AI about today?'} autoFocus />
      </section>
    </>
  );
}

export default Chat;
