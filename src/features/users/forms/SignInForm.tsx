import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import { spinner } from '../../../components/Spinner';
import TextField from '../../../components/TextField';
import { PASSWORD_REGEX } from '../../../constants/regex.constant';
import { authSelector } from '../../../redux/selector/selector';
import { reset } from '../../../redux/slices/auth.slice';
import type { AppDispatch } from '../../../redux/store';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';
import { signInThunk } from '../../../thunks/auth.thunk';
import type { Token } from '../../../types/entities/auth.type';
import type { UserSignIn } from '../../../types/entities/user.type';
import type { ThunkRequest } from '../../../types/redux.type';
import { encrypt } from '../../../types/utils/encoder';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const defaultValue: UserSignIn = {
    username: '',
    password: '',
  };
  const onSubmit = (data: UserSignIn) => {
    spinner.show();

    const req: ThunkRequest<UserSignIn> = {
      data,
    };
    dispatch(signInThunk(req));
  };

  const authResSelector = useSelector(authSelector).signIn;
  const { data, error, loading } = authResSelector;

  useEffect(() => {
    if (!loading) {
      spinner.hide();
      return;
    }
  }, [loading]);

  useEffect(() => {
    // error
    if (error) {
      toast.error(error);
      dispatch(reset());
      return;
    }

    // success
    if (!error && data) {
      const token = data as Token;
      const hasResetPassword = token.hasResetPassword;
      const { username, email } = data as Token;


      if (hasResetPassword) {
        navigate(getRoutePathByName(RouteName.RESET_PASSWORD).replace(":username", encrypt(username)));
        return;
      }
      toast.success('Sign In Successfully');

      localStorage.setItem('username', username);
      localStorage.setItem('email', email);

      navigate(getRoutePathByName(RouteName.DASHBOARD));
      dispatch(reset());
      return;
    }

    return;
  }, [authResSelector]);

  return (
    <Form defaultValues={defaultValue} onSubmit={onSubmit}>
      <TextField
        id="username"
        required
        label="Username"
        placeholder="Enter username..."
        name="username"
        childClassName="font-semibold"
      />

      <TextField
        id="password"
        required
        pattern={PASSWORD_REGEX}
        label="Password"
        placeholder="Enter password..."
        type="password"
        childClassName="font-semibold"
        name="password"
      />
      <div className="mt-8">
        <Button label="Sign In" type="submit" />
      </div>
    </Form>
  );
};

export default SignInForm;
