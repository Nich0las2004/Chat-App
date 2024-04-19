import SignInForm from "./SignInForm";

import { SignInHeader } from "./SignInHeader";

const SignIn = () => {
  return (
    <div className="relative flex min-h-screen  antialiased flex-col justify-center overflow-hidden bg-gray-900 py-6 sm:py-12">
      <form className="bg-gray-900  relative py-3 sm:w-96 mx-auto text-center">
        <SignInHeader />
        <SignInForm />
      </form>
    </div>
  );
};

export default SignIn;
