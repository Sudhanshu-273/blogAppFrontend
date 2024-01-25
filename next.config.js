const webpack = require("webpack")

/** @type {import('next').NextConfig} */
const nextConfig = {};

const { parsed: myEnv } = require("dotenv").config();

module.exports = {
  nextConfig,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

// export default nextConfig
