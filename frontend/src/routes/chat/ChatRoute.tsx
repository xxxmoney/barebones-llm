import {useEffect, useMemo} from 'react';
import Chat from '../../components/Chat.tsx';
import {useChatStore} from '../../stores/chat.store.ts';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';
import type {Message} from '../../components/Messages.tsx';
import {useParams} from 'react-router';

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
  const submitMessage = useChatStore(state => state.submitMessage);
  const getMessages = useChatStore(state => state.getMessages);
  const updateMessage = useChatStore(state => state.updateMessage);

  useEffect(() => {
    if (id) {
      getMessages(id).then();
    }
  }, [id]);

  if (id && name && mappedMessages) {
    return (
      <Chat name={name} messages={mappedMessages} disabled={loading} loading={loading}
        submit={(text) => submitMessage(id!, { text: text })}
        update={(messageId, text) => updateMessage(id, messageId, { text: text })}
      />
    );
  } else {
    return (
      <>
        <h2 className="text-heading text-center">Chat not found :/</h2>
      </>
    );
  }
}

export default ChatRoute;
