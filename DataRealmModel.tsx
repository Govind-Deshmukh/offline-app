import Realm from 'realm';
import {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';

class Data extends Realm.Object<Data> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  static schema: ObjectSchema = {
    name: 'Data',
    properties: {
      _id: 'objectId',
      number: 'int',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Data],
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
