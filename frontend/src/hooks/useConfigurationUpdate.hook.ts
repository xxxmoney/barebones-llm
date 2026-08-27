import { useConfigurationStore } from '../stores/configuration.store.ts';
import type { ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useConfigurationUpdate() {
  const updateConfiguration = useConfigurationStore(state => state.updateConfiguration);
  const handleUpdateConfiguration = useCallback(
    async (value: ConfigurationUpdateDto) => {
      const updateConfigurationPromise = updateConfiguration(value);
      await toast.promise(updateConfigurationPromise, {
        loading: 'Updating configuration...',
        success: 'Configuration updated!',
        error: 'Failed to update configuration'
      });
    },
    [updateConfiguration]
  );

  return { handleUpdateConfiguration };
}
