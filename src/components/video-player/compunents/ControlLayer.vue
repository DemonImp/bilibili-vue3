<script setup>
import { ref, nextTick } from 'vue'
import { ElTooltip } from 'element-plus'
const stateActive = ref(false)
// 清晰度
const playerCtrlQuality = ref('360p 畅享')
// 倍速
const playBackRate = ref([2.0, 1.5, 1.25, 1.0, 0.75, 0.5])
async function updateRate(newRate) {
  rate.value = newRate
  await nextTick()
  emit('setPlaybackRate', rate.value)
}
const rate = ref(1.0)
//获取宽度以及视频播放进度，根据进度来算出progress
const props = defineProps({
  // 是否悬浮
  isHover: {
    type: Boolean,
    default: false,
  },
  // 音量
  volume: {
    type: Number,
    default: 1,
  },
  // 获取当前播放事件，总时间，以及缓存进度
  currentTime: {
    type: Number,
    default: 0,
  },
  // 时长
  duration: {
    type: Number,
    default: 0,
  },
  // 缓存
  buffer: {
    type: Number,
    default: 0,
  },
  // 暂停
  isPause: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits([
  'togglePlay',
  'seek',
  'setPlaybackRate',
  'setVolume',
  'setMirror',
  'setPlayLoop',
  'togglePictureInPicture',
  'toggleWideScreen',
  'toggleWebFullScreen',
  'toggleFullScreen',
])
//格式转化
function formatTime(seconds) {
  seconds = Math.floor(seconds || 0)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
// 输入播放时间
const isFocus = ref(false)
const inputRef = ref(null)
const inputSeekTime = ref(0)
async function showInput() {
  isFocus.value = true
  inputSeekTime.value = formatTime(props.currentTime)
  await nextTick()

  inputRef.value?.focus()
}
//将时间转化为秒,00:00:00、00:00、00
function timeToSeconds(time) {
  isFocus.value = false
  const parts = String(time).trim().split(':').map(Number)

  if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts
    return hours * 3600 + minutes * 60 + seconds
  }

  if (parts.length === 2) {
    // MM:SS
    const [minutes, seconds] = parts
    return minutes * 60 + seconds
  }

  if (parts.length === 1) {
    // SS
    return parts[0]
  }

  return 0
}
// 时间跳转
function handleTimeBlur() {
  const value = inputSeekTime.value
  const seconds = timeToSeconds(value)
  emit('seek', seconds)
  isFocus.value = false
}
// 鼠标点击跳转
// 预览的时间
const previewPosition = ref(0)
const previewTime = ref(0)
function handleProgressMouseMove(event) {
  const rect = event.currentTarget.getBoundingClientRect()

  // 鼠标距离进度条左侧的距离
  const offsetX = event.clientX - rect.left

  // 计算百分比
  const progress = Math.max(0, Math.min(1, offsetX / rect.width))
  previewPosition.value = offsetX - 80
  // 计算对应的视频时间
  const time = progress * props.duration

  // previewPosition.value = progress * 100
  previewTime.value = Math.floor(time)
  // 根据时间获取对应图片
}

function handleProgressMouseLeave() {
  // showPreview.value = false
}
// 音量
const handleVolumeClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  console.log('volumeClick')
  // 鼠标距离轨道顶部的距离
  const y = event.clientY - rect.top

  // 转换成 0 ~ 1
  const value = 1 - y / rect.height
  emit('setVolume', value)
}
// 设置
const settings = ref([
  {
    id: 'mirror',
    className: 'mirror',
    labelName: '镜像画面',
    checked: false,
  },
  {
    id: 'loop',
    className: 'loop',
    labelName: '单集循环',
    checked: false,
  },
  {
    id: 'autoplay',
    className: 'autoplay',
    labelName: '自动开播',
    checked: true,
  },
])
const ClickSetting = (item) => {
  console.log(item)
  item.checked = !item.checked
  if (item.id === 'mirror') emit('setMirror')
  else {
    if (item.id === 'loop') emit('setPlayLoop', item.checked)
  }
}
// 画中画,宽屏,网页全屏,全屏
const otherCtrl = ref([
  { id: 'pip', className: 'pip', ariaLabel: '画中画', iconFont: 'icon-huazhonghua' },
  { id: 'wide', className: 'wide', ariaLabel: '宽屏模式', iconFont: 'icon-kuanpingmoshi' },
  { id: 'web', className: 'web', ariaLabel: '网页全屏', iconFont: 'icon-wangyequanping' },
  { id: 'full', className: 'full', ariaLabel: '进入全屏', iconFont: 'icon-FullScreen' },
])
const otherCtrlClick = (item) => {
  // 根据标签名执行不同的函数
  if (item.id === 'pip') {
    // 画中画
    console.log('画中画')
    emit('togglePictureInPicture')
  } else if (item.id === 'wide') {
    // 宽屏模式
    emit('toggleWideScreen')
  } else if (item.id === 'web') {
    // 网页全屏模式
    emit('toggleWebFullScreen')
  } else if (item.id === 'full') {
    // 进入全屏
    emit('toggleFullScreen')
  }
}
</script>
<template>
  <div class="control-wrap">
    <div class="player-control-mask"></div>
    <!-- 控制实体 -->
    <div class="player-control-entity" :data-shadow-show="!isHover">
      <div class="player-control-top">
        <div
          class="player-progress-area"
          @mouseenter="stateActive = true"
          @mouseleave="stateActive = false"
        >
          <div class="player-progress-freezone"></div>
          <!-- 悬浮显示 -->
          <div class="player-progress-wrap" :class="{ 'state-active': stateActive }">
            <!-- 进度条 -->
            <div class="player-progress" style="height: 4px" ref="progressRef">
              <!-- 分段模块 -->
              <div
                class="player-progress-schedule-wrap"
                @mousemove="handleProgressMouseMove"
                @mouseleave="handleProgressMouseLeave"
                @click="emit('seek', previewTime)"
              >
                <!-- 视频分段章节，如果没有章节只会显示一个 -->
                <div
                  class="player-progress-schedule player-progress-schedule-segment"
                  style="width: 100%; left: 0%"
                >
                  <div class="player-progress-schedule-padding"></div>
                  <!-- 缓存 -->
                  <div
                    class="player-progress-schedule-buffer"
                    :style="{ transform: `scaleX(${buffer})` }"
                  ></div>
                  <!-- 段落播放进度，当前时间比上段落时间 -->
                  <div
                    class="player-progress-schedule-current"
                    :style="{ transform: `scaleX(${currentTime / duration})` }"
                  ></div>
                  <!-- 段落标题文本 -->
                  <div class="player-progress-schedule-text"></div>
                </div>
              </div>
              <!--  -->
              <div class="player-progress-point-wrap"></div>
              <!-- 进度条的蓝色终点图标 -->
              <div
                class="player-progress-thumb"
                :style="{
                  left: `${(currentTime / duration) * 100}%`,
                  position: 'absolute',
                }"
              >
                <svg
                  t="1790617976184"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6459"
                  width="18"
                  height="18"
                  fill="#FFF"
                >
                  <path
                    d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                    p-id="6460"
                    fill="white"
                    stroke="black"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <!-- 预览时间 -->
              <div class="player-progress-popup" :style="{ left: `${previewPosition}px` }">
                <div class="player-progress-preview">
                  <div class="player-progress-preview-time">{{ formatTime(previewTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="player-control-bottom">
        <!-- 分全屏情况下使用style -->
        <div class="player-control-bottom-left" style="flex: 1 1 0%">
          <!-- 上一集 -->
          <div
            class="player-ctrl-btn player-ctrl-btn-prev"
            role="button"
            aria-label="上一个"
            tabindex="0"
          >
            <div class="player-ctrl-btn-icon">
              <span class="common-svg-icon">
                <svg
                  t="1790626434013"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="10146"
                  width="22"
                  height="22"
                >
                  <path
                    d="M364.288 465.621333l323.669333-247.04c38.4-29.312 93.781333-1.92 93.781334 46.421334V759.04c0 48.341333-55.338667 75.733333-93.781334 46.378667l-323.669333-247.04a58.368 58.368 0 0 1 0-92.757334zM238.933333 780.8V287.146667c0-19.626667-5.888-60.501333 17.066667-75.861334a38.4 38.4 0 0 1 59.733333 31.914667v493.696c0 19.626667 5.973333 60.458667-17.024 75.818667a38.4 38.4 0 0 1-59.733333-31.914667z"
                    fill="#ffffff"
                    p-id="10147"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <!-- 播放/暂停 -->
          <div
            class="player-ctrl-btn player-ctrl-play"
            role="button"
            aria-label="播放/暂停"
            tabindex="0"
          >
            <div class="player-ctrl-btn-icon" @click="emit('togglePlay')">
              <span class="common-svg-icon">
                <svg
                  v-if="!isPause"
                  t="1790626861375"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="13497"
                  width="22"
                  height="22"
                >
                  <path
                    d="M259.774512 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566884 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566884 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566883-59.082419V59.082419C299.341395 26.457302 281.623814 0 259.774512 0z m568.20093 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566883 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566883 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566884-59.082419V59.082419C867.542326 26.457302 849.824744 0 827.975442 0z m15.741023 0"
                    p-id="13498"
                    fill="#ffffff"
                  ></path>
                </svg>
                <svg
                  v-if="isPause"
                  t="1790627077570"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="14616"
                  width="22"
                  height="22"
                >
                  <path
                    d="M832.0064 512 192 896 192 128 832.0064 512 832.0064 512zM832.0064 512"
                    fill="#ffffff"
                    p-id="14617"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <!-- 下一集 -->
          <div
            class="player-ctrl-btn player-ctrl-play"
            role="button"
            aria-label="下一集"
            tabindex="0"
          >
            <div class="player-ctrl-btn-icon" @click="emit('togglePlay')">
              <span class="common-svg-icon">
                <svg
                  t="1790627450294"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="15753"
                  width="22"
                  height="22"
                >
                  <path
                    d="M853.333333 204.8h-68.266666c-20.48 0-34.133333 13.653333-34.133334 34.133333v546.133334c0 17.066667 17.066667 34.133333 34.133334 34.133333h68.266666c20.48 0 34.133333-13.653333 34.133334-34.133333V238.933333c0-20.48-17.066667-34.133333-34.133334-34.133333zM614.4 467.626667L256 235.52C208.213333 204.8 170.666667 228.693333 170.666667 283.306667v484.693333c0 58.026667 37.546667 78.506667 85.333333 47.786667l358.4-238.933334c47.786667-30.72 47.786667-78.506667 0-109.226666z"
                    fill="#ffffff"
                    p-id="15754"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <!-- 播放时间 -->
          <div class="player-ctrl-time player-ctrl-btn">
            <!-- 输入要看的时间 -->
            <input
              class="player-ctrl-time-seek"
              ref="inputRef"
              v-model="inputSeekTime"
              @blur="handleTimeBlur"
              @keyup.enter="handleTimeBlur"
              v-show="isFocus"
            />
            <!-- 播放时间 -->
            <div class="player-ctrl-time-label" v-show="!isFocus" @click="showInput">
              <span class="player-ctrl-time-current">{{ formatTime(currentTime) }}</span>
              <span class="player-ctrl-time-divide">/</span>
              <span class="player-ctrl-time-duration">{{ formatTime(duration) }}</span>
            </div>
          </div>
        </div>
        <div class="player-control-bottom-center"></div>
        <div class="player-control-bottom-right">
          <!-- 分辨率 -->
          <div
            class="player-ctrl-btn player-ctrl-quality"
            role="button"
            aria-label="清晰度"
            tabindex="0"
          >
            <div class="player-ctrl-quality-result">{{ playerCtrlQuality }}</div>
            <div class="player-ctrl-quality-menu-wrap">
              <ul class="player-ctrl-quality-menu">
                <li class="player-ctrl-quality-menu">
                  <span class="player-ctrl-quality-text">1080P 高码率</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 倍速 -->
          <div
            class="player-ctrl-playbackrate player-ctrl-btn"
            role="button"
            aria-label="倍速"
            tabindex="0"
          >
            <div class="player-ctrl-playbackrate-result">倍速</div>
            <ul class="player-ctrl-playbackrate-menu">
              <li
                class="player-ctrl-playbackrate-menu-item"
                v-for="item in playBackRate"
                :key="item"
                :value="item"
                :class="{ 'state-active': item === rate }"
                @click="updateRate(item)"
              >
                {{ item }}x
              </li>
            </ul>
          </div>
          <!-- 音量 -->
          <div
            class="player-ctrl-volume player-ctrl-btn"
            role="button"
            aria-label="音量"
            tabindex="0"
          >
            <div class="player-ctrl-btn-icon player-ctrl-volume-icon">
              <span class="common-svg-icon">
                <svg
                  t="1790655729799"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="17701"
                  width="8"
                  height="8"
                >
                  <path
                    d="M596 139c16.71 16.242 26 38.634 26 62v624c0 48.608-39.423 88-88 88-23.423 0-45.833-9.282-62-26L312.059 727.059A48 48 0 0 0 278.118 713H216c-70.657 0.295-128-57.003-128-128V441c0-70.338 57.343-127.636 128-128h61.198a48 48 0 0 0 33.844-13.962L472 139c34.021-34.576 89.774-34.604 124 0z m219.153 132.989C883.63 332.312 924 422.217 924 518.999c0 96.784-40.37 186.689-108.847 247.012-13.262 11.683-33.482 10.403-45.165-2.859-11.682-13.261-10.402-33.482 2.86-45.164C827.493 669.849 860 597.455 860 519s-32.507-150.85-87.152-198.988c-13.262-11.682-14.542-31.903-2.86-45.164 11.683-13.262 31.903-14.542 45.165-2.86z m-95.508 93.39C760.867 403.048 785 458.494 785 517.973c0 59.513-24.161 114.988-65.425 152.659-13.052 11.915-33.292 10.994-45.208-2.058-11.796-12.922-11.011-32.888 1.67-44.848l0.388-0.36 0.834-0.768C704.657 597.13 721 559.193 721 517.974c0-41.613-16.656-79.88-44.53-105.352-13.045-11.922-13.956-32.163-2.034-45.209 11.922-13.046 32.163-13.957 45.209-2.035z"
                    fill="#ffffff"
                    p-id="17702"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="player-ctrl-volume-box">
              <div class="player-ctrl-volume-number">{{ Math.round(volume * 100) }}</div>
              <div class="player-ctrl-volume-progress bui bui-slider">
                <div class="bui-area" @click="handleVolumeClick">
                  <div class="bui-track bui-track-vertical" style="">
                    <div class="bui-bar-wrap">
                      <div
                        class="bui-bar bui-bar-normal"
                        role="progressbar"
                        :style="{ transform: `scaleY(${volume})` }"
                      ></div>
                    </div>

                    <div
                      class="bui-thumb"
                      :style="{ left: '-5px', transform: `translateY(${-1 * volume * 48}px)` }"
                    >
                      <div class="bui-thumb-dot" style=""></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 设置 ,还没绑定事件-->
          <div
            class="player-ctrl-setting player-ctrl-btn"
            role="button"
            aria-label="设置"
            tabindex="0"
          >
            <div class="player-ctrl-btn-icon">
              <span class="common-svg-icon">
                <svg
                  t="1790710476334"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="18841"
                  width="22"
                  height="22"
                >
                  <path
                    d="M890.53893 559.569946c2.114575-16.294021 3.482653-32.587042 3.482653-49.999309 0-17.288351-1.61691-33.582371-3.482653-49.999309l107.461589-84.078346c9.701463-7.587887 12.313703-21.393584 6.094893-32.588041l-101.864361-176.241244c-6.094893-11.192458-19.90059-15.297692-31.094048-11.192458l-126.864515 50.993639c-26.492149-20.397256-55.098873-37.187942-86.068005-49.999309L638.801558 21.392585C637.185646 9.079882 626.612771 0 613.802403 0H409.948765c-12.686452 0-23.384243 9.203798-25.000154 21.392585l-19.402926 135.072984c-31.094048 12.686452-59.575856 30.099718-86.068005 49.999309l-126.864515-50.994638c-11.815039-4.601899-24.999155 0-31.094048 11.194457L19.655755 342.90594c-6.715475 11.193458-3.481654 24.999155 6.094893 32.587042l107.46159 84.078346c-2.114575 16.293021-3.482653 33.083707-3.482653 49.999309 0 16.914602 1.61691 33.581372 3.482653 49.999309L25.626732 643.648292C15.92427 651.235179 13.313029 665.040877 19.531839 676.234334l101.864361 176.241244c6.093894 11.194457 19.90059 15.298691 31.094048 11.194457l126.864515-50.995638c26.492149 20.398255 55.097874 37.18994 86.068005 50.000309l19.401926 135.072984c1.61691 12.188787 12.189786 21.392585 25.000154 21.392585h203.852639c12.686452 0 23.383244-9.203798 25.000154-21.392585l19.401926-135.072984c31.094048-12.686452 59.576855-30.099718 86.069005-49.99931l126.864515 50.994639c11.815039 4.601899 24.999155 0 31.093049-11.194457L1003.970496 676.234334c6.094893-11.193458 3.482653-24.999155-6.093893-32.586042l-107.337673-84.078346zM511.938042 688.050372c-98.381708 0-178.355819-79.974111-178.355819-178.355819s79.974111-178.355819 178.355819-178.355818S690.293861 411.312846 690.293861 509.694553s-79.974111 178.355819-178.355819 178.355819z m0 0"
                    fill="#ffffff"
                    p-id="18842"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="player-ctrl-setting-box">
              <div class="player-ctrl-btn-setting-menu bui bui-panel bui-dark">
                <div class="bui-area">
                  <div class="bui-panel-wrap" style="width: 132px; height: 140px">
                    <div class="bui-panel-move" style="width: 418px">
                      <div class="bui-panel-item bui-panel-item-active">
                        <div class="player-ctrl-setting-menu-left">
                          <div
                            class="bui bui-switch"
                            v-for="item in settings"
                            :key="item.id"
                            :class="`player-ctrl-setting-${item.className}`"
                          >
                            <div class="bui-area">
                              <input
                                class="bui-switch-input"
                                type="checkbox"
                                :aria-label="item.labelName"
                                v-model="item.checked"
                                @click="ClickSetting(item)"
                              />
                              <label class="bui-switch-label">
                                <span class="bui-switch-name">{{ item.labelName }}</span>
                                <span class="bui-switch-body">
                                  <span class="bui-switch-dot">
                                    <span></span>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div class="player-ctrl-setting-more">
                            <span class="player-ctrl-setting-more-text">更多播放设置</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 画中画,宽屏,网页全屏,全屏 -->
          <div
            class="player-ctrl-btn"
            tabindex="0"
            :aria-label="item.ariaLabel"
            :class="`player-ctrl-setting-${item.className}`"
            v-for="item in otherCtrl"
            :key="item.id"
            @click="otherCtrlClick(item)"
          >
            <el-tooltip effect="dark" placement="top-start" :hide-after="10" :show-arrow="true">
              <template #content
                ><span class="player-tooltip-item">{{ item.ariaLabel }}</span>
              </template>
              <div class="player-ctrl-btn-icon">
                <span class="iconfont icon-font" :class="item.iconFont"></span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
.player-tooltip-item {
  word-wrap: break-word;
  background-color: #000;
  border-radius: 2px;
  color: #fff;
  color: var(--bpx-tooltip-color, #fff);
  font-size: 12px;
  line-height: 1.5;
  padding: 6px 8px;
  width: fit-content;
  word-break: break-all;
}
.icon-font {
  width: 100%;
  height: 100%;
  font-size: 22px;
  vertical-align: top;
}
.control-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 75;
  .player-control-mask {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)
      repeat-x bottom;
    bottom: 0;
    height: 100px;
    left: 0;
    pointer-events: none;
    position: absolute;
    -webkit-transition: opacity 0.2s ease-in-out;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
    z-index: -1;
  }
  .player-control-entity {
    .player-control-top {
      .player-progress-area {
        .player-progress-freezone {
          pointer-events: none;
        }
      }
      .player-progress-wrap {
        -webkit-box-align: end;
        align-items: center;
        display: flex;
        display: -ms-flexbox;
        padding-bottom: 6px;
        .player-progress {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 4px;
          position: relative;
          -webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
          transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
          transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1);
          transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1),
            -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
          width: 100%;
          .player-progress-schedule-wrap {
            height: 100%;
            width: 100%;
            position: absolute;
            .player-progress-schedule {
              background-color: hsla(0, 0%, 100%, 0.2);
              border-radius: 1.5px;
              bottom: 0;
              left: 0;
              // overflow: hidden;
              position: absolute;
              right: 0;
              top: 0;
              .player-progress-schedule-padding {
                bottom: 0;
                height: 14px;
                position: absolute;
                width: 100%;
                z-index: 1;
              }
              .player-progress-schedule-buffer {
                background-color: hsla(0, 0%, 100%, 0.3);
              }
              .player-progress-schedule-current {
                background-color: var(--bpx-primary-color, #00a1d6);
              }
              .player-progress-schedule-buffer,
              .player-progress-schedule-current {
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                -webkit-transform: scaleX(0);
                transform: scaleX(0);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
              }
            }
            .player-progress-schedule-segment {
              border-radius: 0;
              height: 100%;
              -webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
              transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
              transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1);
              transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1),
                -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
              cursor: pointer;
              &:hover {
                -webkit-transform: scaleY(1.8);
                transform: scaleY(1.8);
                // background: pink;
                cursor: pointer;
              }
            }
          }
          .player-progress-point-wrap {
            height: 100%;
            left: 0;
            pointer-events: none;
            position: absolute;
            top: 0;
            width: 100%;
          }
          .player-progress-thumb {
            // background: #f1f2f3;
            height: 20px;
            pointer-events: none;
            width: 20px;
            .player-progress-thumb-icon {
              height: 100%;
              line-height: 12px;
              -webkit-transform: scale(0);
              transform: scale(0);
              -webkit-transition: all 0.2s;
              transition: all 0.2s;
              width: 100%;
            }
          }
          .player-progress-popup {
            background-color: transparent;
            border-radius: 2px;
            bottom: 22px;
            display: none;
            line-height: 36px;
            overflow: hidden;
            pointer-events: none;
            position: absolute;
            width: 160px;
            .player-progress-preview {
              height: 90px;
              position: relative;
              width: 160px;
              .player-progress-preview-time {
                background-color: hsla(0, 0%, 8%, 0.9);
                border-radius: 2px;
                bottom: 0;
                color: #fff;
                display: inline-block;
                font-size: 12px;
                height: 18px;
                left: 50%;
                line-height: 18px;
                padding: 0 5px;
                position: absolute;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                vertical-align: bottom;
              }
            }
          }
        }
      }
      .player-progress-wrap.state-active {
        .player-progress-popup {
          display: block;
        }
      }
    }
    .player-control-bottom {
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      height: 35px;
      justify-content: space-between;
      line-height: 22px;
      margin: 20px 0 0;
      padding: 0 12px;
      -webkit-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
      width: 100%;
      .player-control-bottom-left {
        -webkit-box-flex: 0;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -ms-flex: none;
        flex: none;
      }
      .player-control-bottom-right {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .player-control-entity[data-shadow-show='false'] {
    .player-control-top {
      opacity: 1;
      visibility: visible;
    }
    .player-control-bottom {
      opacity: 1;
      visibility: 0;
    }
  }
  .player-control-entity[data-shadow-show='true'] {
    .player-control-top {
      opacity: 0;
      visibility: hidden;
    }
    .player-control-bottom {
      opacity: 0;
      visibility: hidden;
    }
  }
}
.player-control-top {
  bottom: 44px;
  left: 0;
  padding: 0 12px;
  right: 0;
  opacity: 1;
  -webkit-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
  visibility: visible;
}
.player-ctrl-btn {
  fill: #fff;
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 0;
  height: 22px;
  line-height: 22px;
  outline: 0;
  position: relative;
  text-align: center;
  width: 36px;
  z-index: 2;
}
.player-ctrl-btn-icon {
  cursor: pointer;
  width: 100%;
}
.player-ctrl-prev .player-ctrl-btn-icon {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.common-svg-icon {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
}
.player-ctrl-time {
  font-size: 12px;
  margin-right: 10px;
  min-width: 90px;
}
.player-ctrl-time-seek {
  background: hsla(0, 0%, 100%, 0.2);
  border: 1px solid transparent;
  color: inherit;
  font-size: 12px;
  height: 20px;
  left: 6px;
  line-height: 20px;
  padding: 0 5px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 60px;
}
.player-ctrl-time-label {
  height: 100%;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  width: 100%;
}
.player-ctrl-time {
  font-size: 12px;
  margin-right: 10px;
  min-width: 90px;
}
.player-ctrl-time-divide {
  padding: 0 2px;
}
// 底部控制右侧
.player-ctrl-quality {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  font-size: 12px;
  margin-right: 10px;
  width: auto;
}
.player-ctrl-quality-result {
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}
.player-ctrl-quality-menu-wrap {
  background-color: hsla(0, 0%, 8%, 0.9);
  border-radius: 2px;
  bottom: 41px;
  cursor: pointer;
  left: 50%;
  margin: 0;
  max-height: 580px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
ul {
  list-style: none;
  outline: none;
}
.player-ctrl-quality-menu {
  display: none;
  margin: 0;
  padding: 0;
}
.player-ctrl-quality-menu {
  display: none;
  margin: 0;
  padding: 0;
}
// 分辨率
.player-ctrl-playbackrate {
  font-size: 14px;
  width: 50px;
  &:hover {
    margin-top: -10px;
    padding-top: 10px;
    .player-ctrl-playbackrate-menu {
      display: block;
    }
  }
}
.player-ctrl-playbackrate::after {
  content: '';
  position: absolute;
  bottom: 100%; /* 从容器顶向上延伸 */
  left: 0;
  right: 0;
  height: 20px; /* 覆盖缝隙的高度 */
}

.player-ctrl-playbackrate-result {
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  width: 100%;
}
.player-ctrl-playbackrate-menu {
  background-color: hsla(0, 0%, 8%, 0.9);
  border-radius: 2px;
  bottom: 41px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  opacity: 0.8;
  display: none;
  left: 50%;
  margin: 0;
  padding: 0;
  position: absolute;
  text-align: center;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 70px;
}
.player-ctrl-playbackrate-menu-item {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  position: relative;
  &:hover {
    background: black;
  }
}
.player-ctrl-playbackrate-menu-item.state-active {
  color: #00a1d6;
  color: var(--bpx-primary-color, #00a1d6);
}
// 预览时间
.player-progress-time {
  position: absolute;
  bottom: 12px;
  transform: translateX(-50%);

  padding: 4px 8px;
  border-radius: 4px;

  background: rgba(0, 0, 0, 0.8);
  color: #fff;

  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
// 音量
.player-ctrl-btn-icon {
  cursor: pointer;
  width: 100%;
}
.player-ctrl-btn-icon > .common-svg-icon {
  height: 22px;
  opacity: 0.9;
  vertical-align: middle;
}
.common-svg-icon svg {
  height: 100%;
  -webkit-transition: fill 0.15s ease-in-out;
  transition: fill 0.15s ease-in-out;
  width: 100%;
}
.player-ctrl-btn-icon > .common-svg-icon svg {
  -webkit-transform: none !important;
  transform: none !important;
}
.player-ctrl-volume-box {
  background: hsla(0, 0%, 8%, 0.9);
  border-radius: 2px;
  bottom: 41px;
  display: none;
  height: 100px;
  left: 50%;
  margin-left: -16px;
  position: absolute;
  width: 32px;
}
.player-ctrl-volume {
  &:hover {
    .player-ctrl-volume-box {
      display: block;
    }
  }
}
.player-ctrl-volume-number {
  color: #e5e9ef;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  margin-bottom: 2px;
  text-align: center;
  width: 100%;
}

.player-ctrl-volume::after {
  content: '';
  position: absolute;
  bottom: 100%; /* 从容器顶向上延伸 */
  left: 0;
  right: 0;
  height: 20px; /* 覆盖缝隙的高度 */
}
.player-ctrl-volume-progress {
  height: 60px !important;
  margin: 0 auto;
  .bui-area {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
}

.bui-slider {
  cursor: pointer;
  height: 12px;
  height: var(--bpx-ui-font-size, 12px);
  .bui-track.bui-track-vertical {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    height: 100%;
    width: 2px;
    .bui-bar-wrap .bui-bar {
      background: #00a1d6;
      background: var(--bpx-fn-color, #00a1d6);
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
    }
    .bui-thumb {
      bottom: 0;
      position: relative;
      top: auto;
    }
  }
  .bui-track {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 2px;
    position: relative;
    width: 100%;
    .bui-bar-wrap {
      background: #e7e7e7;
      border-radius: 1.5px;
      bottom: 0;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 0;
      .bui-bar {
        background: #00a1d6;
        background: var(--bpx-fn-color, #00a1d6);
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
    .bui-thumb {
      cursor: pointer;
      .bui-thumb-dot {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #00a1d6;
        background-color: var(--bpx-fn-color, #00a1d6);
        border-radius: 50%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 12px;
        height: var(--bpx-ui-font-size, 12px);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        vertical-align: middle;
        width: 12px;
        width: var(--bpx-ui-font-size, 12px);
      }
    }
  }
}
.bui {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-start;
  vertical-align: middle;
  .bui-area {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    line-height: normal;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    width: 100%;
  }
}
// 设置
.player-ctrl-setting {
  .player-ctrl-setting-box {
    bottom: 41px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    display: none;
    font-size: 12px;
    position: absolute;
    right: -48px;
    text-align: left;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 100%; /* 从容器顶向上延伸 */
    left: 0;
    right: 0;
    height: 20px; /* 覆盖缝隙的高度 */
  }
  &:hover {
    margin-top: -10px;
    padding-top: 10px;
    .player-ctrl-setting-box {
      display: block;
    }
  }
}
.bui-panel.bui-dark {
  background: hsla(0, 0%, 8%, 0.9);
  border: none;
}
.player-ctrl-setting-menu {
  border-radius: 2px !important;
}
.bui-panel {
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  .bui-panel-wrap {
    position: relative;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
  }
  .bui-panel-move {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  }
  .bui-panel-item {
    opacity: 0;
    pointer-events: none;
    -webkit-transition: opacity 0.1s;
    transition: opacity 0.1s;
  }
  .bui-panel-item.bui-panel-item-active {
    opacity: 1;
    pointer-events: auto;
  }
}
.bui-panel .bui-panel-item,
.bui-panel .bui-panel-move {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.player-ctrl-setting-menu-left {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 6px 20px;
  width: 100%;
}
.bui-switch {
  cursor: pointer;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  position: relative;
}
.player-ctrl-setting-autoplay,
.player-ctrl-setting-list-loop,
.player-ctrl-setting-loop,
.player-ctrl-setting-mirror,
.player-ctrl-setting-more,
.player-ctrl-setting-oped {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 32px;
  line-height: 32px;
  width: 100%;
}
.player-ctrl-setting-more {
  cursor: pointer;
  position: relative;
  -webkit-transition: color 0.15s ease-in-out;
  transition: color 0.15s ease-in-out;
}
.bui-switch .bui-switch-input {
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.bui-switch .bui-switch-label {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  width: 100%;
}
.bui-switch {
  &:hover {
    color: #00a1d6;
  }
  .bui-switch-name {
    position: relative;
  }
}

.bui-switch .bui-switch-body,
.bui-switch .bui-switch-dot {
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.bui-switch .bui-switch-body {
  background: #757575;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 20px;
  outline: none;
  vertical-align: middle;
  width: 30px;
}
.bui-switch .bui-switch-dot {
  fill: #757575;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100%;
  -webkit-box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  color: #757575;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 16px;
  justify-content: center;
  left: 2px;
  line-height: 16px;
  text-align: center;
  top: 2px;
  width: 16px;
}
.bui-switch-input:checked + .bui-switch-label .bui-switch-body {
  background: #5886c7 !important;
}
.bui-switch-input:checked + .bui-switch-label .bui-switch-dot {
  transform: translateX(10px) !important;
}
</style>