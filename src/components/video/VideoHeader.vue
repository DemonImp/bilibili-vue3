<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    require: true,
    default: '标题',
  },
})
</script>
<template>
  <div class="video-info-container">
    <div class="video-info-title">
      <div class="video-info-title-inner">
        <h1 :title="title">{{ title }}</h1>
      </div>
      <div class="video-info-meta">
        <div class="video-info-detail-list video-info-detail-content">
          <slot name="video-info-other"></slot>
          <div class="view item">
            <span class="icon iconfont icon-bofangliang"></span>
            <span class="text">176.1万</span>
          </div>
          <div class="dm item">
            <span class="icon iconfont icon-wenbenbiaodan"></span>
            <span class="text">1.1万</span>
          </div>
          <div class="pubdate-ip">
            <span class="text">2026-09-21 12:00:00</span>
          </div>
          <div class="copyright"></div>
          <svg
            t="1790249714752"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4379"
            width="16"
            height="16"
          >
            <path
              d="M828.32 828.32a448 448 0 1 1 0-633.6 448 448 0 0 1 0 633.6z m-565.76-67.84a352.288 352.288 0 0 0 463.68 29.76L232.8 296.8a352.288 352.288 0 0 0 29.76 463.68z m497.92-497.92a352.288 352.288 0 0 0-463.68-29.76l493.44 493.44a352.288 352.288 0 0 0-29.76-463.68z"
              fill="#d81e06"
              p-id="4380"
            ></path>
          </svg>

          <span>未经作者授权，禁止转播</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
:root {
  --text3: #9499a0;
}
.video-info-container {
  --keep-blank-space: 30px;
  position: relative;
  height: 104px;
  box-sizing: border-box;
  padding-top: 22px;
  .video-info-title {
    position: relative;
    .video-info-title-inner {
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
    }
  }
  .video-info-meta {
    margin-top: 6px;
    display: flex;
    position: relative;
    align-items: center;
    .video-info-detail-list {
      font-size: 13px;
      color: var(--text3);
      display: flex;
      align-items: center;
      height: 24px;
      overflow: hidden;
      .icon {
        height: 20px;
        line-height: 20px;
        width: 20px;
        font-size: 20px;
        margin-right: 4px;
      }
      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .view {
        display: inline-flex;
        align-items: center;
      }
      .item {
        flex-shrink: 0;
        margin-right: 12px;
        overflow: hidden;
      }
      .dm {
        display: inline-flex;
        align-items: center;
      }
      .pubdate-ip {
        display: flex;
        align-items: center;
        font-size: 13px;
      }
      .copyright {
        display: inline-flex;
        align-items: center;
        .icon {
          width: 16px;
          height: 16px;
          line-height: 16px;
          font-size: 16px;
        }
      }
      .copyright.item {
        margin: 0;
      }
    }
    .video-info .video-info-detail-content {
      flex: 1;
    }
  }
}
@media (min-width: 1681px) {
  .video-info-container {
    height: 108px;
    padding-top: 22px;
  }
}
</style>
