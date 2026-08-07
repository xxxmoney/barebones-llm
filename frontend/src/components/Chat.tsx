import Messages, {type Message} from './Messages.tsx';
import TextSubmit from './TextSubmit.tsx';

interface ChatProps {
    name: string;
    messages: Message[];
    submit: (message: string) => Promise<void>;
}

function Chat({ name, messages, submit }: ChatProps) {
  return (
    <>
      <section className="mx-auto max-w-[40rem]">
        <h2>{name}</h2>

        <Messages messages={messages} />
        <TextSubmit submit={submit} />
      </section>
    </>
  );
}

export default Chat;
