<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button @click="handleClick">点击获取变化store{{ text }}</button>
  </view>
</template>

<script setup lang="ts">
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import { ref, getCurrentInstance, computed, watch, onMounted } from 'vue'
  import { useAppStore } from '/@/store/modules/app'

  onLoad((options) => {
    console.log('测试页面初始化', options)
  })
  onShow(() => {
    console.log('测试页面出现时')
  })

  onMounted(() => {
    getData()
  })
  const title = ref('这是测试页面')

  // 获取store app的值
  const useAppState = useAppStore()
  const text = computed(() => useAppState.getTest)

  const name2 = computed(() => {
    let style = ''
    // do something
    return style
  })

  //  假设监听 一个 name 变量
  watch(title, (newValue, oldValue) => {
    // do something
    // 这里就是当 name 属性值发生变化时 ，就会执行此方法
  })
  // 如果需要监听多个变量，且要做的事情是一样的 那么我们只需要把第一个参数变为数组即可
  watch([title, name2], (newValue, oldValue) => {
    // do something
    // 这里就是当 name或者name2 值发生变化时 ，就会执行此方法
  })

  function handleClick() {
    useAppState.changeVal()
  }
  function getData() {
    const { proxy } = getCurrentInstance() as any
    // proxy.$showLoading('加载中')
    const query = proxy.$navigate.query()
    const title = query.title
    proxy.$toast('这个来自' + title)
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
      height: 200rpx;
      width: 200rpx;
      margin-top: 200rpx;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50rpx;
    }
  }
  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
