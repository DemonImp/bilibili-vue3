<script setup>
import HeaderNav from '@/components/common/HeaderNav.vue'
import VideoHeader from '@/components/video/VideoHeader.vue'
import MyVideoPlayer from '@/components/video-player/MyVideoPlayer.vue'
import UpLabelContainer from '@/components/user/UpLabelContainer.vue'
import { ref } from 'vue'
const headerNavColor = ref('#18191c')
</script>
<template>
  <div class="video">
    <div class="header" style="min-height: 64px">
      <HeaderNav :text-color="headerNavColor" class="nav" />
    </div>
    <div class="body">
      <!-- 左边区域 -->
      <div class="left-container scroll-sticky">
        <VideoHeader></VideoHeader>
        <MyVideoPlayer></MyVideoPlayer>
        <!-- 播放器 -->
        <!-- <video ref="videoRef" src="../assets/video/video1.mp4" controls></video> -->
        <!-- VideoPage.vue 模板里 -->
        <!-- <div ref="layerRef" class="dm-layer-box">
          <DanmakuLayer :items="items" :is-pause="isPause" @remove="remove" />
        </div> -->
        <!-- <div class="player-wrap" id="playerWrap">
          <div id="player-placeholder">
            <div id="player-placeholder-top"></div>
            <div id="player-placeholder-bottom">
              <div id="player-placeholder-bottom-left"></div>
              <div id="player-placeholder-bottom-right"></div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="right-container">
        <div class="right-container-inner scroll-sticky">
          <UpLabelContainer></UpLabelContainer>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.video {
  --bg3: #f1f2f3;
}
.dm-layer-box {
  position: relative;
  width: 100%;
  height: 100%;
  inset: 0;
  pointer-events: none;
}
.nav {
  position: fixed;
  background: var(--bg1_float);
  box-shadow: 0 2px 4px #00000014;
}
.body {
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  position: relative;
  margin: 0 auto;
  padding: 0 10px;
  .left-container {
    width: 668px;
    position: relative;
  }
  .left-container.scroll-sticky {
    position: sticky;
    height: fit-content;
    z-index: 1;
  }
  .right-container {
    width: 350px;
    flex: none;
    margin-left: 30px;
    position: relative;
    pointer-events: none;
    .right-container-inner {
      padding-bottom: 250px;
    }
  }
}
@media (min-width: 1681px) {
  .right-container {
    width: 411px;
    .danmaku-box {
      margin-bottom: 20px;
    }
    .danmaku-box.overseas-hidden {
      margin-bottom: 0px;
    }
    .video-pod {
      margin-bottom: 20px;
    }
    .right-bottom-banner {
      margin-top: 20px;
      height: 205px;
      .title {
        font-size: 16px;
      }
    }
  }
}
</style>
