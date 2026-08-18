import {useCallback, useEffect, useMemo} from 'react';
import Chat from '../../components/Chat.tsx';
import {useChatStore} from '../../stores/chat.store.ts';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';
import type {Message} from '../../components/Messages.tsx';
import {useNavigate, useParams} from 'react-router';

function ChatRoute() {
  const navigate = useNavigate();

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

  const updateChat = useChatStore(state => state.updateChat);
  const handleUpdateChat = useCallback(
    async (name: string) => {
      await updateChat(id!, { name: name });
    },
    [id, updateChat]
  );
  const deleteChat = useChatStore(state => state.deleteChat);
  const handleDeleteChat = useCallback(
    async () => {
      await deleteChat(id!);
      await navigate('/chats');
    },
    [id, deleteChat, navigate]
  );
  const submitMessage = useChatStore(state => state.submitMessage);
  const handleSubmitMessage = useCallback(
    async (text: string) => {
      await submitMessage(id!, { text: text });
    },
    [id, submitMessage]
  );
  const getMessages = useChatStore(state => state.getMessages);
  const updateMessage = useChatStore(state => state.updateMessage);
  const handleUpdateMessage = useCallback(
    async (messageId: string, text: string) => {
      await updateMessage(id!, messageId, { text: text });
    },
    [id, updateMessage]
  );
  const deleteMessage = useChatStore(state => state.deleteMessage);
  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      await deleteMessage(id!, messageId);
    },
    [id, deleteMessage]
  );

  useEffect(() => {
    if (id) {
      getMessages(id).then();
    }
  }, [id, getMessages]);

  return (
    <Chat name={name} messages={mappedMessages} disabled={loading} loading={loading}
      chatUpdate={handleUpdateChat}
      chatDelete={handleDeleteChat}
      messageSubmit={handleSubmitMessage}
      messageUpdate={handleUpdateMessage}
      messageDelete={handleDeleteMessage}

    />
  );
}

export default ChatRoute;
