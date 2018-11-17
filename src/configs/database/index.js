import PouchDB from "pouchdb";
export * from "./users.js";

PouchDB.plugin(require("relational-pouch"));
PouchDB.plugin(require("pouchdb-find"));
export const DB = new PouchDB("bellise-style");

DB.setSchema([
  {
    singular: "category",
    plural: "categories"
  },
  {
    singular: "user",
    plural: "users"
  }
]);
