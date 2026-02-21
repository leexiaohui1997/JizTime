import type { UserConfigExport } from "@tarojs/cli"

export default {

  mini: {},
  h5: {
    devServer: {
      proxy: {
        // 将 /api 开头的请求代理到本地 Netlify Dev 服务器
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
} satisfies UserConfigExport<'vite'>
