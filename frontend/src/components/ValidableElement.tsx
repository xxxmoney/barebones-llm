import type { ReactNode } from 'react';

interface ValidableProps {
  children: (data: { className: string }) => ReactNode;

  invalidText: string,
  isValid: boolean;
}

function ValidableElement({ children, invalidText, isValid }: ValidableProps) {
  return (
    <>
      {children({ className: isValid ? 'validator' : 'invalid-input' })}
      <p className={`invalid-text ${isValid && 'hidden validator-hint'}`}>{invalidText}</p>
    </>
  );
}

export default ValidableElement;
