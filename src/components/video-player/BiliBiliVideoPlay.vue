<script setup>
import { ref } from 'vue'
const playSeetTime = ref(0)
</script>

<template>
  <div class="v-inline-player" :data-player-seet-time="playSeetTime">
    <div class="bpx-docker bpx-docker-major">
      <div
        class="bpx-player-container bpx-state-disable-box-shadow"
        data-screen="normal"
        data-ctrl-hidden="false"
      >
        <div class="bpx-player-primary-area" aria-label="播放器">
          <div class="bpx-player-video-area">
            <div class="bpx-player-video-perch">
              <div class="bpx-player-video-wrap">
                <video crossorigin="anonymous"></video>
              </div>
            </div>
            <div class="bpx-player-video-poster"></div>
            <div class="bpx-player-visual-wrap">
              <div class="bpx-player-visual-pixel"></div>
            </div>
            <div class="bpx-player-render-dm-wrap">
              <div class="bpx-player-adv-dm-wrap"></div>
              <div class="bpx-player-bas-dm-wrap"></div>
              <div class="bpx-player-row-dm-wrap bili-danmaku-x-paused" style="contain: paint">
                <div class="bili-danmaku-x-dm-rotate"></div>
              </div>
              <div class="bpx-player-cmd-dm-wrap">
                <div class="bpx-player-cmd-dm-inside"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bpx-player-dialog-area"></div>
        <div class="bpx-player-tooltip-area"></div>
        <div class="bpx-player-context-area"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.v-inline-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s linear;
  overflow: hidden;
  .bpx-docker {
    transform: scale(1.01);
  }
}
.bpx-docker-major {
  height: 100%;
  position: relative;
  width: 100%;
}
.bpx-docker {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-box-sizing: initial;
  box-sizing: initial;
  font-size: 12px;
  font-style: normal;
  line-height: 1;
}
.bpx-player-container.bpx-state-disable-box-shadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.bpx-player-container {
  -webkit-box-shadow: 0 0 8px #e5e9ef;
  box-shadow: 0 0 8px #e5e9ef;
  -webkit-box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  height: 100%;
  position: relative;
  width: 100%;
}
.bpx-player-primary-area {
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
.bpx-player-video-area {
  -webkit-box-flex: 1;
  background-color: #000;
  background-color: var(--bpx-video-bgcolor, #000);
  -ms-flex: 1;
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.bpx-player-video-perch {
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
.bpx-player-video-wrap {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.bpx-player-video-wrap video {
  content-visibility: visible;
  display: block;
  height: 100%;
  margin: auto;
  width: 100%;
}
.bpx-player-video-poster[hidden] {
  display: none;
}
.bpx-player-visual-wrap {
  pointer-events: none;
  visibility: hidden;
  width: 100%;
  .bpx-player-visual-pixel {
    background: rgba(0, 0, 0, 0.1);
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 1px;
  }
}
.bpx-player-render-dm-wrap {
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

.bpx-player-adv-dm-wrap,
.bpx-player-bas-dm-wrap,
.bpx-player-row-dm-wrap {
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
.bili-danmaku-x-dm-rotate {
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
.bpx-player-cmd-dm-wrap,
.bpx-player-cmd-dm-wrap .bpx-player-cmd-dm-inside {
  height: 100%;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
}
.bpx-player-cmd-dm-wrap .bpx-player-cmd-dm-inside {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 9.5952024%;
  position: relative;
  z-index: 10;
}
</style>
