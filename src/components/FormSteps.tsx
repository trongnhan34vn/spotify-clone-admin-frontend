import React from 'react';
import type { Step } from '../types/ui/Step.type';
import FormStep from './FormStep';

interface IProps {
  steps: Step[];
  currentStep: number;
}
const FormSteps = ({ steps, currentStep }: IProps) => {
  return (
    <div className="flex items-center w-full gap-5 bg-[var(--color-secondary-background)] sticky top-25 z-20">
      {steps.map((s, index) => (
        <div key={index} className="flex gap-5 items-center mb-5">
          <FormStep
            active={currentStep == index}
            step={s.step}
            title={s.title}
            completed={currentStep > index}
          />
          <div
            className={`${steps.length - 1 != index ? '' : 'hidden'} ${index < currentStep ? 'bg-[var(--color-primary)]' : 'bg-[#777]'} w-10 h-0.5`}
          />
        </div>
      ))}
    </div>
  );
};

export default FormSteps;
