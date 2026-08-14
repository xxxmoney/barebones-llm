import {useEffect} from 'react';
import {useChatStore} from '../../stores/chat.store.ts';
import {Link} from 'react-router';

function ChatListRoute() {
  const chats = useChatStore(state => state.chats);
  const getChats = useChatStore(state => state.getChats);

  async function load() {
    try {
      await getChats();
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  }

  useEffect(() => {
    load().then();
  }, []);

  return (
    <>
      <ul className="flex flex-col items-center gap-md">
        {chats.map(chat =>
          <li key={chat.id} className="btn btn-primary"><Link to={`/chat/${chat.id}`}>{chat.name}</Link></li>
        )}
      </ul>
    </>
  );
}

export default ChatListRoute;
