import {useMemo} from 'react';
import Chat from '../../components/Chat.tsx';
import {useChatStore} from '../../stores/chat.store.ts';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';
import type {Message} from '../../components/Messages.tsx';

function ChatRoute() {
  const name: string = useChatStore(state => state.chats.find(chat => chat.id === state.currentChatId)!.name ?? 'New Chat');
  const messages: MessageDto[] = useChatStore(state => state.chats.find(chat => chat.id === state.currentChatId)!.messages);
  const mappedMessages: Message[] = useMemo(() => messages.map((message) => ({
    text: message.text,
    position: message.role === 'user' ? 'start' : 'end',
    date: message.date
  })), [messages]);
  const submitMessage = useChatStore(state => state.submitMessage);

  return (
    <>
      <Chat name={name} messages={mappedMessages} submit={submitMessage} />
    </>
  );
}

export default ChatRoute;
