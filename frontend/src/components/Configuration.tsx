import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { Save } from 'lucide-react';
import { type SubmitEvent } from 'react';
import Select from './Select.tsx';
import ValidableElement from './ValidableElement.tsx';

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
              <ValidableElement invalidText="Invalid Url" isValid={isOpenAiUrlValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.openAiUrl} name="openAiUrl" id="openAiUrl" placeholder="Url" type="url" disabled={disabled} required className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="openAiToken" className="label">OpenAI Token</label>

              <ValidableElement invalidText="Invalid Token" isValid={isOpenAiTokenValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.openAiToken} name="openAiToken" id="openAiToken" placeholder="Token" type="string" disabled={disabled} required className={`input ${className}`}  />
                )}
              </ValidableElement>
            </fieldset>

            {models.length > 0 &&
                <fieldset className="fieldset">
                  <label htmlFor="model" className="label">Model</label>
                  <ValidableElement invalidText="Invalid Model" isValid={isModelValid}>
                    {({ className }) => (
                      <Select defaultValue={configuration?.model} name="model" options={models} placeholder="Choose model" disabled={disabled} required className={`input ${className}`} />
                    )}
                  </ValidableElement>
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

              <ValidableElement invalidText="Invalid Max Tokens" isValid={isMaxTokensValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.maxTokens} name="maxTokens" id="maxTokens" placeholder="Max" type="number" disabled={disabled} required min="0" className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="temperature" className="label">Temperature</label>
              <ValidableElement invalidText="Invalid Temperature" isValid={isTemperatureValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.temperature} name="temperature" id="temperature" placeholder="Value" type="number" disabled={disabled} required min="0" max="1" step="0.1" className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>
          </fieldset>
        </details>

        <button type="submit" data-tip="Save" disabled={disabled} className="btn btn-primary w-full tooltip">
          <Save />
        </button>
      </form>
    </>
  );
}

export default Configuration;
