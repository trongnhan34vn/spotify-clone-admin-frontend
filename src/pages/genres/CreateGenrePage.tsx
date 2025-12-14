import { useMemo, useState } from 'react';
import FormSteps from '../../components/FormSteps';
import CreateGenreResult from '../../features/genres/forms/CreateGenreResult';
import CreateGenreForm from '../../features/genres/forms/CreateGenreForm';
import PageLayout from '../../layouts/PageLayout';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';
import type { Step } from '../../types/ui/Step.type';
import Spinner from '../../components/Spinner';
import MultiFormProvider, {
  useMultiStepForm,
} from '../../context/MultiFormProvider';
import type { Genre } from '../../types/entities/genre.type';

const CreateGenrePage = () => {
  const [createdGenre, setCreatedGenre] = useState<Genre>();
  
  const steps = useMemo<Step[]>(
    () => [
      {
        step: 1,
        title: 'Create Genre',
        component: <CreateGenreForm setResult={setCreatedGenre} />,
      },
      {
        step: 2,
        title: 'Confirm',
        component: <CreateGenreResult result={createdGenre as Genre} />,
      },
    ],
    [createdGenre]
  );

  return (
    <MultiFormProvider steps={steps.map(s => s.component)}>
      <PageLayout
        title="Create Genre"
        path={getRoutePathByName(RouteName.CREATE_GENRE)}
      >
        <CreateGenreContent steps={steps} />
        <Spinner />
      </PageLayout>
    </MultiFormProvider>
  );
};

export default CreateGenrePage;

const CreateGenreContent = ({ steps }: { steps: Step[] }) => {
  const { current, currentStep } = useMultiStepForm();

  return (
    <>
      <FormSteps steps={steps} currentStep={current} />
      {currentStep}
    </>
  );
};
