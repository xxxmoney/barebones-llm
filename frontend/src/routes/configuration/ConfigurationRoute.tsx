import Configuration from '../../components/Configuration.tsx';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useConfigurationUpdate } from '../../hooks/useConfigurationUpdate.hook.ts';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import Loading from '../../components/Loading.tsx';
import type { ModelDto } from '../../dtos/openAi/model.dto.ts';
import { useOpenAiStore } from '../../stores/openAiStore.store.ts';
import { useMemo } from 'react';

function ConfigurationRoute() {
  const loading: boolean = useConfigurationStore(state => state.loading);
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);
  const models: ModelDto[] = useOpenAiStore(state => state.models);
  const modelNames: string[] = useMemo(() => models.map(model => model.name), [models]);
  const { handleUpdateConfiguration } = useConfigurationUpdate();

  return (
    <>
      <section className="flex flex-col gap-md items-center">
        {loading && <Loading />}

        <Configuration configuration={configuration} models={modelNames} update={handleUpdateConfiguration} />
      </section>
    </>
  );
}

export default ConfigurationRoute;
