import {useChatStore} from '../stores/chat.store.ts';
import {useCallback} from 'react';
import {useNavigate} from 'react-router';

export function useChatUpdate(id: string) {
  const navigate = useNavigate();

  const updateChat = useChatStore(state => state.updateChat);
  const handleUpdateChat = useCallback(
    async (name: string) => {
      await updateChat(id!, { name: name });
    },
    [id, updateChat]
  );
  const deleteChat = useChatStore(state => state.deleteChat);
  const handleDeleteChat = useCallback(
    async () => {
      await deleteChat(id!);
      await navigate('/chats');
    },
    [id, deleteChat, navigate]
  );

  return {handleUpdateChat, handleDeleteChat};
}
