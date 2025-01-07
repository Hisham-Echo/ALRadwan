//const { defineConfig } = require("@vue/cli-service");
//module.exports = defineConfig({
//  transpileDependencies: true,
//});

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Al-Radwan/" : "/",
  devServer: {
    historyApiFallback: true, // Enable history fallback in development
  },
};
