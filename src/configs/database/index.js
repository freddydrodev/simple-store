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
    singular: "product",
    plural: "products",
    relations: {
      category: { belongsTo: "category" }
    }
  },
  {
    singular: "client",
    plural: "clients"
  },
  {
    singular: "order",
    plural: "orders",
    relations: {
      client: { belongsTo: "client" },
      products: { hasMany: "product" }
    }
  },
  {
    singular: "sale",
    plural: "sales",
    relations: {
      client: { belongsTo: "client" }
    }
  }
]);
