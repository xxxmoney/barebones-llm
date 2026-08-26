import { Trash } from 'lucide-react';

interface DeleteProps {
    click: () => Promise<void>;
    absolute?: boolean;
    className?: string;
}

function Delete({ click, absolute, className }: DeleteProps) {
  return (
    <>
      <div data-tip="Delete" className={`${absolute ? 'absolute' : ''} ${className} top-0 right-0 translate-x-2 -translate-y-2 cursor-pointer tooltip hover:animate-pulse`}>
        <Trash onClick={() => click()}   />
      </div>
    </>
  );
}

export default Delete;