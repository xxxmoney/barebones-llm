import {DateTime} from 'ts-luxon';

export interface MessagesProps {
  messages?: Message[];
  update: (messageId: string, text: string) => Promise<void>;
}

export interface Message {
    id: string,
    text: string;
    position: 'start' | 'end';
    date: DateTime
}

// Tailwind No-Purge: chat-start chat-end
function Messages({ messages, update }: MessagesProps) {
  return (
    <>
      <div>
        {messages?.map((message, index) =>
          <div key={index} className={`chat chat-${message.position}`}>
            <p className="chat-bubble" contentEditable={true} suppressContentEditableWarning onBlur={(event) => update(message.id, event.currentTarget.textContent)}>
              {message.text}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
