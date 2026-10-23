import { useEffect, useMemo } from 'react';
import Chat from '../../components/Chat.tsx';
import { useChatStore } from '../../stores/chat.store.ts';
import type { MessageDto } from '../../dtos/chat/message.dto.ts';
import type { Message } from '../../components/Messages.tsx';
import { useNavigate, useParams } from 'react-router';
import { useChatUpdate } from '../../hooks/useChatUpdate.hook.ts';
import { useMessageUpdate } from '../../hooks/useMessageUpdate.hook.ts';
import { DEFAULT_NAME, NAME_MAX_LENGTH } from '../../constants/chat.constants.ts';
import ChatList from '../../components/ChatList.tsx';

function ChatRoute() {
  const { id } = useParams();

  const loading: boolean = useChatStore(state => state.loading);
  const name: string | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.name);
  const messages: MessageDto[] | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.messages);
  const mappedMessages: Message[] | undefined = useMemo(() => messages?.map((message) => ({
    id: message.id,
    text: message.text,
    position: message.role === 'user' ? 'end' : 'start',
    date: message.date
  })), [messages]);

  const navigate = useNavigate();
  const { handleUpdateChat, handleDeleteChat } = useChatUpdate(id);
  const { handleSubmitMessage, handleUpdateMessage, handleDeleteMessage } = useMessageUpdate(id);
  const getMessages = useChatStore(state => state.getMessages);
  const insertChat = useChatStore(state => state.insertChat);

  async function create() {
    try {
      const chat = await insertChat({ name: DEFAULT_NAME });
      await navigate(`/chat/${chat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }

  useEffect(() => {
    if (id) {
      getMessages(id).then();
    }
  }, [id, getMessages]);

  return (
    <>
      <div className="flex flex-row gap-lg">
        <ChatList className="grow-0 shrink-0" />

        {id && <Chat
          name={name} nameMaxLength={NAME_MAX_LENGTH}
          messages={mappedMessages}
          disabled={loading}
          loading={loading}
          chatUpdate={handleUpdateChat} chatDelete={handleDeleteChat}
          messageSubmit={handleSubmitMessage} messageUpdate={handleUpdateMessage} messageDelete={handleDeleteMessage}
          className="grow-1"
        />}

        {!id && <div className="flex-grow-1 flex flex-row justify-center pt-lg">
          <button onClick={create} className="btn btn-primary">Create New Chat</button>
        </div>}
      </div>
    </>
  );
}

export default ChatRoute;
