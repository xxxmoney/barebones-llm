import Chat from '../../components/Chat.tsx';
import {useEffect, useState} from 'react';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';

function ChatRoute() {
  const [messages, setMessages] = useState<MessageDto[]>([]);

  useEffect(() => {
    function setData() {
      setMessages([{ text: 'First text', position: 'start' }, { text: 'Second text', position: 'end' }]);
    }

    setData();
  }, []);

  return (
    <>
      <h2 className="text-heading text-center">Chat</h2>

      <Chat messages={messages} />
    </>
  );
}

export default ChatRoute;
