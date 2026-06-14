import {Link, Outlet} from 'react-router';

function AppLayout() {

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
