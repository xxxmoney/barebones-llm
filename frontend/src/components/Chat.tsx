import Messages, {type Message} from './Messages.tsx';
import TextSubmit from './TextSubmit.tsx';

interface ChatProps {
    name: string;
    messages: Message[];
    submit: (text: string) => Promise<void>;
}

function Chat({ name, messages, submit }: ChatProps) {
  return (
    <>
      <section className="mx-auto flex flex-col gap-lg max-w-[40rem]">
        <h2 className="text-heading text-center">{name}</h2>

        <Messages messages={messages} />
        <TextSubmit submit={submit} />
      </section>
    </>
  );
}

export default Chat;
