import { useMemo, useState } from 'react';
import FormSteps from '../../components/FormSteps';
import Spinner from '../../components/Spinner';
import MultiFormProvider, {
  useMultiStepForm,
} from '../../context/MultiFormProvider';
import CreateAdminForm from '../../features/users/forms/CreateAdminForm';
import CreateAdminResultForm from '../../features/users/forms/CreateAdminResultForm';
import PageLayout from '../../layouts/PageLayout';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';
import type { Step } from '../../types/ui/Step.type';

const CreateAdminPage = () => {
  const [createdAdmin, setCreatedAdmin] = useState();

  const steps: Step[] = useMemo(
    () => [
      {
        step: 1,
        title: 'Create Admin',
        component: <CreateAdminForm setResult={setCreatedAdmin} />,
      },
      {
        step: 2,
        title: 'Comfirm',
        component: <CreateAdminResultForm result={createdAdmin} />,
      },
    ],
    [createdAdmin]
  );

  

  return (
    <MultiFormProvider steps={steps.map(s => s.component)}>
      <PageLayout
        title="Create Admin"
        path={getRoutePathByName(RouteName.CREATE_ADMIN)}
      >
        <CreateAdminContent steps={steps} />
        <Spinner />
      </PageLayout>
    </MultiFormProvider>
  );
};

export default CreateAdminPage;

const CreateAdminContent = ({ steps }: { steps: Step[] }) => {
  const { current, currentStep } = useMultiStepForm();
  return (
    <>
      <FormSteps steps={steps} currentStep={current} />
      {currentStep}
    </>
  );
};
