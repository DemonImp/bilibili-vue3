<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import DanmakuLayer from './compunents/DanmakuLayer.vue'
import { useDanmaku } from '@/composable/useDanmakus'
import { useVideo } from '@/composable/useVideo.js'
import ControlLayer from './compunents/ControlLayer.vue'
const isPlayerContainerHover = ref(false)
const videoRef = ref(null)
const layerRef = ref(null) // 指向 DanmakuLayer 的根元素
const playerRef = ref(null)
// 镜像控制
const isMirror = ref(false)
const setMirror = () => {
  console.log('setMirror')
  isMirror.value = !isMirror.value
}
// 弹幕区域
const danmakus = [
  { time: 1.0, text: '第一！', color: '#fff' },
  { time: 2.0, text: '前方高能', color: '#ff4d6d' },
  { time: 3.5, text: '哈哈哈哈哈哈', color: '#7fd4ff' },
]

const { items, isPause, remove, start, destroy } = useDanmaku(videoRef, layerRef, danmakus)
const {
  currentTime,
  duration,
  currentProgress,
  seek,
  bufferProgress,
  togglePlay,
  autoPlay,
  updateTime,
  updateDuration,
  updateBuffer,

  setMuted,
  setVolume,
  volume,

  setPlaybackRate,

  setPlayLoop,
  // 画中画/宽屏模式/网页全屏/全屏模式
  togglePictureInPicture,
  toggleWideScreen,
  toggleWebFullScreen,
  toggleFullScreen,
  isWideScreen,
  isWebFullScreen,
} = useVideo(videoRef, isPause, { playerRef })

// 视频操相关区域
onMounted(() => {
  start()
  autoPlay()
})
onBeforeUnmount(destroy)
</script>
<template>
  <div id="playerWrap" class="player-wrap">
    <div id="player-placeholder">
      <div id="player-placeholder-top"></div>
      <div id="player-placeholder-bottom">
        <div id="player-placeholder-bottom-left"></div>
        <div id="player-placeholder-bottom-right"></div>
      </div>
    </div>
    <div
      id="player"
      :class="[{ 'is-web-full-screen': isWebFullScreen }, { 'is-wide-screen': isWideScreen }]"
    >
      <div class="docker docker-major">
        <div
          class="player-container"
          :class="[{ 'state-pause': isPause, 'state-no-cursor': !isPlayerContainerHover }]"
          data-reversion="1"
          data-screen="normal"
          :data-ctrl-hidden="!isPlayerContainerHover"
          @mouseenter="isPlayerContainerHover = true"
          @mouseleave="isPlayerContainerHover = false"
        >
          <div class="player-primary-area" aria-label="仿造b站播放器">
            <!-- video区域 -->
            <div class="player-video-area" ref="layerRef">
              <!-- 置顶 -->
              <div class="player-video-perch" ref="playerRef">
                <div class="player-video-wrap">
                  <video
                    ref="videoRef"
                    crossorigin="anonymous"
                    preload="auto"
                    src="../../assets/video/video1.mp4"
                    autoplay
                    @timeupdate="updateTime"
                    @progress="updateBuffer"
                    @loadedmetadata="updateDuration"
                    @click="togglePlay"
                    :class="{ 'video-mirror': isMirror }"
                  ></video>
                </div>
              </div>
              <!-- 预览图片 -->
              <div class="player-video-poster" hidden></div>
              <!-- 视觉画面 -->
              <div class="player-visual-wrap">
                <div class="player-visual-pixel"></div>
              </div>
              <!-- 对话区域 -->
              <div class="player-new-dialogue-area"></div>
              <!-- 显示容器 -->
              <div class="dm-layer-box">
                <DanmakuLayer :items="items" :is-pause="isPause" @remove="remove" />
              </div>
              <!-- 暂停 -->
              <div class="player-state-wrap">
                <div class="player-state-play"></div>
              </div>
              <!-- 视频控制 -->
              <div class="player-control">
                <ControlLayer
                  :isHover="isPlayerContainerHover"
                  :currentTime="currentTime"
                  :duration="duration"
                  :buffer="bufferProgress"
                  :isPause="isPause"
                  :volume="volume"
                  @setVolume="setVolume"
                  @togglePlay="togglePlay"
                  @seek="seek"
                  @setPlaybackRate="setPlaybackRate"
                  @setMirror="setMirror"
                  @setPlayLoop="setPlayLoop"
                  @togglePictureInPicture="togglePictureInPicture"
                  @toggleWideScreen="toggleWideScreen"
                  @toggleWebFullScreen="toggleWebFullScreen"
                  @toggleFullScreen="toggleFullScreen"
                ></ControlLayer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#playerWrap {
  --bg1: #ffffff;
  --bg3: #f1f2f3;
  height: 432px;
  #player-placeholder {
    position: absolute;
    display: flex;
    z-index: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px var(--bg3);
    box-shadow: 0 0 8px var(--bg3);
    #player-placeholder-top {
      flex: 1;
      overflow: hidden;
      position: relative;
      background-color: #000;
    }
    #player-placeholder-bottom {
      position: relative;
      display: flex;
      height: 46px;
      align-items: center;
      padding: 0 12px;
      background: var(--bg1);
      #placeholder-bottom-left {
        margin-right: 10px;
        width: 176px;
        height: 22px;
      }
      #player-placeholder-bottom-left,
      #player-placeholder-bottom-right {
        background-color: rgba(0, 0, 0, 0.04);
      }
      #player-placeholder-bottom-right {
        height: 22px;
        flex-grow: 1;
      }
    }
  }
}
.player-wrap {
  position: relative;
}
#player {
  width: 668px;
  height: 432px;
  position: static;
}
#player.is-wide-screen {
  width: 100vw;
  max-width: none;
}
#player.is-web-full-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
}
.docker-major {
  height: 100%;
  position: relative;
  width: 100%;
}
.docker {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-box-sizing: initial;
  box-sizing: initial;
  font-size: 12px;
  font-style: normal;
  line-height: 1;
}
.player-container {
  -webkit-box-shadow: 0 0 8px #e5e9ef;
  box-shadow: 0 0 8px #e5e9ef;
  -webkit-box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  height: 100%;
  position: relative;
  width: 100%;
}
.player-container.state-disable-box-shadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.player-primary-area {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
}
.player-video-area {
  -webkit-box-flex: 1;
  background-color: #000;
  background-color: var(--bpx-video-bgcolor, #000);
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.player-video-perch {
  -webkit-box-flex: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: none;
  flex: none;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.state-no-cursor .player-video-perch {
  cursor: none;
}
.player-video-wrap {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
  .video-mirror {
    transform: scaleX(-1);
  }
  video {
    content-visibility: visible;
    display: block;
    height: 100%;
    margin: auto;
    width: 100%;
  }
}

.player-video-poster[hidden] {
  display: none;
}
.player-video-poster {
  bottom: 0;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
.player-visual-wrap {
  pointer-events: none;
  visibility: hidden;
  width: 100%;
}
.player-visual-wrap .player-visual-pixel {
  background: rgba(0, 0, 0, 0.1);
  height: 1px;
  left: 0;
  position: absolute;
  top: 50%;
  width: 1px;
}
.player-new-dialogue-area {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 999;
}
.player-render-dm-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  z-index: 11;
}
.player-adv-dm-wrap,
.player-bas-dm-wrap,
.player-dm-mask-wrap,
.player-row-dm-wrap {
  cursor: pointer;
  height: 100%;
  left: 0;
  -webkit-mask-position: center;
  mask-position: center;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 2;
}
.danmaku-x-dm-rotate {
  position: absolute;
  top: -15%;
  left: -6%;
  right: -6%;
  bottom: -15%;
  pointer-events: none;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  -webkit-transform-origin: center;
  transform-origin: center;
  z-index: 4;
}
.danmaku-x-dm.danmaku-x-center {
  top: 0;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, var(--translateY, 0));
  transform: translate(-50%, var(--translateY, 0));
}
.danmaku-x-dm.danmaku-x-show {
  opacity: 1;
  opacity: var(--opacity, 1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.danmaku-x-paused .danmaku-x-dm {
  -webkit-animation-play-state: paused !important;
  animation-play-state: paused !important;
}
.danmaku-x-dm {
  will-change: transform, opacity, top, left;
  position: absolute;
  line-height: 1.125;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: pre;
  -webkit-perspective: 500px;
  perspective: 500px;
  will-change: transform, opacity, top, left;
  font-weight: bold;
  font-weight: var(--fontWeight, bold);
  font-family: var(--fontFamily);
  font-size: 25px;
  font-size: var(--fontSize, 25px);
  color: #ffffff;
  color: var(--color, #ffffff);
  text-shadow: var(--textShadow);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top: 0;
  top: var(--top, 0);
  opacity: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  left: -10px;
  left: var(--offset, -10px);
  z-index: 200;
  z-index: var(--zIndex, 200);
  display: var(--display, flex);
}
.state-pause {
  .player-state-wrap {
    bottom: 62px;
    cursor: pointer;
    pointer-events: none;
    position: absolute;
    right: 34px;
    z-index: 48;
  }
  .player-state-play {
    background: url(//s1.hdslb.com/bfs/static/player/img/play.svg) 50% no-repeat;
    display: block;
    height: 64px;
    width: 64px;
  }
}
.player-state-wrap {
  pointer-events: none;
}
</style>