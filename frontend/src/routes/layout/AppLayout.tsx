import { NavLink, Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useChatStore } from '../../stores/chat.store.ts';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useEffect } from 'react';
import Loading from '../../components/Loading.tsx';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import { MessagesSquare, Settings } from 'lucide-react';

function AppLayout() {
  const getChats = useChatStore(state => state.getChats);
  const isChatsLoaded = useChatStore(state => state.hasLoaded);
  const getConfiguration = useConfigurationStore(state => state.getConfiguration);
  const isConfigurationLoaded = useConfigurationStore(state => state.hasLoaded);
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);

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
      <div className="w-full h-screen max-w-[1000px] mx-auto flex flex-col px-sm">
        <header className="grow-0 shrink-0">
          <nav className="navbar p-0">
            <ul className="menu menu-horizontal w-full">
              <li className="tooltip tooltip-bottom" data-tip="Go to home page">
                <NavLink className="link link-hover" to="/"><img src="/favicon.ico" alt="logo" className="rounded inline"/> BarebonesLLM</NavLink>
              </li>
              <div className="flex-grow-1"></div>
              {configuration?.isValid &&
                    <li className="tooltip tooltip-bottom" data-tip="Explore your chats">
                      <NavLink className="link link-hover" to="/chats">
                        <MessagesSquare /> Chats
                      </NavLink>
                    </li>
              }
              <li className="tooltip tooltip-bottom" data-tip="Change your settings">
                <NavLink className="link link-hover" to="/configuration">
                  <Settings /> Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <main className="grow-1 shrink-1 overflow-y-auto scrollbar-thin py-xl">
          <Outlet />
        </main>

        <footer className="grow-0 shrink-0"></footer>

        <Toaster position="bottom-right" />
      </div>
    </>
  );
}

export default AppLayout;
