const rewireAliases = require("react-app-rewire-aliases");
const path = require("path");

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    "pouchdb-promise": path.join(
      __dirname,
      "/node_modules/pouchdb-promise/lib/index.js"
    )
  })(config, env);

  return config;
};

// 0167138973
