import FormInput from "./FormInput";
import Button from "./Button";
import useInput from "../hooks/useInput";
import { validateValue } from "../utils/validate";
import { useAuthActions } from "../auth/useAuthActions";
const RegisterForm = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validateValue);

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
  const auth = useAuthActions();

  let isValid = false;

  if (emailIsValid && passwordIsValid && nameIsValid) {
    isValid = true;
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!emailIsValid || !passwordIsValid || !nameIsValid) {
      return;
    }
    console.log(nameValue, emailValue, passwordValue, "register");
    await auth.signup(nameValue, emailValue, passwordValue);
    resetEmail();
    resetPassword();
    resetName();
  };

  const emailClasses = emailHasError ? "border-red-500 w-full" : "w-full";
  const passwordClasses = passwordHasError ? "border-red-500 w-full" : "w-full";
  const nameClasses = nameHasError ? "border-red-500 w-full" : "w-full";

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleRegisterSubmit}>
      <FormInput
        type="text"
        placeholder="Username"
        value={nameValue}
        className={nameClasses}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        reset={resetName}
        label="Username"
      />
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
        text="Register"
      />
    </form>
  );
};

export default RegisterForm;
