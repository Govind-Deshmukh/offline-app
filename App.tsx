import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import NavbarScreen from './NavbarScreen';
import CreateNote from './CreateNote';
import ListNote from './ListNote';

import {RealmProvider} from './NoteRealmModel';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <View>
        <NavbarScreen />
        <CreateNote />
        <ListNote />
      </View>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
