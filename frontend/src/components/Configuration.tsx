import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { Save } from 'lucide-react';
import { type SubmitEvent } from 'react';
import Select from './Select.tsx';

export interface ConfigurationProps {
    configuration?: ConfigurationDto;
    models: string[]
    disabled?: boolean;
    validationFields: Record<string, boolean>;

    update: (configuration: ConfigurationUpdateDto) => Promise<void>;
}

function Configuration({ configuration, models, disabled, validationFields, update }: ConfigurationProps) {
  const isOpenAiUrlValid = validationFields['openAiUrl'] ?? true;
  const isOpenAiTokenValid = validationFields['openAiToken'] ?? true;
  const isModelValid = validationFields['model'] ?? true;
  const isMaxTokensValid = validationFields['maxTokens'] ?? true;
  const isTemperatureValid = validationFields['temperature'] ?? true;

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

            <fieldset className="fieldset">
              <label htmlFor="openAiUrl" className="label">OpenAI Url</label>
              <input defaultValue={configuration?.openAiUrl} name="openAiUrl" id="openAiUrl" placeholder="Url" type="url" disabled={disabled} required className={`input ${!isOpenAiUrlValid ? 'invalid-input' : 'validator'}`} />
              <p className={`invalid-text ${isOpenAiUrlValid && 'hidden validator-hint'}`}>Invalid Url</p>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="openAiToken" className="label">OpenAI Token</label>
              <input defaultValue={configuration?.openAiToken} name="openAiToken" id="openAiToken" placeholder="Token" type="string" disabled={disabled} required className={`input ${!isOpenAiTokenValid ? 'invalid-input' : 'validator'}`}  />
              <p className={`invalid-text ${isOpenAiTokenValid && 'hidden validator-hint'}`}>Invalid Token</p>
            </fieldset>

            {models.length > 0 &&
                <fieldset className="fieldset">
                  <label htmlFor="model" className="label">Model</label>
                  <Select defaultValue={configuration?.model} name="model" options={models} placeholder="Choose model" disabled={disabled} required className={`input ${!isModelValid ? 'invalid-input' : 'validator'}`} />
                  <p className={`invalid-text ${isModelValid && 'hidden validator-hint'}`}>Invalid Model</p>
                </fieldset>
            }
          </fieldset>
        </details>

        <details className="collapse">
          <summary className="collapse-title p-0">Advanced</summary>

          <fieldset className="fieldset collapse-content p-0">
            <legend className="fieldset-legend hidden">Advanced</legend>

            <fieldset className="fieldset">
              <label htmlFor="maxTokens" className="label">Max Tokens</label>
              <input defaultValue={configuration?.maxTokens} name="maxTokens" id="maxTokens" placeholder="Max" type="number" disabled={disabled} required min="0" className={`input ${!isMaxTokensValid ? 'invalid-input' : 'validator'}`} />
              <p className={`invalid-text ${isMaxTokensValid && 'hidden validator-hint'}`}>Invalid Max Tokens</p>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="temperature" className="label">Temperature</label>
              <input defaultValue={configuration?.temperature} name="temperature" id="temperature" placeholder="Value" type="number" disabled={disabled} required min="0" max="1" step="0.1" className={`input ${!isTemperatureValid ? 'invalid-input' : 'validator'}`} />
              <p className={`invalid-text ${isTemperatureValid && 'hidden validator-hint'}`}>Invalid Temperature</p>
            </fieldset>
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
