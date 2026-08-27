import type { ValidationDetail } from '../ValidationDetailDto.ts';

export interface ConfigurationDto {
    isConfigured: boolean;
    openAiUrl?: string;
    openAiToken?: string;
    model?: string;
    maxTokens: number;
    temperature: number;

    detail?: ValidationDetail;
}

export interface ConfigurationUpdateDto {
    openAiUrl: string;
    openAiToken: string;
    model?: string;
    maxTokens: number;
    temperature: number;
}
