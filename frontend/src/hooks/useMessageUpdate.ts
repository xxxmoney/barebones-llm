import {useChatStore} from '../stores/chat.store.ts';
import {useCallback} from 'react';
import toast from 'react-hot-toast';

export function useMessageUpdate(id?: string) {
  const submitMessage = useChatStore(state => state.submitMessage);
  const handleSubmitMessage = useCallback(
    async (text: string) => {
      await submitMessage(id!, { text: text });
      toast.success('Message submitted successfully');
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
