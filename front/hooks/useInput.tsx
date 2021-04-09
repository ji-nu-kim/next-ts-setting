import { useState, useCallback, Dispatch, SetStateAction } from 'react';

function useInput<T>(initialValue: T): [T, any, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
}

export default useInput;
