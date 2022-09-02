import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from '/@/store'
import { customToast, showModal, showLoading, hideLoading } from '/@/util'
import storage from '/@/util/storage'
import Router from '/@/util/router'
export function createApp() {
  const app = createSSRApp(App)

  // 定义全局参数
  app.config.globalProperties.$toast = customToast
  app.config.globalProperties.$showModal = showModal
  app.config.globalProperties.$showLoading = showLoading
  app.config.globalProperties.$hideLoading = hideLoading
  app.config.globalProperties.$storage = storage
  app.config.globalProperties.$navigate = new Router()

  // pinia 仓库管理
  setupStore(app)
  return {
    app
  }
}
