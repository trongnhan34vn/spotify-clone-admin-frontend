import { forwardRef, type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type FormProviderProps = {
  onSubmit: (data: any) => void;
  children: ReactNode;
  defaultValues: any;
  className?: string;
};

const Form = forwardRef<HTMLFormElement, FormProviderProps>(
  ({ onSubmit, children, defaultValues, className }, ref) => {
    const methods = useForm({ defaultValues });

    return (
      <div className={className}>
        <FormProvider {...methods}>
          <form
            ref={ref}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {children}
          </form>
        </FormProvider>
      </div>
    );
  }
);

Form.displayName = 'Form';

export default Form;
