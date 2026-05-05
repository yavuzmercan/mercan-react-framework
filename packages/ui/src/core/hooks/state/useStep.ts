import { useCallback, useState } from 'react';

export interface UseStepReturn {
  step: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
  goTo: (n: number) => void;
  reset: () => void;
}

/** Step navigation helper for wizards / multi-step flows. */
export const useStep = (max: number, initial = 0): UseStepReturn => {
  const [step, setStep] = useState(initial);
  const next = useCallback(() => setStep((s) => Math.min(max - 1, s + 1)), [max]);
  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const goTo = useCallback((n: number) => setStep(Math.max(0, Math.min(max - 1, n))), [max]);
  const reset = useCallback(() => setStep(initial), [initial]);
  return {
    step,
    isFirst: step === 0,
    isLast: step === max - 1,
    next,
    prev,
    goTo,
    reset,
  };
};
