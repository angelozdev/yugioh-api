import React from "react";

interface UseLocalStorageOptions<T> {
  defaultValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

function useLocalStorage<T>(key: string, options?: UseLocalStorageOptions<T>) {
  const {
    defaultValue,
    deserialize = JSON.parse,
    serialize = JSON.stringify,
  } = options ?? {};

  const serializeRef = React.useRef(serialize);
  const deserializeRef = React.useRef(deserialize);

  const [state, setState] = React.useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? deserializeRef.current(storedValue) : defaultValue;
  });

  const setLocalStorageState = React.useCallback(
    (newValue: T) => {
      localStorage.setItem(key, serializeRef.current(newValue));
      setState(newValue);
    },
    [key]
  );

  return [state, setLocalStorageState] as const;
}

export default useLocalStorage;
