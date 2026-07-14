import type {MessageDto} from '../dtos/chat/message.dto.ts';

interface Props {
  messages: MessageDto[];
}

function Chat({ messages }: Props) {

  return (
    <>
      <div className="w-full mx-auto max-w-[40rem]">
        {messages.map(message =>
          <div className={`chat chat-${message.position}`}>
            <div className="chat-bubble">
              {message.text}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
