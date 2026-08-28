
export interface ConfigurationDto {
    isValid: boolean;
    openAiUrl?: string;
    openAiToken?: string;
    model?: string;
    maxTokens: number;
    temperature: number;
}

export interface ConfigurationUpdateDto {
    openAiUrl: string;
    openAiToken: string;
    model?: string;
    maxTokens: number;
    temperature: number;
}
