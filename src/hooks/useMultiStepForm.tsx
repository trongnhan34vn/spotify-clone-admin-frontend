import { useCallback, useState, type ReactNode } from "react";

export const useMultiStepForm = (stepComponents: ReactNode[]) => {
  const [current, setCurrent] = useState(0);
  const FIRST_STEP_IDX = 0;
  const NEXT_STEP_DISTANCE = 1;
  const LAST_STEP_IDX = stepComponents.length - 1;

  const nextStep = useCallback(() => {
    setCurrent((prev) => prev < LAST_STEP_IDX ? prev + NEXT_STEP_DISTANCE : prev);
  }, [stepComponents])

  const prevStep = useCallback(() => {

    setCurrent(prev => prev > FIRST_STEP_IDX ? prev - NEXT_STEP_DISTANCE : prev);

  }, [stepComponents])

  return {
    stepComponents,
    currentStep: stepComponents[current],
    current: current,
    isFirstStep: current == FIRST_STEP_IDX,
    isLastStep: current == LAST_STEP_IDX,
    nextStep,
    prevStep
  }
}