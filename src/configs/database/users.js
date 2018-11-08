import authDB from "pouchdb-authentication";
import PouchDB from "pouchdb";
PouchDB.plugin({
  ...authDB
});

export const USER_DB = new PouchDB("http://localhost:5984/users", {
  skip_setup: true
});
