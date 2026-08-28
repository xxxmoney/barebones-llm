import Configuration from '../../components/Configuration.tsx';
import { useConfigurationStore } from '../../stores/configuration.store.ts';
import { useConfigurationUpdate } from '../../hooks/useConfigurationUpdate.hook.ts';
import type { ConfigurationDto } from '../../dtos/configuration/configuration.dto.ts';
import Loading from '../../components/Loading.tsx';
import type { ModelDto } from '../../dtos/llm/model.dto.ts';
import { useModelsStore } from '../../stores/models.store.ts';
import { useEffect } from 'react';
import type { ValidationDto } from '../../dtos/validation.dto.ts';

function ConfigurationRoute() {
  const hasLoaded = useConfigurationStore(state => state.hasLoaded);
  const loading: boolean = useConfigurationStore(state => state.loading);
  const configuration: ConfigurationDto | undefined = useConfigurationStore(state => state.configuration);
  const validation: ValidationDto | undefined = useConfigurationStore(state => state.validation);
  const models: ModelDto[] = useModelsStore(state => state.models);
  const { handleUpdateConfiguration } = useConfigurationUpdate();
  const getModels = useModelsStore(state => state.getModels);
  const isModelsLoaded = useModelsStore(state => state.hasLoaded);
  const isModelsLoading = useModelsStore(state => state.loading);

  useEffect(() => {
    if (!isModelsLoaded && configuration?.isValid) {
      getModels().then();
    }
  }, [isModelsLoaded, configuration]);

  return (
    <>
      <section className="flex flex-col gap-md items-center">
        {(loading || isModelsLoading) && <Loading />}

        {hasLoaded &&
            <Configuration
              configuration={configuration}
              models={models.map(model => model.name)}
              invalidFields={Object.keys(validation?.fields ?? {}).filter(key => !validation!.fields[key])}
              disabled={loading}
              update={handleUpdateConfiguration}
            />
        }
      </section>
    </>
  );
}

export default ConfigurationRoute;
