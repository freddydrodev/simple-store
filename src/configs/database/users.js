import authDB from "pouchdb-authentication";
import PouchDB from "pouchdb";
PouchDB.plugin({
  test: (a, b) => {
    console.log("test: " + a + " & " + b);
  },
  ...authDB
});
// // PouchDB.plugin(require("pouchdb-authentication"));
// const PouchDB = require("pouchdb").plugin(authDB);
// export const USER_DB = new PouchDB("usersDB");
export const USER_DB = new PouchDB("http://localhost:5984/usersDB", {
  skip_setup: true
});
