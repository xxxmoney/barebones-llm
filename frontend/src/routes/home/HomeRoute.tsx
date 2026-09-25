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
              <p>App to <em>simply chat with AI</em></p>
              {!configuration?.isValid && <p>Firstly, we need to <em>setup the connection</em>:</p>}
            </div>
            <Link to="/chats" className="btn btn-primary">{configuration?.isValid ? 'LET\'S CHAT' : 'SET UP CONNECTION'}</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
