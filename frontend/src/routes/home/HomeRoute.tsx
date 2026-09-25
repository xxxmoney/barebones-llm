import { Link } from 'react-router';

function HomeRoute() {

  return (
    <>
      <div className="hero h-full">
        <div className="hero-content">
          <div className="">
            <h1 className="text-heading">Bare<span className="font-extrabold">bones</span> LLM</h1>
            <div className="flex items-start flex-col mt-lg mb-sm gap-xs">
              <p>App to <em>simply chat with AI</em></p>
              <p>Firstly, we need to <em>setup the connection</em>:</p>
              <Link to="/chats" className="btn btn-primary">GETTING STARTED</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
