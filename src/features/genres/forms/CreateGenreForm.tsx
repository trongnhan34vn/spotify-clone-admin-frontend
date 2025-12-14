import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../components/Button';
import ColorField from '../../../components/ColorField';
import Form from '../../../components/Form';
import ImageField from '../../../components/ImageField';
import { spinner } from '../../../components/Spinner';
import TextField from '../../../components/TextField';
import { useMultiStepForm } from '../../../context/MultiFormProvider';
import { useHandle } from '../../../hooks/useHandle';
import { createGenreSelector } from '../../../redux/selector/selector';
import { resetCreate } from '../../../redux/slices/genre.slice';
import { createGenreThunk } from '../../../thunks/genre.thunk';
import EditorField from '../../../components/EditorField';

interface IProps {
  setResult: any;
}
const CreateGenreForm = ({ setResult }: IProps) => {
  const defaultValues = {
    name: '',
    image: null,
    description: '',
    color: '',
  };

  const { execute, loading, data, error } = useHandle({
    thunk: createGenreThunk,
    options: {
      selector: createGenreSelector,
      resetFn: resetCreate,
    },
  });

  const { nextStep } = useMultiStepForm();

  useEffect(() => {
    if (loading) {
      spinner.show();
    } else {
      spinner.hide();
    }

    if (data) {
      toast.success('Create Genre Success');
      setResult(data);
      nextStep();
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }
  }, [loading, data, error]);

  const handleSubmit = (data: any) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('color', data.color);
    formData.append('image', data.image);
    formData.append('description', data.description);
    execute(formData);
  };

  return (
    <Form defaultValues={defaultValues} onSubmit={handleSubmit}>
      <TextField
        placeholder="Enter genre's name..."
        id="name"
        label="Name"
        name="name"
        required
      />

      <EditorField
        name="description"
        id="description"
        label="Description"
        required
      />

      <ColorField
        containerClassName="mb-4"
        label="Color"
        id="color"
        name="color"
      />
      <ImageField
        label="Image"
        containerClassName="w-1/2"
        name="image"
        id="image"
      />

      <div className="float-right">
        <Button
          className="!inline-block !px-8 !w-fit !bg-transparent !text-white hover:text-red-500"
          label={'Cancel'}
        />
        <Button
          type="submit"
          className="!inline-block !w-fit !px-8 !rounded"
          label={'Save'}
        />
      </div>
    </Form>
  );
};

export default CreateGenreForm;
