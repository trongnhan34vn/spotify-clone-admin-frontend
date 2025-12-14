import { useFormContext } from 'react-hook-form';
import CheckboxInput from './CheckboxInput';

type IProps = {
  name: string;
  options: string[];
};
const CheckboxAllField = ({ name, options }: IProps) => {
  const { watch, setValue } = useFormContext();
  const values = watch(name) || [];

  const isAll = values.length === options?.length;

  return (
    <CheckboxInput
      label="Select All"
      name="selectAll"
      value="all"
      checked={isAll}
      onChange={() => setValue(name, isAll ? [] : options)}
    />
  );
};

export default CheckboxAllField;
