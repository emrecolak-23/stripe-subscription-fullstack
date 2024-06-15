import { useEffect } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import useInput from "../hooks/useInput";
import { validateValue } from "../utils/validate";
import { useAuthActions } from "../auth/useAuthActions";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../auth/AuthContext";
const LoginForm = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateValue);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validateValue);
  const navigate = useNavigate();
  const auth = useAuthActions();
  const { userId } = useLoginData();

  useEffect(() => {
    if (userId) {
      navigate(`/`);
    }
  }, [userId, navigate]);
  let isValid = false;

  if (emailIsValid && passwordIsValid) {
    isValid = true;
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    auth.signin(emailValue, passwordValue);
    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError ? "border-red-500" : "";
  const passwordClasses = passwordHasError ? "border-red-500" : "";

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleLoginSubmit}>
      <FormInput
        type="email"
        placeholder="Email"
        value={emailValue}
        className={emailClasses}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        reset={resetEmail}
        label="Email"
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={passwordValue}
        className={passwordClasses}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        reset={resetPassword}
        label="Password"
      />
      <Button
        disabled={!isValid}
        className="p-3 bg-gray-800 text-white rounded-md"
        text="Login"
      />
    </form>
  );
};

export default LoginForm;
