import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv加载__dirname目录下的 mode文件，若mode为'test',则加载.env.test文件。
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
    base: env.VITE_APP_PROXY_URL // 获取环境变量
  }
})
