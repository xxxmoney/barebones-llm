import { useChatStore } from '../stores/chat.store.ts';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useMessageUpdate(id?: string) {
  const submitMessage = useChatStore(state => state.submitMessage);
  const handleSubmitMessage = useCallback(
    async (text: string) => {
      const submitMessagePromise = submitMessage(id!, { text: text });
      await toast.promise(submitMessagePromise, {
        loading: 'Submitting message...',
        success: 'Got response!',
        error: 'Failed to submit message'
      });
    },
    [id, submitMessage]
  );
  const updateMessage = useChatStore(state => state.updateMessage);
  const handleUpdateMessage = useCallback(
    async (messageId: string, text: string) => {
      const updateMessagePromise = updateMessage(id!, messageId, { text: text });
      await toast.promise(updateMessagePromise, {
        loading: 'Updating message...',
        success: 'Message updated!',
        error: 'Failed to update message'
      });
    },
    [id, updateMessage]
  );
  const deleteMessage = useChatStore(state => state.deleteMessage);
  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      const deleteMessagePromise = deleteMessage(id!, messageId);
      await toast.promise(deleteMessagePromise, {
        loading: 'Deleting message...',
        success: 'Message deleted!',
        error: 'Failed to delete message'
      });
    },
    [id, deleteMessage]
  );

  return { handleSubmitMessage, handleUpdateMessage, handleDeleteMessage };
}
