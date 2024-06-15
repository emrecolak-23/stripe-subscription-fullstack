import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Let's Get Started</h1>
          <p className="pb-4">Sign up for free. No credit card required</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
