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
      <div>
        {messages.map((message, index) =>
          <div key={index} className={`chat chat-${message.position}`}>
            <p className="chat-bubble">
              {message.text}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
