import {useEffect, useMemo} from 'react';
import Chat from '../../components/Chat.tsx';
import {useChatStore} from '../../stores/chat.store.ts';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';
import type {Message} from '../../components/Messages.tsx';
import {useParams} from 'react-router';
import {useChatUpdate} from '../../hooks/useChatUpdate.ts';
import {useMessageUpdate} from '../../hooks/useMessageUpdate.ts';
import {NAME_MAX_LENGTH} from '../../constants/chat.constants.ts';

function ChatRoute() {
  const { id } = useParams();

  const loading: boolean = useChatStore(state => state.loading);
  const name: string | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.name);
  const messages: MessageDto[] | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.messages);
  const mappedMessages: Message[] | undefined = useMemo(() => messages?.map((message) => ({
    id: message.id,
    text: message.text,
    position: message.role === 'user' ? 'start' : 'end',
    date: message.date
  })), [messages]);

  const { handleUpdateChat, handleDeleteChat } = useChatUpdate(id);
  const { handleSubmitMessage, handleUpdateMessage, handleDeleteMessage } = useMessageUpdate();
  const getMessages = useChatStore(state => state.getMessages);

  useEffect(() => {
    if (id) {
      getMessages(id).then();
    }
  }, [id, getMessages]);

  return (
    <Chat
      name={name} nameMaxLength={NAME_MAX_LENGTH}
      messages={mappedMessages}
      disabled={loading}
      loading={loading}
      chatUpdate={handleUpdateChat} chatDelete={handleDeleteChat}
      messageSubmit={handleSubmitMessage} messageUpdate={handleUpdateMessage} messageDelete={handleDeleteMessage}
    />
  );
}

export default ChatRoute;
