import PouchDB from "pouchdb";
export * from "./users.js";

export const DB = new PouchDB("simple-store");
