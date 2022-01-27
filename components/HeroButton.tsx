import axios from "axios";
import { FunctionComponent, useReducer } from "react";

const initialState = {
  error: null,
  greeting: null,
};

interface GreetingReducer {
  error: string | null;
  greeting: string | null;
}

interface GreetingAction {
  type: string | null;
  greeting?: string | null;
  error?: string | null;
}

const greetingReducer = (state: GreetingReducer, action: GreetingAction) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        error: null,
        greeting: action.greeting || null,
      };
    case "ERROR":
      return {
        error: action.error || null,
        greeting: null,
      };
    default:
      return state;
  }
};

const HeroButton: FunctionComponent<{ url: string }> = ({ url }) => {
  const [state, dispatch] = useReducer(greetingReducer, initialState);

  const onClick = async (url: string): Promise<void> => {
    // api call here
    try {
      const greeting: { data: { text: string } } = await axios.get(url);
      dispatch({ type: "SUCCESS", greeting: greeting.data.text });
    } catch (error) {
      dispatch({ type: "ERROR", error: "error" });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          onClick(url);
        }}
      >
        Load Greetings
      </button>
      {state.greeting && <h1>{state.greeting}</h1>}
      {state.error && <p role="alert">{"oops! Failed to catch the error"}</p>}
    </>
  );
};

export default HeroButton;
