import {useChatStore} from '../stores/chat.store.ts';
import {useCallback} from 'react';
import {useNavigate} from 'react-router';
import toast from 'react-hot-toast';

export function useChatUpdate(id?: string) {
  const navigate = useNavigate();

  const updateChat = useChatStore(state => state.updateChat);
  const handleUpdateChat = useCallback(
    async (name: string) => {
      const updateChatPromise = updateChat(id!, { name: name });
      await toast.promise(updateChatPromise, {
        loading: 'Updating chat...',
        success: 'Chat updated!',
        error: 'Failed to update chat'
      });
    },
    [id, updateChat]
  );
  const deleteChat = useChatStore(state => state.deleteChat);
  const handleDeleteChat = useCallback(
    async () => {
      const deleteChatPromise = deleteChat(id!);
      await toast.promise(async () => {
        await deleteChatPromise;
        await navigate('/chats');
      }, {
        loading: 'Deleting chat...',
        success: 'Chat deleted!',
        error: 'Failed to delete chat'
      });
    },
    [id, deleteChat, navigate]
  );

  return {handleUpdateChat, handleDeleteChat};
}
