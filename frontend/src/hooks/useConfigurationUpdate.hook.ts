import { useConfigurationStore } from '../stores/configuration.store.ts';
import type { ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useModelsStore } from '../stores/models.store.ts';
import { useNavigate } from 'react-router';

export function useConfigurationUpdate() {
  const navigate = useNavigate();
  const getModels = useModelsStore(state => state.getModels);
  const isModelsLoaded = useModelsStore(state => state.hasLoaded);

  const updateConfiguration = useConfigurationStore(state => state.updateConfiguration);
  const handleUpdateConfiguration = useCallback((value: ConfigurationUpdateDto) =>
    toast.promise(async () => {
      const data = await updateConfiguration(value);
      const isConnectionValid = data.validation.fields['openAiUrl'] && data.validation.fields['openAiToken'];
      if (!isModelsLoaded && !data.validation.isValid && isConnectionValid) {
        await getModels(); // Load models if connection part of configuration is valid
      }

      if (data.validation.isValid) {
        await navigate('/chats');
      }
    }, {
      loading: 'Updating configuration...',
      success: 'Configuration updated!',
      error: 'Failed to update configuration'
    }), [updateConfiguration]);

  return { handleUpdateConfiguration };
}
