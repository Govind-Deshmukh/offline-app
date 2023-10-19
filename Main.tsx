import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, Button, FlatList, Alert, StyleSheet} from 'react-native';
import {useRealm} from './DataRealmModel';
import Realm from 'realm';

export default function Main() {
  const realm = useRealm();

  const [data, setData] = useState<
    {_id: Realm.BSON.ObjectId; number: number}[]
  >([]);

  const addData = useCallback(() => {
    try {
      const newData = {
        _id: new Realm.BSON.ObjectId(),
        number: Math.floor(Math.random() * 100) + 1,
      };
      realm.write(() => {
        realm.create('Data', newData);
      });
      setData(prevData => [...prevData, newData]);
    } catch (err) {
      console.log(err);
    } finally {
      showData();
    }
  }, [realm]);

  const showData = useCallback(() => {
    try {
      const newData = realm.objects('Data');
      setData(
        Array.from(newData).map(item => ({
          _id: item._id as Realm.BSON.ObjectId,
          number: item.number as number,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  }, [realm]);

  const deleteData = useCallback(
    (_id: unknown) => {
      try {
        realm.write(() => {
          const itemToDelete = realm.objectForPrimaryKey('Data', _id);
          if (itemToDelete) {
            realm.delete(itemToDelete);
          }
        });
        showData();
      } catch (err) {
        console.log(err);
      }
    },
    [realm],
  );

  const updateData = useCallback(
    (_id: unknown) => {
      try {
        realm.write(() => {
          const itemToUpdate = realm.objectForPrimaryKey('Data', _id);
          if (itemToUpdate) {
            itemToUpdate.number = Math.floor(Math.random() * 100) + 1;
          }
        });
        showData();
      } catch (err) {
        console.log(err);
      }
    },
    [realm],
  );

  useEffect(() => {
    showData();
  }, [showData]);

  return (
    <View style={styles.container}>
      <Button title="Add Data" onPress={addData} />

      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text>{item.number}</Text>
            <Button title="Delete" onPress={() => deleteData(item._id)} />
            <Button title="Update" onPress={() => updateData(item._id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
