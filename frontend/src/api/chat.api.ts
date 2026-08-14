import { api } from './index';
import type {AxiosResponse} from 'axios';
import type {ChatDto, ChatUpdateDto} from '../dtos/chat/chat.dto.ts';
import type {MessageDto} from '../dtos/chat/message.dto.ts';
import type {MessageUpdateDto} from '../dtos/chat/message.dto.ts';

const URL_PREFIX = '/api/chat';

export const ChatApi = {
  getChats(): Promise<AxiosResponse<ChatDto[]>> {
    return api.get(`${URL_PREFIX}/`);
  },
  insertChat(chat: ChatUpdateDto): Promise<AxiosResponse<ChatDto>> {
    return api.post(`${URL_PREFIX}/`, chat);
  },
  updateChat(chatId: string, chat: ChatUpdateDto): Promise<AxiosResponse<ChatDto>> {
    return api.put(`${URL_PREFIX}/${chatId}`, chat);
  },
  deleteChat(chatId: string): Promise<AxiosResponse<ChatDto>> {
    return api.delete(`${URL_PREFIX}/${chatId}`);
  },
  getMessages(chatId: string): Promise<AxiosResponse<MessageDto[]>> {
    return api.get(`${URL_PREFIX}/${chatId}/message`);
  },
  submitMessage(chatId: string, message: MessageUpdateDto): Promise<AxiosResponse<MessageDto[]>> {
    return api.post(`${URL_PREFIX}/${chatId}/message`, message);
  },
  updateMessage(chatId: string, messageId: string, message: MessageUpdateDto): Promise<AxiosResponse<MessageDto>> {
    return api.put(`${URL_PREFIX}/${chatId}/messages/${messageId}`, message);
  },
  deleteMessage(chatId: string, messageId: string): Promise<AxiosResponse<MessageDto>> {
    return api.delete(`${URL_PREFIX}/${chatId}/message/${messageId}`);
  }
};
