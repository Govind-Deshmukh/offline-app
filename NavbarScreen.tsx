import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NavbarScreen = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Todo Or Simple Docs App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#fff',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default NavbarScreen;
