import {useEffect} from 'react';
import {useChatStore} from '../../stores/chat.store.ts';
import {Link, useNavigate} from 'react-router';
import {DEFAULT_NAME} from '../../constants/chat.constants.ts';
import { Trash } from 'lucide-react';

function ChatListRoute() {
  const navigate = useNavigate();
  const chats = useChatStore(state => state.chats);
  const getChats = useChatStore(state => state.getChats);
  const insertChat = useChatStore(state => state.insertChat);
  const deleteChat = useChatStore(state => state.deleteChat);

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
      await navigate(`/chat/${chat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }

  async function remove(chatId: string) {
    try {
      await deleteChat(chatId);
    } catch(error) {
      console.error('Error deleting chat:', error);
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
            <li key={chat.id} className="relative">
              <Link className="btn btn-secondary" to={`/chat/${chat.id}`}>{chat.name}</Link>
              <Trash onClick={() => remove(chat.id)} className="absolute top-0 right-0 translate-x-2 -translate-y-2 cursor-pointer hover:animate-pulse" />
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export default ChatListRoute;
