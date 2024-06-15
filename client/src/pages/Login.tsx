import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="pb-4">Access your subscription</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
