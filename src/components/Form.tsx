import React, { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type FormProviderProps = {
  onSubmit: (data: any) => void;
  children: ReactNode;
  defaultValue: any;
};

const Form = ({ onSubmit, children, defaultValue }: FormProviderProps) => {
  const methods = useForm({ defaultValues: defaultValue });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
