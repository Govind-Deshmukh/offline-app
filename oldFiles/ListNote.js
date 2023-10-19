import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useRealm} from '../DataRealmModel';

export default function ListNote() {
  const [notes, setNotes] = useState([]);

  const realm = useRealm();

  const fetchNotes = () => {
    try {
      const notes = realm.objects('Note');

      let noteArray = [];

      for (const note of notes) {
        const singleNote = {
          title: note.title,
          description: note.description,
          id: note._id,
        };
        noteArray.push(singleNote);
      }

      setNotes(noteArray);
      console.log(noteArray);
      realm.close();
    } catch (e) {
      console.log(e);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [realm]);

  const deleteNote = noteId => {
    try {
      realm.write(() => {
        const note = realm.objectForPrimaryKey('Note', noteId);
        realm.delete(note);
      });
      fetchNotes();
    } catch (e) {
      console.log(e);
    } finally {
      realm.close();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Notes</Text>
      <FlatList>
        {notes.map(note => (
          <TouchableOpacity
            key={note.id}
            style={styles.tableRow}
            onPress={() => deleteNote}>
            <Text style={styles.tableCell}>{note.title}</Text>
            <Text style={styles.tableCell}>{note.description}</Text>
          </TouchableOpacity>
        ))}
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
});
