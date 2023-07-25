const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        // 如果你在开发环境中使用 webpack 5，则需要使用以下语句:
        // 'path': require.resolve('path-browserify')
        path: require.resolve("path-browserify"),
        // fs: false,
        // os: false,
        // electron: false,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: [
        "electron-log",
        "@electron/remote",
        "node-xlsx",
        "xlsx",
        "officegen",
      ],
      nodeModulesPath: ["../../node_modules", "./node_modules"],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName: "SMNFiler",
        appId: "com.smnfiler.app",
        dmg: {
          title: "SMNFiler",
          icon: "./src/assets/app256x256.icns",
        },
        mac: {
          category: "public.app-category.developer-tools",
          icon: "./src/assets/app256x256.icns",
          extendInfo: {
            LSUIElement: 0,
          },
          target: ["dmg"],
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}.v${version}.MacOS.${ext}",
        },
        win: {
          icon: "./src/assets/app.ico",
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}.v${version}.Win_Portable.${ext}",
          target: [
            {
              target: "portable",
              arch: ["ia32"],
            },
          ],
        },
        linux: {
          icon: "./src/assets/app256x256.png",
          category: "Network",
          target: ["deb"],
          artifactName: "${productName}.v${version}.${ext}",
        },
      },
    },
  },
})
