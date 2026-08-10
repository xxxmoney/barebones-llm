import type {MessageDto} from './message.dto.ts';

export interface ChatDto {
    id: string;
    name: string;
    messages: MessageDto[];
}
