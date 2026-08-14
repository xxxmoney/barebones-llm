import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {devtools} from 'zustand/middleware';
import type {ChatDto, ChatUpdateDto} from '../dtos/chat/chat.dto.ts';
import {ChatApi} from '../api/chat.api.ts';
import type {MessageUpdateDto} from '../dtos/chat/message.dto.ts';

interface ChatStore {
    loading: boolean;
    chats: ChatDto[];

    getChats: () => Promise<void>;
    insertChat: (chat: ChatUpdateDto) => Promise<ChatDto>;
    updateChat: (chatId: string, chat: ChatUpdateDto) => Promise<ChatDto>;
    submitMessage: (chatId: string, message: MessageUpdateDto) => Promise<void>;
    updateMessage: (chatId: string, message: MessageUpdateDto) => Promise<void>;
}

export const useChatStore = create(devtools(immer<ChatStore>((set) => ({
  loading: false,
  chats: [],

  getChats: async () => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.getChats();
      if (response.status !== 200) {
        throw new Error(`Failed to fetch chats: '${response.statusText}'`);
      }

      set(state => {
        state.chats = response.data;
      });

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  insertChat: async (chat: ChatUpdateDto) => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.insertChat(chat);
      if (response.status !== 200) {
        throw new Error(`Failed to insert chat: '${response.statusText}'`);
      }

      set(state => {
        state.chats.push(response.data);
      });

      return response.data;

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  updateChat: async (chatId: string, chat: ChatUpdateDto) => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.updateChat(chatId, chat);
      if (response.status !== 200) {
        throw new Error(`Failed to update chat: '${response.statusText}'`);
      }

      set(state => {
        const index = state.chats.findIndex(chat => chat.id === chatId);
        if (index === -1) {
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        state.chats[index] = response.data;
      });

      return response.data;

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  getMessages: async (chatId: string) => {
    if (!chatId) {
      throw new Error('Invalid chat id');
    }

    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.getMessages(chatId);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch messages: '${response.statusText}'`);
      }

      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id ${chatId} not found`);
        }

        chat.messages = response.data;
      });

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  submitMessage: async (chatId: string, message: MessageUpdateDto) => {
    if (!chatId) {
      throw new Error('Invalid chat id');
    }

    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.submitMessage(chatId, message);
      if (response.status !== 200) {
        throw new Error(`Failed to submit message: '${response.statusText}'`);
      }

      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id ${chatId} not found`);
        }

        chat.messages.push(...response.data);
      });
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  updateMessage: async (chatId: string, message: MessageUpdateDto) => {
    try {
      set(state => {
        state.loading = false;
      });

      const response = await ChatApi.submitMessage(chatId, message);
      if (response.status !== 200) {
        throw new Error(`Failed to submit message: '${response.statusText}'`);
      }
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  }
}))));
