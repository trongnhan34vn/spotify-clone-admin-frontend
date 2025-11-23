import Logo from '../../components/Logo';
import Spinner from '../../components/Spinner';
import SignInForm from '../../forms/SignInForm';

const SignIn = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/4 p-6 bg-[var(--color-bg-card)] mt-40 rounded-lg">
        <div className="flex items-center gap-4 mb-10">
          <Logo width={40} height={40} />
          <p className="text-white text-2xl font-bold">Spotify Admin</p>
        </div>
        {/* Form */}
        <SignInForm />
        <Spinner />
      </div>
    </div>
  );
};

export default SignIn;
