const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );

  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@body-background": "rgb(224,	229, 233)",
      "@layout-body-background": "rgb(224, 229, 233)",
      "@layout-header-background": "#fff",
      "@layout-header-padding": "0 10px",
      "@menu-collapsed-width": "50px",
      "@layout-header-height": "50px",
      "@primary-color": "#4A27F7",
      "@font-size-base": "16px",
      "@font-family":
        'Dosis,"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    javascriptEnabled: true
  })(config, env);
  return config;
};
