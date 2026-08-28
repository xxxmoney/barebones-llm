import { Link } from 'react-router';

function HomeRoute() {

  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-heading"><span className="uppercase font-extrabold">Bare</span>bones LLM</h1>
            <p className="py-lg">Let's chat with local LLM - as simple as it can get</p>
            <Link to="/chats" className="btn btn-primary">LET'S DO IT</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
