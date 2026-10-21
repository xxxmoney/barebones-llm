import { useChatStore } from '../stores/chat.store.ts';
import { NavLink, useNavigate } from 'react-router';
import { DEFAULT_NAME } from '../constants/chat.constants.ts';
import Delete from '../components/Delete.tsx';
import { Menu, Plus } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

function ChatList({ ...rest }: ComponentProps<'section'>) {
  const [isHidden, setIsHidden] = useState<boolean>(false);
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
      await navigate('/chat/');
    } catch(error) {
      console.error('Error deleting chat:', error);
    }
  }

  function toggleHidden() {
    setIsHidden(!isHidden);
  }

  return (
    <>
      <div className="px-md flex flex-col items-center gap-sm">
        <div className="self-stretch flex flex-row gap-md">
          <button onClick={toggleHidden} className="cursor-pointer tooltip tooltip-right grow-0 shrink-0" data-tip={isHidden ? 'Show' : 'Hide'}>
            <Menu />
          </button>

          <div className={`min-w-[1px] h-full bg-base-content ${isHidden && 'hidden'}`}/>

          <button onClick={create} className={`cursor-pointer tooltip tooltip-right ${isHidden && 'hidden'}`} data-tip="New">
            <Plus />
          </button>
        </div>

        <div className={`min-w-[8rem] ${isHidden && 'hidden'}`}>
          <hr className="min-h-[1px] bg-base-content border-none" />
        </div>

        <section {...rest} className={`flex flex-col gap-sm ${isHidden && 'hidden'} ${rest.className}`}>
          <h2 className="self-stretch text-lg text-center grow-0 shrink-0">Chats:</h2>

          <ul className="flex flex-col items-center gap-md">
            {chats.map(chat =>
              <li key={chat.id} className="relative group">
                <NavLink className="link link-hover" to={`/chat/${chat.id}`}>{chat.name}</NavLink>
                <Delete click={() => remove(chat.id)} absolute className="opacity-0 group-hover:opacity-100" />
              </li>
            )}
          </ul>
        </section>
      </div>

    </>
  );
}

export default ChatList;
