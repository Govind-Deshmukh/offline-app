import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useRealm} from './NoteRealmModel'; // Replace with the correct import path
import Realm from 'realm';

export default function ListNote() {
  const [notes, setNotes] = useState<
    | (Realm.Object &
        Realm.ObjectSchema & {title: string; description: string; id: string})[]
    | null
  >(null);

  const realm = useRealm();

  const fetchNotes = () => {
    try {
      const notes = realm.objects('Note');
      setNotes(
        Array.from(notes) as unknown as (Realm.Object &
          Realm.ObjectSchema & {
            title: string;
            description: string;
            id: string;
          })[],
      );
    } catch (e) {
      console.log(e);
      setNotes(null);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Render each note in a table-like format
  const renderNoteItem = ({
    item,
  }: {
    item: Realm.Object &
      Realm.ObjectSchema & {title: string; description: string; id: string};
  }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.title}</Text>
      <Text style={styles.tableCell}>{item.description}</Text>
      <Text style={styles.tableCell}>{item.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Notes</Text>
      {notes !== null && (
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={renderNoteItem}
        />
      )}
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
