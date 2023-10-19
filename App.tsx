import React from 'react';
import {View} from 'react-native';

import Main from './Main';
import {RealmProvider} from './DataRealmModel';

export default function App(): JSX.Element {
  return (
    <RealmProvider>
      <View>
        <Main />
      </View>
    </RealmProvider>
  );
}
