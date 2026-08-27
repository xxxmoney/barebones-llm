import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { ChatDto, ChatUpdateDto } from '../dtos/chat/chat.dto.ts';
import { ChatApi } from '../api/chat.api.ts';
import type { MessageDto, MessageUpdateDto } from '../dtos/chat/message.dto.ts';

interface ChatStore {
    hasLoaded: boolean;
    loading: boolean;
    chats: ChatDto[];
    
    getChats: () => Promise<void>;
    insertChat: (chatUpdate: ChatUpdateDto) => Promise<ChatDto>;
    updateChat: (chatId: string, chatUpdate: ChatUpdateDto) => Promise<ChatDto | undefined>;
    deleteChat: (chatId: string) => Promise<void>;
    getMessages: (chatId: string) => Promise<void>;
    submitMessage: (chatId: string, messageUpdate: MessageUpdateDto) => Promise<MessageDto[]>;
    updateMessage: (chatId: string, messageId: string, messageUpdate: MessageUpdateDto) => Promise<MessageDto | undefined>;
    deleteMessage: (chatId: string, messageId: string) => Promise<void>;
}

export const useChatStore = create(devtools(immer<ChatStore>((set, get) => ({
  hasLoaded: false,
  loading: true,
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
        state.hasLoaded = true;
      });

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  insertChat: async (chatUpdate: ChatUpdateDto) => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.insertChat(chatUpdate);
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

  updateChat: async (chatId: string, chatUpdate: ChatUpdateDto) => {
    try {
      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        chat.name = chatUpdate.name;
        
        state.loading = true;
      });

      const response = await ChatApi.updateChat(chatId, chatUpdate);
      if (response.status !== 200) {
        throw new Error(`Failed to update chat: '${response.statusText}'`);
      }

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  deleteChat: async (chatId: string) => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.deleteChat(chatId);
      if (response.status !== 200) {
        throw new Error(`Failed to delete chat: '${response.statusText}'`);
      }

      set(state => {
        state.chats = state.chats.filter(chat => chat.id !== chatId);
      });

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

    const state = get();

    if(!state.hasLoaded) {
      await state.getChats();
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
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        chat.messages = response.data;
      });

    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  submitMessage: async (chatId: string, messageUpdate: MessageUpdateDto) => {
    if (!chatId) {
      throw new Error('Invalid chat id');
    }

    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.submitMessage(chatId, messageUpdate);
      if (response.status !== 200) {
        throw new Error(`Failed to submit message: '${response.statusText}'`);
      }

      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        chat.messages.push(...response.data);
      });

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  updateMessage: async (chatId: string, messageId: string, messageUpdate: MessageUpdateDto) => {
    try {
      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        const message = chat.messages.find(message => message.id === messageId);
        if (!message) {
          throw new Error(`Message with id '${messageId}' not found`);
        }

        message.text = messageUpdate.text;

        state.loading = true;
      });

      const response = await ChatApi.updateMessage(chatId, messageId, messageUpdate);
      if (response.status !== 200) {
        throw new Error(`Failed to submit message: '${response.statusText}'`);
      }

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  deleteMessage: async (chatId: string, messageId: string) => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ChatApi.deleteMessage(chatId, messageId);
      if (response.status !== 200) {
        throw new Error(`Failed to delete message: '${response.statusText}'`);
      }

      set(state => {
        const chat = state.chats.find(chat => chat.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id '${chatId}' not found`);
        }

        chat.messages = chat.messages.filter(message => message.id !== messageId);
      });
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  }
}))));
