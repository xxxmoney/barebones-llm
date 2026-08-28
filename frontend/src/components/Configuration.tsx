import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { Save } from 'lucide-react';
import type { SubmitEvent } from 'react';
import Select from './Select.tsx';

export interface ConfigurationProps {
    configuration?: ConfigurationDto;
    models: string[]
    disabled?: boolean;
    invalidFields?: string[];

    update: (configuration: ConfigurationUpdateDto) => Promise<void>;
}

function Configuration({ configuration, models, disabled, invalidFields, update }: ConfigurationProps) {
  const isOpenAiUrlInalid = invalidFields?.includes('openAiUrl');
  const isOpenAiTokenInvalid = invalidFields?.includes('openAiToken');
  const isModelInvalid = invalidFields?.includes('model');
  const isMaxTokensInvalid = invalidFields?.includes('maxTokens');
  const isTemperatureInvalid = invalidFields?.includes('temperature');

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await update({
      openAiUrl: formData.get('openAiUrl') as string,
      openAiToken: formData.get('openAiToken') as string,
      model: formData.get('model') as string,
      maxTokens: Number(formData.get('maxTokens')),
      temperature: Number(formData.get('temperature')),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-80 gap-md">
        <details className="collapse collapse-open" open>
          <summary className="collapse-title p-0">Main Settings</summary>
            
          <fieldset className="fieldset collapse-content p-0">
            <legend className="fieldset-legend hidden">Main Settings</legend>

            <label htmlFor="openAiUrl" className="label">OpenAI Url</label>
            <input defaultValue={configuration?.openAiUrl} name="openAiUrl" id="openAiUrl" placeholder="Url" type="url" disabled={disabled} required className="input validator" />
            {isOpenAiUrlInalid && <p className="validator-hint visible">Invalid Url</p>}

            <label htmlFor="openAiToken" className="label">OpenAI Token</label>
            <input defaultValue={configuration?.openAiToken} name="openAiToken" id="openAiToken" placeholder="Token" type="string" disabled={disabled} required className="input validator"  />
            {isOpenAiTokenInvalid && <p className="validator-hint visible">Invalid Token</p>}

            {models.length > 0 &&
                <>
                  <label htmlFor="model" className="label">Model</label>
                  <Select defaultValue={configuration?.model} name="model" options={models} placeholder="Choose model" disabled={disabled} required />
                  {isModelInvalid && <p className="validator-hint visible">Invalid Model</p>}
                </>
            }
          </fieldset>
        </details>

        <details className="collapse">
          <summary className="collapse-title p-0">Advanced</summary>

          <fieldset className="fieldset collapse-content p-0">
            <legend className="fieldset-legend hidden">Advanced</legend>

            <label htmlFor="maxTokens" className="label">Max Tokens</label>
            <input defaultValue={configuration?.maxTokens} name="maxTokens" id="maxTokens" placeholder="Max" type="number" disabled={disabled} required min="0" className="input validator"  />
            {isMaxTokensInvalid && <p className="validator-hint visible">Invalid Max Tokens</p>}

            <label htmlFor="temperature" className="label">Temperature</label>
            <input defaultValue={configuration?.temperature} name="temperature" id="temperature" placeholder="Value" type="number" disabled={disabled} required min="0" max="1" step="0.1" className="input validator" />
            {isTemperatureInvalid && <p className="validator-hint visible">Invalid Temperature</p>}
          </fieldset>
        </details>

        <button type="submit" data-tip="Update" disabled={disabled} className="btn btn-primary w-full tooltip">
          <Save />
        </button>
      </form>
    </>
  );
}

export default Configuration;
