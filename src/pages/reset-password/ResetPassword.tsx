import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { PASSWORD_REGEX } from '../../constants/regex.constant';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../redux/store';
import { changePasswordThunk } from '../../thunks/auth.thunk';
import Spinner, { spinner } from '../../components/Spinner';
import { authSelector } from '../../redux/selector/selector';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoutePathByName } from '../../routes/routes';
import { RouteName } from '../../routes/route.name.enum';
import { resetChangePassword } from '../../redux/slices/auth.slice';
import { decrypt } from '../../types/utils/encoder';

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams();
  const navigate = useNavigate();
  const defaultValue = {
    oldPassword: '',
    newPassword: '',
    username: username ? decrypt(username) : '',
  };
  const [newPasswordValue, setNewPasswordValue] = useState();
  const handleSubmit = (data: any) => {
    dispatch(changePasswordThunk(data));
    // spinner.show();
  };

  const changePasswordRes = useSelector(authSelector).changePassword;

  useEffect(() => {
    if (!changePasswordRes) return;
    const { data, error, loading } = changePasswordRes;
    if (error) {
      spinner.hide();
      toast.error(error);
      dispatch(resetChangePassword());
      return;
    }

    if (data) {
      spinner.hide();
      toast.success('Change Password Successfully');
      dispatch(resetChangePassword());
      navigate(getRoutePathByName(RouteName.SIGN_IN));
      return;
    }

    if (loading) {
      spinner.show();
      return;
    }
  }, [changePasswordRes]);

  return (
    <Form
      className="w-1/4 mx-auto pt-40"
      defaultValues={defaultValue}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4 mb-10">
        <Logo />
        <h2 className="font-bold text-2xl">Change Password</h2>
      </div>

      <TextField
        id="old_password"
        name="oldPassword"
        label="Old Password"
        required
        type="password"
        placeholder="Enter your old password..."
      />
      <TextField
        id="new_password"
        name="newPassword"
        pattern={PASSWORD_REGEX}
        required
        type="password"
        label="New Password"
        placeholder="Enter your new password..."
        getValue={value => {
          setNewPasswordValue(value as any);
        }}
      />
      <TextField
        id="confirm_password"
        name="confirmPassword"
        label="Confirm New Password"
        required
        type="password"
        placeholder="Confirm new password..."
        className="!mb-10"
        validateValue={newPasswordValue}
        validateMessage="Password Not Match"
      />
      <Button label={'Submit'} type="submit" />
      <Spinner />
    </Form>
  );
};

export default ResetPassword;
