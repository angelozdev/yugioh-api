import { useEffect, useState } from "react";

function useDebounceState<T>(
  initialValue: T,
  time = 1000
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const [state, setState] = useState<T>(initialValue);
  const [debouncedState, setDebouncedState] = useState<T>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedState(state);
    }, time);

    return () => clearTimeout(timeoutId);
  }, [state, time]);

  return [debouncedState, setState, state];
}

export default useDebounceState;
