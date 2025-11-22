import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner, { spinner } from '../../components/Spinner';
import { groupSelector, userSelector } from '../../redux/selector/selector';
import { reset } from '../../redux/slices/auth.slice';
import { resetCreate } from '../../redux/slices/user.slice';
import { type AppDispatch } from '../../redux/store';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';
import { listAdminGroupsThunk } from '../../thunks/group.thunk';
import { createAdminThunk } from '../../features/users/thunks/user.thunk';
import PageLayout from '../../layouts/PageLayout';
import Button from '../../components/Button';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import type { Step } from '../../types/ui/Step.type';
import FormSteps from '../../components/FormSteps';
import type { Group, User } from '../../types/entities/user.type';
import CreateAdminForm from '../../features/users/forms/CreateAdminForm';

const CreateAdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const [adminGroups, setAdminGroups] = useState<Group[]>([]);

  useEffect(() => {
    spinner.show();
    dispatch(listAdminGroupsThunk());
  }, []);

  const listAdminGroupRes = useSelector(groupSelector);

  useEffect(() => {
    if (!listAdminGroupRes.data) return;
    setAdminGroups(listAdminGroupRes.data as Group[]);
    spinner.hide();
    dispatch(reset());
  }, [listAdminGroupRes]);

  const createAdminRes = useSelector(userSelector).create;
  const [createdAdmin, setCreatedAdmin] = useState<User | null>(null);

  const handleCreateAdmin = useCallback((data: any) => {
    spinner.show();
    dispatch(createAdminThunk(data));
  }, []);

  const AdminInfo = useMemo(
    () => (
      <div className="w-full">
        <table className="w-1/3 mb-5">
          <tbody>
            <tr>
              <td className="p-1">Username:</td>
              <td>{createdAdmin?.username}</td>
            </tr>
            <tr>
              <td className="p-1">Email:</td>
              <td>{createdAdmin?.email}</td>
            </tr>
            <tr>
              <td className="p-1">First Name:</td>
              <td>{createdAdmin?.firstName}</td>
            </tr>
            <tr>
              <td className="p-1">Last Name:</td>
              <td>{createdAdmin?.lastName}</td>
            </tr>
            <tr>
              <td className="p-1">Password:</td>
              <td>{createdAdmin?.password}</td>
            </tr>
            <tr>
              <td className="p-1 py-4">Credentials File:</td>
              <td>
                <Button
                  onClick={() => {
                    window.location.href = createdAdmin?.credentialsUrl ?? '';
                  }}
                  className="!w-fit !px-3 !py-1 !rounded"
                  label="Download Credentials"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button
            onClick={() => navigate(getRoutePathByName(RouteName.ADMIN))}
            className="!w-fit !border-[var(--color-primary)] !border-[1px] !rounded hover:!scale-100 hover:!bg-[var(--color-primary)] hover:!text-black group !px-2 !float-right hover: text-green-500 !bg-transparent"
            label={
              <div className="flex items-center gap-2">
                <IoIosCheckmarkCircleOutline
                  size={24}
                  className="text-green-500 group-hover:text-black transition-all duration-150 ease-in"
                />
                <p>Done</p>
              </div>
            }
          />
        </div>
      </div>
    ),
    [createdAdmin]
  );

  const steps: Step[] = useMemo(
    () => [
      {
        step: 1,
        title: 'Create Admin',
        component: (
          <CreateAdminForm
            defaultValue={defaultValue}
            onCreate={handleCreateAdmin}
            groups={adminGroups}
          />
        ),
      },
      {
        step: 2,
        title: 'Comfirm',
        component: AdminInfo,
      },
    ],
    [adminGroups, createdAdmin]
  );

  const { currentStep, nextStep, current } = useMultiStepForm(
    steps.map(s => s.component)
  );

  useEffect(() => {
    const { error, data, loading } = createAdminRes;

    if (error) {
      spinner.hide();
      toast.error(error);
      dispatch(resetCreate());
      return;
    }
    // if success => re-list
    if (!loading && data) {
      spinner.hide();
      setCreatedAdmin(data as User);
      toast.success('Admin Created');
      nextStep();
      dispatch(resetCreate());
      return;
    }
  }, [createAdminRes]);

  return (
    <PageLayout
      title="Create Admin"
      path={getRoutePathByName(RouteName.CREATE_ADMIN)}
    >
      <FormSteps steps={steps} currentStep={current} />

      {currentStep}
      <Spinner />
    </PageLayout>
  );
};

export default CreateAdminPage;
