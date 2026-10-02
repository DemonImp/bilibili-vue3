<script setup>
import { ref } from 'vue'
const props = defineProps({
  items: { type: Array, default: () => [] },
  isPause: { type: Boolean, default: false },
})
console.log(props.items)
const emit = defineEmits(['remove'])
</script>
<template>
  <div class="player-render-dm-wrap">
    <!-- 弹幕的图标 -->
    <div class="bpx-player-dm-svg-mask-wrap" style="opacity: 0; visibility: hidden"></div>
    <!-- 弹幕容器-->
    <div class="player-dm-mask-wrap">
      <!-- 高级弹幕 -->
      <div class="player-adv-dm-wrap">
        <!-- 弹幕区域 -->
        <div
          class="player-row-dm-wrap"
          :class="{ 'danmaku-x-paused': isPause }"
          style="contain: paint"
        ></div>
      </div>
    </div>
    <div class="player-bas-dm-wrap"></div>
    <div class="player-row-dm-wrap" :class="{ 'danmaku-x-paused': isPause }" style="contain: ">
      <div class="danmaku-x-dm-rotate"></div>
      <!-- 弹幕的区域 -->
      <div
        v-for="it in items"
        :key="it.id"
        :data-dm-id="it.id"
        :style="
          it.vars
          // top: it.top + 'px',
          // color: it.color,
          // animationDuration: it.duration + 's',
        "
        aria-live="polite"
        role="comment"
        class="danmaku-x-dm"
        :class="{ 'danmaku-x-center': false, 'danmaku-x-show': it.show }"
        @animationend="emit('remove', it.id)"
      >
        {{ it.text }}
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
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
  opacity: var(--opacity, 1);
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;
}
.danmaku-x-paused {
  .danmaku-x-dm {
    -webkit-animation-play-state: paused !important;
    animation-play-state: paused !important;
  }
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
  color: var(--color, #ffffff);
  text-shadow: var(--textShadow, 1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000, -1px 0 1px #000);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top: var(--top, 0);
  opacity: 0;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  left: -10px;
  will-change: transform, opacity, top, left;
  left: var(--offset, -10px);
  z-index: 200;
  z-index: var(--zIndex, 200);
  display: var(--display, flex);
}
.danmaku-x-dm.danmaku-x-show {
  -webkit-animation: roll linear var(--duration) forwards;
  animation: roll linear var(--duration) forwards;
  // -webkit-animation: roll linear 10s forwards;
  // animation: roll linear 10s forwards;
  &:hover {
    -webkit-animation-play-state: paused !important;
    animation-play-state: paused !important;
  }
}
@keyframes roll {
  from {
    left: var(--offset, -10px);
  }
  to {
    left: calc(-1 * var(--offset, -10px));
  }
}
</style>