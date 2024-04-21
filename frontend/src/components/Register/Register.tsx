import RegisterHeader from "./RegisterHeader";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <div className="bg-gray-900 p-10 rounded-lg shadow-lg min-w-full">
          <RegisterHeader />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
