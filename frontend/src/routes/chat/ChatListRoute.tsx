import { useChatStore } from '../../stores/chat.store.ts';
import { Link, useNavigate } from 'react-router';
import { DEFAULT_NAME } from '../../constants/chat.constants.ts';
import Delete from '../../components/Delete.tsx';
import { Plus } from 'lucide-react';

function ChatListRoute() {
  const navigate = useNavigate();
  const chats = useChatStore(state => state.chats);
  const insertChat = useChatStore(state => state.insertChat);
  const deleteChat = useChatStore(state => state.deleteChat);

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

  return (
    <>
      <section className="flex flex-col gap-xl items-center">
        <button onClick={create} className="btn btn-primary tooltip tooltip-right" data-tip="New">
          <Plus />
        </button>

        <h2 className="text-lg">Chats:</h2>
        <ul className="flex max-w-80 flex-col items-center gap-md">
          {chats.map((chat, index) =>
            <li key={chat.id} className="relative group">
              <Link className={`btn btn-secondary tooltip ${index % 2 == 0 ? 'tooltip-left' : 'tooltip-right'}`} data-tip="Open" to={`/chat/${chat.id}`}>{chat.name}</Link>
              <Delete click={() => remove(chat.id)} absolute className="opacity-0 group-hover:opacity-100" />
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export default ChatListRoute;
