import { useChatStore } from '../stores/chat.store.ts';
import { NavLink, useNavigate } from 'react-router';
import { DEFAULT_NAME } from '../constants/chat.constants.ts';
import Delete from '../components/Delete.tsx';
import { Plus } from 'lucide-react';
import type { ComponentProps } from 'react';

function ChatList({ ...rest }: ComponentProps<'section'>) {
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
      <section {...rest} className={`flex flex-col gap-xl items-center px-lg ${rest.className}`}>
        <button onClick={create} className="btn btn-primary tooltip tooltip-right grow-0 shrink-0" data-tip="New">
          <Plus /> Create New Chat
        </button>

        <h2 className="text-lg grow-0 shrink-0">Choose from your chats:</h2>

        <ul className="flex flex-col items-center gap-md grow-1 shrink-1">
          {chats.map((chat, index) =>
            <li key={chat.id} className="relative group">
              <NavLink className={`link link-hover tooltip ${index % 2 == 0 ? 'tooltip-left' : 'tooltip-right'}`} data-tip="Open" to={`/chat/${chat.id}`}>{chat.name}</NavLink>
              <Delete click={() => remove(chat.id)} absolute className="opacity-0 group-hover:opacity-100" />
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export default ChatList;
