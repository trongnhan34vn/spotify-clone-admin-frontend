import Button from '../../../components/Button';
import Form from '../../../components/Form';
import SelectField from '../../../components/SelectField';
import TextField from '../../../components/TextField';

import { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { spinner } from '../../../components/Spinner';
import { EMAIL_REGEX } from '../../../constants/regex.constant';
import { useMultiStepForm } from '../../../context/MultiFormProvider';
import { useFetch } from '../../../hooks/useFetch';
import { useHandle } from '../../../hooks/useHandle';
import {
  createUserSelector,
  listGroupSelector,
} from '../../../redux/selector/selector';
import { reset } from '../../../redux/slices/group.slice';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';
import { listAdminGroupsThunk } from '../../../thunks/group.thunk';
import type { Query } from '../../../types/entities/query.type';
import type { Group } from '../../../types/entities/user.type';
import { resetCreate } from '../../../redux/slices/user.slice';
import { createAdminThunk } from '../../../thunks/user.thunk';
interface IProps {
  setResult: any;
}
const CreateAdminForm = ({ setResult }: IProps) => {
  const navigate = useNavigate();
  const query: Query = {
    page: 1,
    size: 8,
    sortBy: 'createdAt',
    sortType: 'desc',
  };

  const {
    data: groups,
    loading: groupLoading,
    error: groupError,
  } = useFetch<Group[]>({
    query,
    thunk: listAdminGroupsThunk,
    options: {
      selector: listGroupSelector,
      resetFn: reset,
    },
  });

  useEffect(() => {
    if (groupLoading) {
      spinner.show();
    } else {
      spinner.hide();
    }
  }, [groupLoading]);

  const adminGroupOptions =
    groups?.map(group => ({
      value: group.name,
      label: group.name,
    })) ?? [];

  const defaultValue = useMemo(
    () => ({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      groups: [],
    }),
    []
  );

  const {
    execute,
    data: createdUserData,
    loading: isCreatingUser,
    error: createdUserError,
  } = useHandle({
    thunk: createAdminThunk,
    options: { selector: createUserSelector, resetFn: resetCreate },
  });

  const { nextStep } = useMultiStepForm();

  const handleSubmit = useCallback(
    (data: any) => {
      execute(data);
    },
    [execute]
  );

  useEffect(() => {
    if (isCreatingUser) {
      spinner.show();
    } else {
      spinner.hide();
    }

    if (createdUserData) {
      toast.success('Admin created');
      nextStep();
      setResult(createdUserData);
      return;
    }

    if (createdUserError) {
      toast.error(createdUserError);
      return;
    }
  }, [createdUserData, isCreatingUser, createdUserError]);

  return (
    <Form
      className="w-full float-right"
      defaultValues={defaultValue}
      onSubmit={handleSubmit}
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
