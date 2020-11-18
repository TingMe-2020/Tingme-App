import React, { Suspense, useEffect, useState } from 'react';
import codePush from 'react-native-code-push';

import Background from 'tingme/components/Background';
import Splash from 'tingme/components/Splash';
import * as asyncStorage from 'tingme/utils/asyncStorage';

import App from './App';

const Loader = () => <Background />;

const AppContainer = () => {
  const [synced, setSynced] = useState(true);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [progress, setProgress] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let lastUpdate = (await asyncStorage.getStorageItem('lastUpdate')) || 0;
  //       lastUpdate = Number(lastUpdate);

  //       if (Date.now() - lastUpdate <= 1000 * 60) {
  //         setSynced(true);
  //         return;
  //       }

  //       const syncStatus = await codePush.checkForUpdate();

  //       if (syncStatus) {
  //         if (syncStatus.failedInstall) {
  //           setSynced(true);
  //           return;
  //         }

  //         setHasUpdate(true);
  //         codePush.sync(
  //           { installMode: codePush.InstallMode.IMMEDIATE },
  //           async status => {
  //             if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
  //               await asyncStorage.setStorageItem('lastUpdate', Date.now() + '');
  //               setSynced(true);
  //             }
  //           },
  //           progress => {
  //             const { receivedBytes, totalBytes } = progress;
  //             setProgress(receivedBytes / totalBytes);
  //           }
  //         );
  //       } else {
  //         setSynced(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <Suspense fallback={<Loader />}>
      {!synced && <Splash hasUpdate={hasUpdate} progress={progress} />}
      {synced && <App />}
    </Suspense>
  );
};

export default codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(AppContainer);
