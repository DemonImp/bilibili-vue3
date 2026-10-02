<!-- 各个页面常用的布局方案 -->
 <script setup>
import { ref } from 'vue'
import VideoCard from './VideoCard.vue'
import video01Avif from '@/assets/images/video-01.avif'
import banner02 from '@/assets/images/banner-02.webp'
import video1 from '@/assets/video/video1.mp4'
// 组件化开发最好使用动态的轮播图
const bannerList = ref([
  { url: '', title: '', color: '' },
  { url: '', title: '', color: '' },
  { url: '', title: '', color: '' },
])
const currentPreviewId = ref(null)
// 开始预览
const handlePreviewStart = (id) => {
  currentPreviewId.value = id
}

// 停止预览
const handlePreviewStop = (id) => {
  // 只有当前正在播放的卡片才能清空
  if (currentPreviewId.value === id) {
    currentPreviewId.value = null
  }
}
const videoList = ref([
  {
    id: 1,
    title: 'Java教程',
    like: '1万点赞',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 45 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
  {
    id: 2,
    like: null,
    title: 'Java教程',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 25 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
  {
    id: 3,
    like: null,
    title: 'Java教程',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 35 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
  {
    id: 4,
    title: 'Java教程',
    like: '1万点赞',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 45 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
  {
    id: 5,
    like: null,
    title: 'Java教程',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 25 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
  {
    id: 6,
    like: null,
    title: 'Java教程',
    src: [
      {
        image: video01Avif,
        type: 'image/avif',
      },
      {
        image: banner02,
        type: 'image/webp',
      },
    ],
    img: video01Avif,
    previewUrl: video1,
    stats: {
      duration: 35 * 10 + 15,
      playCount: '16.25万',
      commentCount: 8835,
    },
    playSeekTime: 0,
  },
])
</script>
<template>
  <div class="container">
    <!-- 这里采用插槽的形式，有的页面不需要 -->
    <slot name="pageHead" class="page-head"> </slot>
    <!-- 主体部分 -->
    <div class="page-body">
      <div class="page-cards">
        <!-- 页面是否需要轮播图，以及轮播图的占比(默认两列,x行) -->
        <slot name="pageBanner" class="page-banner"> </slot>
        <VideoCard
          v-for="video in videoList"
          :key="video.id"
          :playing="currentPreviewId === video.id"
          :video="video"
          @preview-start="handlePreviewStart"
          @preview-stop="handlePreviewStop"
          >xxx</VideoCard
        >
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  --layout-padding: 140px;
  --layout-width: auto;
  --row-gap: 0px;
  --column-gap: 0px;
  margin: 0 auto;
  min-width: 1020px;
  max-width: calc(1980px + var(--layout-padding) * 2);
  // width: var(--layout-padding);
  padding: 0 var(--layout-padding);
  .page-head {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  // 设置好行列宽
  .page-body {
    position: relative;
    padding-bottom: 60px;
    // height: 100%;
    .page-cards {
      display: grid;
      // height: 100%;
      grid-gap: 20px;
      padding-bottom: var(--row-gap);
      grid-template-columns: repeat(var(--aaea038c), 1fr);
      .page-banner {
        //轮播图,占据两列
        grid-column: span 2;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
      }
    }
  }
}

@media (min-width: 0px) and (max-width: 1139.9px) {
  .contianer {
    --layout-width: 1020px;
  }
}
@media (min-width: 1140px) and (max-width: 1299.9px) {
  :root {
    --layout-padding: 60px;
  }
}
@media (min-width: 1140px) and (max-width: 1559.9px) {
  .container {
    --layout-width: auto;
    --layout-padding: 60px;
  }
}

@media (min-width: 1560px) {
  .container {
    --layout-width: auto;
    --layout-padding: 140px;
  }
}

@media (min-width: 1400px) {
  .container {
    .page-body {
      .page-cards {
        --row-gap: 63px;
        --column-gap: 20px;
        grid-template-columns: repeat(var(--7c7fe7cc), 1fr);
      }
    }
  }
}
</style>
