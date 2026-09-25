import { Link } from 'react-router';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import { useConfigurationStore } from '../../stores/configuration.store.ts';

function HomeRoute() {
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);

  return (
    <>
      <div className="hero h-full">
        <div className="hero-content">
          <div className="flex items-start flex-col gap-lg">
            <h1 className="text-heading">Bare<span className="font-extrabold">bones</span> LLM</h1>
            <div className="flex items-start flex-col gap-xs">
              <p>App to <em><Link to="/chats" className="link link-hover">simply chat with AI</Link></em></p>
              {configuration?.isValid || <p>Firstly, we need to <em><Link to="/configuration" className="link link-hover">set up connection</Link></em>:</p>}
            </div>
            <div className="flex items-start flex-row gap-md">
              {configuration?.isValid && <Link to="/chats" className="btn btn-primary">Let's chat</Link>}
              <Link to="/configuration" className="btn btn-primary">Set up connection</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
