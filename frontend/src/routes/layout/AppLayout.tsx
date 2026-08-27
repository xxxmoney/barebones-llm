import { Link, Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useChatStore } from '../../stores/chat.store.ts';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useEffect } from 'react';
import Loading from '../../components/Loading.tsx';

function AppLayout() {
  const getChats = useChatStore(state => state.getChats);
  const isChatsLoaded = useChatStore(state => state.hasLoaded);
  const getConfiguration = useConfigurationStore(state => state.getConfiguration);
  const isConfigurationLoaded = useConfigurationStore(state => state.hasLoaded);

  useEffect(() => {
    Promise.all([
      getChats(),
      getConfiguration()
    ]).then();
  }, []);

  if (!isChatsLoaded || !isConfigurationLoaded) {
    return (
      <>
        <div className="w-screen h-screen">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-sm">
        <header>
          <nav className="navbar p-0">
            <div className="flex-1">
              <Link to="/">LOGO</Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal">
                <li className="text-xl"><Link to="/">Home</Link></li>
                <li className="text-xl"><Link to="/chats">Chats</Link></li>
              </ul>
            </div>
            <div className="flex-1"></div>
          </nav>
        </header>

        <main className="py-md">
          <Outlet />
        </main>

        <footer></footer>

        <Toaster position="bottom-right" />
      </div>
    </>
  );
}

export default AppLayout;
