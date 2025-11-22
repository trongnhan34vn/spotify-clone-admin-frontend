import React, { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMultiStepForm } from '../hooks/useMultiStepForm';

type IProps<T> = {
  defaultValues: T;
  onSubmit: (data: T) => void;
  steps: ReactNode[];
};
const MultiStepForm = <T,>({ defaultValues, onSubmit, steps }: IProps<T>) => {
  const methods = useForm({ defaultValues: defaultValues as any });
  const { watch, getValues } = methods;

  const { currentStep, next, prev, isFirstStep, isLastStep } = useMultiStepForm(
    [steps]
  );
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {currentStep}

        {/* <div style={{ marginTop: 24 }}>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          {!isLastStep && (
            <button type="button" onClick={next}>
              Next
            </button>
          )}

          {isLastStep && <button type="submit">Submit</button>}
        </div> */}
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
