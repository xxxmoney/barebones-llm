import { Trash } from 'lucide-react';

interface DeleteProps {
    click: () => Promise<void>;
    absolute?: boolean;
}

function Delete({ click, absolute }: DeleteProps) {
  return (
    <>
      <Trash onClick={() => click()} className={`${absolute ? 'absolute' : ''} top-0 right-0 translate-x-2 -translate-y-2 cursor-pointer hover:animate-pulse`} />
    </>
  );
}

export default Delete;