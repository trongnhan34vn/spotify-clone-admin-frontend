import Button from '../../../components/Button';
import Form from '../../../components/Form';
import SelectField from '../../../components/SelectField';
import TextField from '../../../components/TextField';

import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX } from '../../../constants/regex.constant';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';
import type { CreateAdminReq, Group } from '../../../types/entities/user.type';

type IProps = {
  defaultValue: CreateAdminReq;
  onCreate: (req: CreateAdminReq) => void;
  groups: Group[];
};
const CreateAdminForm = ({ defaultValue, onCreate, groups }: IProps) => {
  const navigate = useNavigate()
  const adminGroupOptions = groups.map(group => ({
    value: group.name,
    label: group.name,
  }));

  return (
    <Form
      className="w-full float-right"
      defaultValues={defaultValue}
      onSubmit={onCreate}
    >
      <TextField
        id="username"
        required
        label="Username"
        placeholder="Enter username..."
        name="username"
      />

      <TextField
        id="email"
        required
        pattern={EMAIL_REGEX}
        label="Email"
        placeholder="Enter email..."
        name="email"
      />

      <TextField
        id="firstName"
        required
        label="First Name"
        placeholder="Enter first name..."
        name="firstName"
      />

      <TextField
        id="lastName"
        required
        label="Last Name"
        placeholder="Enter last name..."
        name="lastName"
      />

      <SelectField
        id="groups"
        name="groups"
        label="Groups"
        required
        multiple
        placeholder="Select groups..."
        options={adminGroupOptions}
      />
      <div className="flex gap-4 mt-4 float-right items-center">
        <Button
          className="!w-fit !bg-transparent !text-white hover:!scale-100 hover:!text-red-500"
          type="button"
          onClick={() => navigate(getRoutePathByName(RouteName.ADMIN))}
          label="Cancel"
        />
        <Button
          label={'Submit'}
          type="submit"
          className="!w-fit !px-4 !rounded hover:!scale-100"
        />
      </div>
    </Form>
  );
};

export default CreateAdminForm;
