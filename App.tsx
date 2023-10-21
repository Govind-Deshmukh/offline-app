import React from 'react';
import {View, Text} from 'react-native';
import {WelcomeView} from './WelcomeView';
import Screen from './Screen';
import {RealmProvider, AppProvider, UserProvider} from './DataModel';

import {appId, baseUrl} from './atlasConfig.json';

export default function App(): JSX.Element {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <RealmProvider>
          <View>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              Welcome to the Realm Sync React Native Example App!
            </Text>
            <Screen />
          </View>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
