import {Link} from 'react-router';

function HomeRoute() {

  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-heading">Self Learning App</h1>
            <p className="py-lg">Do you want to learn, but don't know how? <br/> Try me now! <br/> Simple as it can get.</p>
            <Link to="/chats" className="btn btn-primary">LET'S DO IT</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
