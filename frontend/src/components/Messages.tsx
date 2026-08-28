import { DateTime } from 'ts-luxon';
import EditableText from './EditableText.tsx';
import { useEffect, useRef } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div>
        {messages?.map(message =>
          <div key={message.id} id={message.id} className={`relative chat chat-${message.position}`}>
            <EditableText text={message.text} allowEnter update={text => update(message.id, text)} clear={() => clear(message.id)} className="chat-bubble" />
          </div>
        )}

        <div ref={scrollRef}></div>
      </div>
    </>
  );
}

export default Messages;
