import {Link, Outlet} from 'react-router';
import { Toaster } from 'react-hot-toast';

function AppLayout() {
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
