import {useChatStore} from '../stores/chat.store.ts';
import {useCallback} from 'react';

export function useMessageUpdate(id?: string) {
  const submitMessage = useChatStore(state => state.submitMessage);
  const handleSubmitMessage = useCallback(
    async (text: string) => {
      await submitMessage(id!, { text: text });
    },
    [id, submitMessage]
  );
  const updateMessage = useChatStore(state => state.updateMessage);
  const handleUpdateMessage = useCallback(
    async (messageId: string, text: string) => {
      await updateMessage(id!, messageId, { text: text });
    },
    [id, updateMessage]
  );
  const deleteMessage = useChatStore(state => state.deleteMessage);
  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      await deleteMessage(id!, messageId);
    },
    [id, deleteMessage]
  );

  return {handleSubmitMessage, handleUpdateMessage, handleDeleteMessage};
}
