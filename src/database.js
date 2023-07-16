import { inject } from "vue";
import { createRxDatabase, addRxPlugin } from "rxdb";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

// schemas
import contactSchema from "./schemas/contact";

addRxPlugin(RxDBLeaderElectionPlugin);

const KEY_DATABASE = Symbol("database");

export function useDatabase() {
  return inject(KEY_DATABASE);
}

export async function createDatabase() {
  const database = await createRxDatabase({
    name: "my-database",
    storage: getRxStorageDexie(),
  });

  await database.addCollections({
    contacts: {
      schema: contactSchema,
    },
  });

  return {
    install(app) {
      app.provide(KEY_DATABASE, database);
    },
  };
}
