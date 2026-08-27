import { useConfigurationStore } from '../stores/configuration.store.ts';
import type { ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { ValidationError } from '../errors/ValidationError.ts';
import { useLlmStore } from '../stores/openAiStore.store.ts';
import { useNavigate } from 'react-router';

export function useConfigurationUpdate() {
  const navigate = useNavigate();
  const getModels = useLlmStore(state => state.getModels);
  const isModelsLoaded = useLlmStore(state => state.hasLoaded);

  const updateConfiguration = useConfigurationStore(state => state.updateConfiguration);
  const handleUpdateConfiguration = useCallback((value: ConfigurationUpdateDto) =>
    // TODO: maybe separate waiting for update confiruation and then getting models
    toast.promise(async () => {
      try {
        await updateConfiguration(value);

        await navigate('/chats');
      } catch (error) {
        // Fetch models if connection info is valid
        if (!isModelsLoaded && error instanceof ValidationError && error.detail.fields['open_ai_url'] && error.detail.fields['open_ai_token']) {
          await getModels();
        }
      }
    }, {
      loading: 'Updating configuration...',
      success: 'Configuration updated!',
      error: 'Failed to update configuration'
    })
  ,
  [updateConfiguration]
  );

  return { handleUpdateConfiguration };
}
