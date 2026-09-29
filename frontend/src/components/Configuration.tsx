import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { ChevronDown, CircleQuestionMark, Save } from 'lucide-react';
import { type ChangeEvent, type SubmitEvent, useRef, useState } from 'react';
import Select from './Select.tsx';
import ValidableElement from './ValidableElement.tsx';
import { PROVIDERS } from '../constants/configuration.constants.ts';

export interface ConfigurationProps {
    configuration?: ConfigurationDto;
    models: string[]
    disabled?: boolean;
    validationFields: Record<string, boolean>;

    update: (configuration: ConfigurationUpdateDto) => Promise<void> | void;
    openAiUrlChange?: () => Promise<void> | void;
}

function Configuration({ configuration, models, disabled, validationFields, update, openAiUrlChange }: ConfigurationProps) {
  const modelRef = useRef<HTMLSelectElement>(null);
  const [showCustomProvider, setShowCustomProvider] = useState<boolean>(configuration?.isCustomAiProvider ?? false);

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
      isCustomAiProvider: formData.get('customAiProvider') === 'on',
    });
  }

  function resetCurrentModel() {
    if (modelRef.current) {
      modelRef.current.value = '';
    }
  }

  function handleOpenAiUrlChange() {
    resetCurrentModel();
    openAiUrlChange?.();
  }

  async function handleIsCustomProviderChange(value: ChangeEvent<HTMLInputElement>) {
    setShowCustomProvider(value.currentTarget.checked);
    await handleOpenAiUrlChange();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-80 gap-md">
        <details className="group collapse collapse-open" open>
          <summary className="collapse-title flex flex-row items-center justify-between p-0">
            <span>Main Settings</span>
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
            
          <fieldset className="fieldset collapse-content p-0 py-sm">
            <legend className="fieldset-legend hidden">Main Settings</legend>

            {showCustomProvider || <fieldset className="fieldset">
              <label htmlFor="openAIUrl" className="label">AI Provider</label>
              <ValidableElement invalidText="Choose one of the providers" isValid={isOpenAiUrlValid}>
                {({ className }) => (
                  <Select defaultValue={configuration?.openAiUrl} change={() => openAiUrlChange?.()} name="openAiUrl" id="openAIUrl" options={PROVIDERS} placeholder="Choose specific AI provider" disabled={disabled} required className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>}
            {showCustomProvider && <fieldset className="fieldset">
              <label htmlFor="openAiUrlCustom" className="label">
                Custom AI Provider
              </label>
              <ValidableElement invalidText="Invalid format, should be something like: https://api.openai.com/v1/" isValid={isOpenAiUrlValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.openAiUrl} onChange={() => openAiUrlChange?.()} name="openAiUrl" id="openAiUrlCustom" placeholder="https://api.openai.com/v1/" type="url" disabled={disabled} required className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>}

            <fieldset className="fieldset">
              <label htmlFor="openAiToken" className="label">
                AI Provider API Key
                <a href="https://docs.jabref.org/ai/ai-providers-and-api-keys#how-to-get-an-api-key" className="tooltip tooltip-right" data-tip="Click for more details" target="_blank"><CircleQuestionMark className="inline size-4" /></a>
              </label>

              <ValidableElement invalidText="Invalid token, should be something like: XQ.Ab8RN6OjJpZODvCFRY-pNyNam9bNLtsooaKKipEqWZ2bf5-DUw" isValid={isOpenAiTokenValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.openAiToken} name="openAiToken" id="openAiToken" placeholder="EX.Ed1RN7IjJpZODUcOXY-uNzNam2bHLtnereMKipBqWR5bf3-CBw" type="string" disabled={disabled} required className={`input ${className}`}  />
                )}
              </ValidableElement>
            </fieldset>

            {models.length > 0 &&
                <fieldset className="fieldset">
                  <label htmlFor="model" className="label">Model</label>
                  <ValidableElement invalidText="Did you choose correct available model?" isValid={isModelValid}>
                    {({ className }) => (
                      <Select defaultValue={configuration?.model} name="model" id="model" ref={modelRef} options={models.map(model => ({ label: model, value: model }))} placeholder="Choose model" disabled={disabled} required className={`input ${className}`} />
                    )}
                  </ValidableElement>
                </fieldset>
            }
          </fieldset>
        </details>

        <details className="group collapse">
          <summary className="collapse-title flex flex-row items-center justify-between p-0">
            <span>Advanced</span>
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <fieldset className="fieldset collapse-content p-0 py-sm">
            <legend className="fieldset-legend hidden">Advanced</legend>

            <fieldset className="fieldset flex flex-row items-center gap-sm">
              <input type="checkbox" defaultChecked={configuration?.isCustomAiProvider} id="customAiProvider" name="customAiProvider" className="toggle" onChange={handleIsCustomProviderChange} />
              <label htmlFor="customAiProvider" className="label">Custom AI Provider</label>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="maxTokens" className="label">
                Chat Max Length (Tokens)
                <a href="https://www.promptingguide.ai/introduction/settings" className="tooltip tooltip-right" data-tip="Click for more details" target="_blank"><CircleQuestionMark className="inline size-4" /></a>
              </label>

              <ValidableElement invalidText="Invalid Max Tokens" invalidTooltip="Recommended around 4096" isValid={isMaxTokensValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.maxTokens} name="maxTokens" id="maxTokens" placeholder="4096" type="number" disabled={disabled} required min="0" className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="temperature" className="label">
                Model Temperature
                <a href="https://www.promptingguide.ai/introduction/settings" className="tooltip tooltip-right" data-tip="Click for more details" target="_blank"><CircleQuestionMark className="inline size-4" /></a>
              </label>
              <ValidableElement invalidText="Invalid Temperature" invalidTooltip="Recommended between 0.6 and 1.0" isValid={isTemperatureValid}>
                {({ className }) => (
                  <input defaultValue={configuration?.temperature} name="temperature" id="temperature" placeholder="0.7" type="number" disabled={disabled} required min="0" max="1" step="0.1" className={`input ${className}`} />
                )}
              </ValidableElement>
            </fieldset>
          </fieldset>
        </details>

        <button type="submit" data-tip="Save" disabled={disabled} className="btn btn-primary w-full tooltip">
          <Save/> Save and test connection
        </button>
      </form>
    </>
  );
}

export default Configuration;
