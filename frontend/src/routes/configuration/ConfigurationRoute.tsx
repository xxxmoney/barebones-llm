import Configuration from '../../components/Configuration.tsx';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useConfigurationUpdate } from '../../hooks/useConfigurationUpdate.hook.ts';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import Loading from '../../components/Loading.tsx';

function ConfigurationRoute() {
  const loading: boolean = useConfigurationStore(state => state.loading);
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);
  const { handleUpdateConfiguration } = useConfigurationUpdate();

  return (
    <>
      <section className="flex flex-col gap-xl items-center">
        <h2>Configuration:</h2>

        {loading && <Loading />}

        <Configuration configuration={configuration} update={handleUpdateConfiguration} />
      </section>
    </>
  );
}

export default ConfigurationRoute;
