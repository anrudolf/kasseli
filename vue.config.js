// eslint-disable-next-line
const GitRevisionPlugin = require("git-revision-webpack-plugin");

module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      const gitRevisionPlugin = new GitRevisionPlugin();
      args[0]["process.env"]["VUE_APP_COMMIT_HASH"] = JSON.stringify(
        gitRevisionPlugin.commithash()
      );
      return args;
    });
  },
};
