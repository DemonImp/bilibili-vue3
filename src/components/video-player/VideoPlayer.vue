<template>
  <div ref="playerRef" class="video-player"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Artplayer from 'artplayer'
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku'

const playerRef = ref(null)

let art = null
onMounted(() => {
  art = new Artplayer({
    container: playerRef.value,

    // 视频地址
    url: '../../assets/video/video1.mp4',

    // 播放器大小
    width: '100%',
    height: '100%',

    // 自动播放
    autoplay: false,

    // 是否显示控制栏
    controls: true,

    // 弹幕插件
    plugins: [
      artplayerPluginDanmuku({
        // 测试弹幕
        danmuku: [
          {
            text: '欢迎来到我的仿B站项目',
            time: 1,
            color: '#ffffff',
          },
          {
            text: '这是第二条弹幕',
            time: 3,
            color: '#ff6699',
          },
          {
            text: 'ArtPlayer + Danmuku',
            time: 5,
            color: '#00aeec',
          },
        ],
      }),
    ],
  })
})

onBeforeUnmount(() => {
  if (art) {
    art.destroy(false)
    art = null
  }
})
</script>

<style scoped>
.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
</style>
