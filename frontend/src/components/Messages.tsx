import {DateTime} from 'ts-luxon';
import Delete from './Delete.tsx';
import EditableText from './EditableText.tsx';

export interface MessagesProps {
  messages?: Message[];
  update: (messageId: string, text: string) => Promise<void>;
    clear: (messageId: string) => Promise<void>;
}

export interface Message {
    id: string,
    text: string;
    position: 'start' | 'end';
    date: DateTime;
}

// Tailwind No-Purge: chat-start chat-end
function Messages({ messages, update, clear }: MessagesProps) {
  return (
    <>
      <div>
        {messages?.map((message, index) =>
          <div key={index} className={`relative chat chat-${message.position}`}>
            <EditableText text={message.text} update={text => update(message.id, text)} className="chat-bubble" />

            <Delete click={() => clear(message.id)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
