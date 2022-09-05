/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/** 扩展环境变量import.meta.env */
interface ImportMetaEnv {
  /** 这里增加自定义的声明 */
  VITE_REQUEST_BASE_URL: string
}