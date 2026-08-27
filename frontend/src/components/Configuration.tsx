import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { Save } from 'lucide-react';
import type { SubmitEvent } from 'react';
import Select from './Select.tsx';

export interface ConfigurationProps {
    configuration?: ConfigurationDto;
    models: string[]
    disabled?: boolean;

    update: (configuration: ConfigurationUpdateDto) => Promise<void>;
}

function Configuration({ configuration, models, disabled, update }: ConfigurationProps) {
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
            <input defaultValue={configuration?.openAiUrl} name="openAiUrl" id="openAiUrl" placeholder="Url" type="url" disabled={disabled} required className="input"  />

            <label htmlFor="openAiToken" className="label">OpenAI Token</label>
            <input defaultValue={configuration?.openAiToken} name="openAiToken" id="openAiToken" placeholder="Token" type="string" disabled={disabled} required className="input"  />

            <label htmlFor="model" className="label">Model</label>
            <Select name="model" options={models} defaultValue={configuration?.model} />
          </fieldset>
        </details>

        <details className="collapse">
          <summary className="collapse-title p-0">Advanced</summary>

          <fieldset className="fieldset collapse-content p-0">
            <legend className="fieldset-legend hidden">Advanced</legend>

            <label htmlFor="maxTokens" className="label">Max Tokens</label>
            <input defaultValue={configuration?.maxTokens} name="maxTokens" id="maxTokens" placeholder="Max" type="number" disabled={disabled} required min="0" className="input"  />

            <label htmlFor="temperature" className="label">Temperature</label>
            <input defaultValue={configuration?.temperature} name="temperature" id="temperature" placeholder="Value" type="number" disabled={disabled} required min="0" max="1" step="0.1" className="input" />
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
