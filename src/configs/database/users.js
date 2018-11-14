import authDB from "pouchdb-authentication";
import PouchDB from "pouchdb";
PouchDB.plugin({
  ...authDB
});

export const USER_DB = new PouchDB("http://localhost:5984/simple-store", {
  skip_setup: true
});
var local = new PouchDB("local_db");
local
  .sync(USER_DB, { live: true, retry: true })
  .on("error", console.log.bind(console));
