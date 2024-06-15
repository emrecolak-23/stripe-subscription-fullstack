import { useReducer, ChangeEvent } from "react";

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

type InputAction = { type: "CHANGE"; value: string } | { type: "BLUR" };

const INITIAL_STATE: InputState = {
  value: "",
  isValid: false,
  isTouched: false,
};

function inputStateReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: action.value.trim().length > 0,
      };
    case "BLUR":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

const useInput = (validateValue: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, INITIAL_STATE);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "CHANGE", value: "" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
