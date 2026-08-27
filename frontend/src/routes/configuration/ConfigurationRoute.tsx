import Configuration from '../../components/Configuration.tsx';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useConfigurationUpdate } from '../../hooks/useConfigurationUpdate.hook.ts';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import Loading from '../../components/Loading.tsx';
import type { ModelDto } from '../../dtos/llm/model.dto.ts';
import { useLlmStore } from '../../stores/openAiStore.store.ts';
import { useEffect, useMemo } from 'react';

function ConfigurationRoute() {
  const hasLoaded = useConfigurationStore(state => state.hasLoaded);
  const loading: boolean = useConfigurationStore(state => state.loading);
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);
  const models: ModelDto[] = useLlmStore(state => state.models);
  const modelNames: string[] = useMemo(() => models.map(model => model.name), [models]);
  const { handleUpdateConfiguration } = useConfigurationUpdate();
  const getModels = useLlmStore(state => state.getModels);
  const isModelsLoaded = useLlmStore(state => state.hasLoaded);
  const isModelsLoading = useLlmStore(state => state.loading);

  useEffect(() => {
    if (!isModelsLoaded && configuration?.isConfigured) {
      getModels().then();
    }
  }, [isModelsLoaded, configuration]);

  return (
    <>
      <section className="flex flex-col gap-md items-center">
        {(loading || isModelsLoading) && <Loading />}

        {hasLoaded && <Configuration configuration={configuration} models={modelNames} disabled={loading} update={handleUpdateConfiguration} />}
      </section>
    </>
  );
}

export default ConfigurationRoute;
