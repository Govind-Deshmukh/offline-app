import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

import {useRealm} from './NoteRealmModel';
import Realm from 'realm';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const realm = useRealm();

  const handleSaveNote = () => {
    if (!title || !body) {
      Alert.alert('Error', 'Title and body are required');
      return;
    }
    try {
      const note = {
        _id: new Realm.BSON.ObjectId(),
        title: title,
        description: body,
      };
      realm.write(() => {
        realm.create('Note', note);
      });
      Alert.alert('Success', 'Note saved successfully');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to save note' + e);
    } finally {
      setTitle('');
      setBody('');
      realm.close();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput value={title} style={styles.input} onChangeText={setTitle} />
      <Text style={styles.label}>Body:</Text>
      <TextInput value={body} style={styles.input} onChangeText={setBody} />
      <Button title="Save" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 8,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateNote;
