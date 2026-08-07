import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useChatStore} from '../../stores/chat.store.ts';

function AppLayout() {
  const getChats = useChatStore(state => state.getChats);

  // Single load on app start
  async function load() {
    console.log('Loading chats...');

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
      <div className="container mx-auto">
        <header className="pb-md">
          <nav className="navbar p-0">
            <div className="flex-1">
              <Link to="/">LOGO</Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/chat">Chat</Link></li>
              </ul>
            </div>
            <div className="flex-1"></div>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>

        <footer></footer>
      </div>
    </>
  );
}

export default AppLayout;
