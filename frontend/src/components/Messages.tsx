import {DateTime} from 'ts-luxon';

export interface MessagesProps {
  messages: Message[];
}

export interface Message {
    text: string;
    position: 'start' | 'end';
    date: DateTime
}

function Messages({ messages }: MessagesProps) {
  return (
    <>
      <div className="w-full">
        {messages.map(message =>
          <span className={`chat chat-${message.position}`}>
            <p className="chat-bubble">
              {message.text}
            </p>
          </span>
        )}
      </div>
    </>
  );
}

export default Messages;
