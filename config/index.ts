import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import path from 'path'

import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'vite'>(async (merge, {  }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: 'JizTime',
    date: '2026-2-22',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    alias: {
      // 仅配置 @shared 别名，不配置 @server，确保前端无法引用后端专用代码
      '@shared': path.resolve(__dirname, '..', 'shared')
    },
    plugins: [
      "@tarojs/plugin-generator"
    ],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'vite',
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      // miniCssExtractPluginOption 是 Webpack 配置，在 Vite 模式下不适用，注释掉以避免混淆
      // miniCssExtractPluginOption: {
      //   ignoreOrder: true,
      //   filename: 'css/[name].[hash].css',
      //   chunkFilename: 'css/[name].[chunkhash].css'
      // },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      // 强制 Vite 预构建 Taro 运行时依赖
      // @ts-ignore
      vite: {
        optimizeDeps: {
          include: [
            '@tarojs/runtime',
            '@tarojs/plugin-platform-h5/dist/runtime'
          ]
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }


  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
