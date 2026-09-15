import type { ReactNode } from 'react';

interface ValidableProps {
  children: (data: { className: string }) => ReactNode;

  invalidText: string,
  invalidTooltip?: string;
  isValid: boolean;
}

function ValidableElement({ children, invalidText, invalidTooltip, isValid }: ValidableProps) {
  return (
    <>
      {children({ className: isValid ? 'validator' : 'invalid-input' })}
      <p data-tip={invalidTooltip} className={`invalid-text tooltip animate-pulse ${isValid && 'hidden validator-hint'}`}>{invalidText}</p>
    </>
  );
}

export default ValidableElement;
