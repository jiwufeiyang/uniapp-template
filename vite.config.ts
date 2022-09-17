import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取env所在路径
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [uni()],
    // 设置别名
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        }
      ]
    },
    base: '/',
    envDir: resolve(__dirname, 'config'),
    // 设置代理
    server: {
      port: 3001,
      host: '127.0.0.1',
      proxy: {
        '/api': {
          target: 'http://' + env.VITE_APP_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/')
        }
      }
    }
  }
})
