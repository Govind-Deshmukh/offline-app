import Realm from 'realm';
import {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';

class Note extends Realm.Object<Note> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  static schema: ObjectSchema = {
    name: 'Note',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object for the given schema
const realmConfig: Realm.Configuration = {
  schema: [Note],
};
// Create a realm context for the given configuration
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
