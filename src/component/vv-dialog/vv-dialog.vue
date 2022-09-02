<template>
  <view class="vv-dialog" @touchmove="() => {}" :class="{ 'vv-dialog--animate': baseShow }">
    <view
      class="vv-dialog__mask"
      @click="handleMaskClick"
      @transitionend="handleTransitionend"
      :class="{ 'vv-dialog__mask-animate': show }"
    ></view>
    <view
      class="vv-dialog__content"
      :style="style"
      :class="{ 'vv-dialog__content-animate': show, 'vv-dialog_content-bottom': showLayoutBottom }"
    >
      <view class="vv-dialog__title-con">
        <view class="vv-dialog__title">{{ title }}</view>
        <view class="vv-dialog__icon-close" @click="handleClose" v-if="showClose">
          <uni-icons type="closeempty" color="#666" size="38rpx"></uni-icons>
        </view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>
<script>
  /**
   * props:
   *  visible: 是否显示, 做了双向绑定 用sync
   *  title: 标题
   *  showClose: 是否显示关闭按钮
   *  maskClick: 是否遮罩层点击关闭
   *  width: 宽度
   *  showLayoutBottom: 是否在最底部显示内容
   */
  import { mapGetters } from 'vuex'
  export default {
    name: 'VvDialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: true
      },
      maskClick: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 600
      },
      showLayoutBottom: {
        // 布局是否向下弹窗
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        baseShow: false,
        show: false,
        inner: false
      }
    },
    watch: {
      visible: {
        handler(n, o) {
          if (n === true) {
            //打开
            this.show = true
            this.baseShow = true
          } else if (o === true && n === false && this.inner) {
            this.inner = false
            this.baseShow = false
          } else if (o === true && n === false && !this.inner) {
            this.show = false
          }
        },
        immediate: true
      }
    },
    computed: {
      ...mapGetters(['statusBarHeight', 'navigatorMenuHeight']),
      style() {
        // 判断是否向下弹窗
        let style = this.showLayoutBottom
          ? `bottom: -${this.statusBarHeight + this.navigatorMenuHeight}px;`
          : ''
        // 增加弹窗宽度设置
        style = style + `;width: ${this.showLayoutBottom ? '100%' : this.width + 'rpx'}`
        return style
      }
    },
    methods: {
      handleTransitionend() {
        if (!this.show && !this.inner) {
          this.baseShow = false
        } else if (!this.show) {
          this.inner = true
          this.$emit('update:visible', false)
        }
      },
      handleClose() {
        this.inner = true
        this.show = false
      },
      handleMaskClick() {
        if (this.maskClick) {
          this.handleClose()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .vv-dialog {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: -750rpx;
    top: 0;
    z-index: 999999;
    .vv-dialog__mask {
      height: 100%;
      width: 100%;
      background-color: rgba($color: #000000, $alpha: 0);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 98;
      transition: background-color 0.3s;
    }
    .vv-dialog__mask-animate {
      background-color: rgba($color: #000000, $alpha: 0.7);
      transition: background-color 0.3s;
    }
    .vv-dialog__content {
      background-color: #fff;
      width: 600rpx;
      z-index: 99;
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 10rpx;
      padding: 20rpx;
      box-sizing: border-box;
      transition: transform 0.3s;
      .vv-dialog__title-con {
        position: relative;
        .vv-dialog__title {
          text-align: center;
          font-size: 32rpx;
          font-weight: bold;
          padding: 20rpx 0;
        }
        .vv-dialog__icon-close {
          position: absolute;
          right: 20rpx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.vv-dialog_content-bottom {
        width: 100%;
        top: unset;
        bottom: 0;
      }
    }
    .vv-dialog__content-animate {
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.3s;
    }
  }
  .vv-dialog--animate {
    left: 0rpx;
  }
</style>
