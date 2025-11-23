import Button from '../components/Button';
import Field from '../components/Field';
import { PASSWORD_REGEX } from '../constants/regex.constant';
import Form from '../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { signInThunk } from '../thunks/auth.thunk';
import type { ThunkRequest } from '../types/redux.type';
import { useEffect } from 'react';
import type { UserSignIn } from '../types/entities/user.type';
import { authSelector } from '../redux/selector/selector';
import { spinner } from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { getRoutePathByName } from '../routes/routes';
import { RouteName } from '../routes/route.name.enum';
import toast from 'react-hot-toast';
import { reset } from '../redux/slices/auth.slice';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const defaultValue: UserSignIn = {
    username: '',
    password: '',
  };

  const onSubmit = (data: UserSignIn) => {
    const req: ThunkRequest<UserSignIn> = {
      data,
    };
    spinner.show();
    dispatch(signInThunk(req));
  };

  const authRes = useSelector(authSelector).signIn;
  const { data, error, loading } = authRes;

  useEffect(() => {
    // handle response sign in
    if (loading) {
      spinner.show();
    } else {
      spinner.hide();
    }

    if (data) {
      toast.success('Sign In Success');
      if (data.hasResetPassword) {
        navigate(getRoutePathByName(RouteName.RESET_PASSWORD));
      } else {
        navigate(getRoutePathByName(RouteName.DASHBOARD));
      }
      dispatch(reset());
      return;
    }

    if (error) {
      spinner.hide();
      toast.error(error);
      dispatch(reset());
      return;
    }
  }, [authRes]);

  return (
    <Form defaultValues={defaultValue} onSubmit={onSubmit}>
      <Field
        id="username"
        required
        label="Username"
        placeholder="Enter username..."
        type="text"
        name="username"
        childClassName="font-semibold"
      />

      <Field
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
