import Messages, {type Message} from './Messages.tsx';
import TextSubmit from './TextSubmit.tsx';
import Loading from './Loading.tsx';

interface ChatProps {
    name: string;
    messages: Message[];
    disabled?: boolean;
    loading?: boolean;
    submit: (text: string) => Promise<void>;
}

function Chat({ name, messages, disabled = false, loading = false, submit }: ChatProps) {
  return (
    <>
      <section className="mx-auto flex flex-col gap-lg max-w-[40rem]">
        <h2 className="text-heading text-center">{name}</h2>

        <Messages messages={messages} />

        {loading && <Loading />}

        <TextSubmit submit={submit} disabled={disabled} />
      </section>
    </>
  );
}

export default Chat;
