import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { Save } from 'lucide-react';
import type { SubmitEvent } from 'react';

export interface ConfigurationProps {
    configuration?: ConfigurationDto;
    disabled?: boolean;

    update: (configuration: ConfigurationUpdateDto) => Promise<void>;
}

function Configuration({ configuration, disabled, update }: ConfigurationProps) {
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
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset gap-sm">
          <legend className="fieldset-legend">Configuration</legend>

          <label className="label">OpenAI Url</label>
          <input disabled={disabled} value={configuration?.openAiUrl} name="openAiUrl" placeholder="Url" type="url" required className="input"  />

          <label className="label">OpenAI Token</label>
          <input disabled={disabled} value={configuration?.openAiToken} name="openAiToken" placeholder="Token" type="string" required className="input"  />

          {/*TODO: use Select.tsx*/}
          <label className="label">Model</label>
          <input disabled={disabled} value={configuration?.model} name="model" placeholder="Name" type="string" required className="input"  />

          <label className="label">Max Tokens</label>
          <input disabled={disabled} value={configuration?.maxTokens} name="model" placeholder="Max" type="number" required min="0" className="input"  />

          <label className="label">Temperature</label>
          <input disabled={disabled} value={configuration?.temperature} name="model" placeholder="Value" type="number" required min="0" max="1" step="0.1" className="input" />

          <button type="submit" disabled={disabled} data-tip="Update" className="btn btn-primary tooltip">
            <Save />
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default Configuration;
