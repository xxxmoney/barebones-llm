import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {devtools} from 'zustand/middleware';
import type {ChatDto} from '../dtos/chat/chat.dto.ts';
import type {MessageDto} from '../dtos/chat/message.dto.ts';
import {DateTime} from 'ts-luxon';

interface ChatStore {
    loading: boolean;
    chats: ChatDto[]

    getChats: () => Promise<void>
    submitMessage: (chatId: string, message: string) => Promise<void>
}

export const useChatStore = create(devtools(immer<ChatStore>((set) => ({
  loading: false,
  chats: [],

  getChats: async () => {
    try {
      set(state => {
        state.loading = true;
      });

      // TODO: fetch

      // TODO: remove later, mock
      const chats: ChatDto[] = [
        {
          id: '47cc4c62-942c-4c1e-aee6-462c1012c22e',
          name: 'Chat 1',
          messages: [
            {
              id: '2c033242-e45d-4cd6-8fc1-587726b6b22c',
              role: 'user',
              text: 'Hello, how are you?',
              date: DateTime.now().minus({ day: 2 }),
            },
            {
              id: '3787e3ee-1c9c-47ce-8968-c2cf08b954b7',
              role: 'assistant',
              text: 'As a Large Language Model, I do not have feelings. Maybe. Possible. Surely. Sorry. >]',
              date: DateTime.now().minus({ day: 1 }),
            },
          ],
        }
      ];

      set(state => {
        state.chats = chats;
      });

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },
  submitMessage: async (chatId: string, message: string) => {
    if (!chatId) {
      throw new Error('Invalid chat id');
    }

    try {
      set(state => {
        state.loading = true;
      });

      // TODO: fetch

      // TODO: remove later, mock
      const newMessages: MessageDto[] = [
        {
          id: 'dcfdcef7-1b54-488a-83b6-07fdbde7841c',
          role: 'user',
          text: message,
          date: DateTime.now(),
        },
        {
          id: 'be01ba4c-b4f8-4b5b-b3f3-35550455af9a',
          role: 'assistant',
          text: 'There will be a proper response from LLM here. >]',
          date: DateTime.now(),
        },
      ];

      set(state => {
        const currentChat = state.chats.find(chat => chat.id === chatId);
        if (!currentChat) {
          throw new Error(`Chat with id ${chatId} not found`);
        }

        currentChat.messages.push(...newMessages);
      });
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },
}))));
