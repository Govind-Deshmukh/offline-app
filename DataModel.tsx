import Realm, {ObjectSchema} from 'realm';

import {createRealmContext, AppProvider, UserProvider} from '@realm/react';

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

export {
  RealmProvider,
  AppProvider,
  UserProvider,
  useRealm,
  useObject,
  useQuery,
};
