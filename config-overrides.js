const { injectBabelPlugin } = require("react-app-rewired");
const rewireAliases = require("react-app-rewire-aliases");
const rewireLess = require("react-app-rewire-less");
const path = require("path");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );

  //config for alias (to make relational pouch db work properly)
  config = rewireAliases.aliasesOptions({
    "pouchdb-promise": path.join(
      __dirname,
      "/node_modules/pouchdb-promise/lib/index.js"
    )
  })(config, env);

  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@body-background": "#f0f5f9",
      "@layout-body-background": "#f0f5f9",
      "@layout-header-background": "#fdffff",
      "@layout-header-padding": "0 10px",
      "@menu-collapsed-width": "50px",
      "@layout-header-height": "50px",
      "@primary-color": "#3c63fe",
      "@font-size-base": "16px",
      "@font-family":
        'Raleway, Dosis,"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    javascriptEnabled: true
  })(config, env);
  return config;
};
