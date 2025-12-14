import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type MultiStepFormContextType = {
  current: number;
  currentStep: ReactNode;
  nextStep: () => void;
  prevStep: () => void;
  goTo: (index: number) => void;
  steps: ReactNode[];
};
const MultiStepFormContext = createContext<MultiStepFormContextType | null>(
  null
);

export const useMultiStepForm = () => {
  const ctx = useContext(MultiStepFormContext);
  if (!ctx)
    throw new Error(
      'useMultiStepForm must be used inside MultiStepFormProvider'
    );
  return ctx;
};
interface IProps {
  children: ReactNode;
  steps: ReactNode[];
}
const MultiFormProvider = ({ children, steps }: IProps) => {
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrent(prev => Math.max(prev - 1, 0));
  };

  const goTo = (index: number) => {
    setCurrent(index);
  };
  return (
    <MultiStepFormContext.Provider
      value={{
        current,
        currentStep: steps[current],
        nextStep,
        prevStep,
        goTo,
        steps,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

export default MultiFormProvider;
