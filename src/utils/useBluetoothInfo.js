import { useState, useEffect, useCallback } from 'react';
import ConnectivityManager from 'react-native-connectivity-status';

export default () => {
  const [enabled, setEnabled] = useState(false);

  const checkConnect = useCallback(async () => {
    const connectivityStatusSubscription = ConnectivityManager.addStatusListener(
      async ({ eventType, status }) => {
        switch (eventType) {
          case 'bluetooth':
            if (status) {
              setEnabled(true);
            } else {
              setEnabled(false);
            }
            break;
        }
      }
    );

    return () => {
      connectivityStatusSubscription.remove();
    };
  }, []);

  useEffect(() => checkConnect(), [checkConnect]);

  return enabled;
};
