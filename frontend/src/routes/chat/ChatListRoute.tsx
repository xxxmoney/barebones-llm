import {useEffect} from 'react';
import {useChatStore} from '../../stores/chat.store.ts';
import {Link, useNavigate} from 'react-router';
import {DEFAULT_NAME} from '../../constants/chat.constants.ts';

function ChatListRoute() {
  const navigate = useNavigate();
  const chats = useChatStore(state => state.chats);
  const getChats = useChatStore(state => state.getChats);
  const insertChat = useChatStore(state => state.insertChat);

  async function load() {
    try {
      await getChats();
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  }

  async function create() {
    try {
      const chat = await insertChat({ name: DEFAULT_NAME });
      navigate(`/chat/${chat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }

  useEffect(() => {
    load().then();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-xl items-center">
        <button onClick={create} className="btn btn-primary">Create</button>

        <h2 className="text-lg text-center">Chats:</h2>
        <ul className="flex max-w-80 flex-col items-center gap-md">
          {chats.map(chat =>
            <li key={chat.id} className="btn btn-secondary"><Link to={`/chat/${chat.id}`}>{chat.name}</Link></li>
          )}
        </ul>
      </section>
    </>
  );
}

export default ChatListRoute;
