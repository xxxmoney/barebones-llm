import {useChatStore} from '../stores/chat.store.ts';
import {useCallback} from 'react';
import toast from 'react-hot-toast';

export function useMessageUpdate(id?: string) {
  const submitMessage = useChatStore(state => state.submitMessage);
  const handleSubmitMessage = useCallback(
    async (text: string) => {
      const submitMessagePromise = submitMessage(id!, { text: text });
      await toast.promise(submitMessagePromise, {
        loading: 'Message submitted...',
        success: 'Got response',
        error: 'Failed to submit message'
      });
      console.log('Finished');
    },
    [id, submitMessage]
  );
  const updateMessage = useChatStore(state => state.updateMessage);
  const handleUpdateMessage = useCallback(
    async (messageId: string, text: string) => {
      await updateMessage(id!, messageId, { text: text });
      toast.success('Message updated successfully');
    },
    [id, updateMessage]
  );
  const deleteMessage = useChatStore(state => state.deleteMessage);
  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      await deleteMessage(id!, messageId);
      toast.success('Message deleted successfully');
    },
    [id, deleteMessage]
  );

  return {handleSubmitMessage, handleUpdateMessage, handleDeleteMessage};
}
