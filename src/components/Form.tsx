import React, { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type FormProviderProps = {
  onSubmit: (data: any) => void;
  children: ReactNode;
  defaultValues: any;
  className?: string;
  ref?: any
};

const Form = ({
  onSubmit,
  children,
  defaultValues,
  className,
  ref
}: FormProviderProps) => {
  const methods = useForm({ defaultValues: defaultValues });
  return (
    <div className={`${className}`}>
      <FormProvider  {...methods}>
        <form ref={ref} onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default Form;
