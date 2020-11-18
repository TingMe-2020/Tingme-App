import { useEffect, useRef } from 'react';
import { useAppState } from 'react-native-hooks';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default cb => {
  const appState = useAppState();
  const prevAppState = usePrevious(appState);

  useEffect(
    () => {
      cb(prevAppState, appState);
    },
    [appState]
  );
};
