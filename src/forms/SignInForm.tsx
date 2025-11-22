import Button from '../components/Button';
import Field from '../components/Field';
import { PASSWORD_REGEX } from '../constants/regex.constant';
import Form from '../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { signInThunk } from '../thunks/auth.thunk';
import type { ThunkRequest } from '../types/redux.type';
import { authSelector } from '../redux/selector/auth.selector';
import { useEffect } from 'react';
import type { UserSignIn } from '../types/entities/user.type';

const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const defaultValue: UserSignIn = {
    username: '',
    password: '',
  };

  const onSubmit = (data: UserSignIn) => {
    const req: ThunkRequest<UserSignIn> = {
      data,
    };
    dispatch(signInThunk(req));
  };

  const authResSelector = useSelector(authSelector);
  const { data, message, error, loading } = authResSelector;

  useEffect(() => {
    if (error) {
      console.log('lỗi r');
      return;
    }

    console.log('data: ', data);
    console.log('message: ', message);
    return;
  }, [authResSelector]);

  return (
    <Form defaultValue={defaultValue} onSubmit={onSubmit}>
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
