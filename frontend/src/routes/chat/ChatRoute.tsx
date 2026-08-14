import {useEffect, useMemo} from 'react';
import Chat from '../../components/Chat.tsx';
import {useChatStore} from '../../stores/chat.store.ts';
import type {MessageDto} from '../../dtos/chat/message.dto.ts';
import type {Message} from '../../components/Messages.tsx';
import {useParams} from 'react-router';
import {ROLE_USER} from '../../constants/chat.constants.ts';
import Loading from '../../components/Loading.tsx';

function ChatRoute() {
  const { id } = useParams();

  const loading: boolean = useChatStore(state => state.loading);
  const name: string | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.name);
  const messages: MessageDto[] | undefined = useChatStore(state => state.chats.find(chat => chat.id === id)?.messages);
  const mappedMessages: Message[] | undefined = useMemo(() => messages?.map((message) => ({
    text: message.text,
    position: message.role === 'user' ? 'start' : 'end',
    date: message.date
  })), [messages]);
  const submitMessage = useChatStore(state => state.submitMessage);
  const getMessages = useChatStore(state => state.getMessages);

  useEffect(() => {
    if (id) {
      getMessages(id).then();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  else if (name && mappedMessages) {
    return (
      <Chat name={name} messages={mappedMessages} submit={(text) => submitMessage(id!, { text: text, role: ROLE_USER })} />
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
