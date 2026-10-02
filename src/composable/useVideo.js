import { ref, computed } from 'vue'
/**
 *
 * @param {video的DOM} videoRef  
 * @param {播放状态} isPause
 * @returns
 */
export function useVideo(videoRef, isPause, options = {}) {
  // =========================
  // 播放状态
  // =========================
  // 播放容器
  const { playerRef } = options
  // 当前播放时间
  const currentTime = ref(0)

  // 视频总时长
  const duration = ref(0)

  // 当前播放进度 0 ~ 1
  const currentProgress = computed(() => {
    if (!duration.value) {
      return 0
    }

    return currentTime.value / duration.value
  })

  // 缓存进度 0 ~ 1
  const bufferProgress = ref(0)

  // =========================
  // 播放
  // =========================

  const play = async () => {
    const video = videoRef.value

    if (!video) {
      return
    }

    try {
      await video.play()
      isPause.value = false
    } catch (error) {
      console.error('视频播放失败:', error)
    }
  }
  const autoPlay = async () => {
    const video = videoRef.value

    if (!video) {
      return
    }

    video.muted = true
    try {
      await video.play()
    } catch (error) {
      if (error.name === 'AbortError') {
        // 播放请求被中断，不需要当成真正的错误
        return
      }

      if (error.name === 'NotAllowedError') {
        console.log('浏览器禁止自动播放')
        return
      }

      console.error('视频播放失败:', error)
    }
  }

  // =========================
  // 暂停
  // =========================

  const pause = () => {
    const video = videoRef.value

    if (!video) {
      return
    }

    video.pause()

    isPause.value = true
  }

  // =========================
  // 播放 / 暂停
  // =========================

  const togglePlay = () => {
    if (!isPause.value) {
      pause()
    } else {
      play()
    }
  }

  // =========================
  // 更新时间
  // =========================

  const updateTime = () => {
    const video = videoRef.value

    if (!video) {
      return
    }

    currentTime.value = video.currentTime
  }

  // =========================
  // 获取视频时长
  // =========================

  const updateDuration = () => {
    const video = videoRef.value

    if (!video) {
      return
    }

    duration.value = video.duration
  }

  // =========================
  // 更新缓存进度
  // =========================

  const updateBuffer = () => {
    const video = videoRef.value

    if (!video || !Number.isFinite(video.duration) || video.buffered.length === 0) {
      return
    }

    const end = video.buffered.end(video.buffered.length - 1)

    bufferProgress.value = Math.min(end / video.duration, 1)
  }

  // =========================
  // 跳转
  // =========================

  const seek = (time) => {
    const video = videoRef.value
    if (!video) {
      return
    }

    video.currentTime = time
  }

  // =========================
  // 按进度跳转
  // progress: 0 ~ 1
  // =========================

  const seekByProgress = (progress) => {
    const video = videoRef.value

    if (!video || !Number.isFinite(video.duration)) {
      return
    }

    video.currentTime = progress * video.duration
  }

  // =========================
  // 设置音量
  // =========================
  const volume = ref(1)
  const setVolume = (value) => {
    const video = videoRef.value

    if (!video) {
      return
    }

    video.volume = Math.max(0, Math.min(value, 1))
    volume.value = video.volume
  }

  // =========================
  // 静音
  // =========================

  const setMuted = (muted) => {
    const video = videoRef.value

    if (!video) {
      return
    }

    video.muted = muted
  }
  // ======================================
  // 倍速
  // ======================================
  const setPlaybackRate = (rate) => {
    const video = videoRef.value
    if (!video) return

    video.playbackRate = rate
  }
  // =====================================
  // 单集循环
  // =====================================
  const setPlayLoop = (value) => {
    const video = videoRef.value
    if (!video) return
    video.loop = value
  }
  // =====================================
  // 画中画 宽屏模式 网页全屏 全屏
  // ====================================
  // 画中画
  async function togglePictureInPicture() {
    const video = videoRef.value
    if (!video) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      console.error('画中画失败:', error)
    }
  }
  // 宽屏模式
  const isWideScreen = ref(false)
  function toggleWideScreen() {
    isWideScreen.value = !isWideScreen.value
  }
  // 网页全屏
  const isWebFullScreen = ref(false)

  function toggleWebFullScreen() {
    isWebFullScreen.value = !isWebFullScreen.value
  }
  // 全屏模式
  async function toggleFullScreen() {
    const player = playerRef.value

    if (!player) return

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await player.requestFullscreen()
      }
    } catch (error) {
      console.error('全屏失败:', error)
    }
  }
  return {
    currentTime,
    duration,

    currentProgress,
    bufferProgress,

    play,
    autoPlay,
    pause,
    togglePlay,

    updateTime,
    updateDuration,
    updateBuffer,

    seek,
    seekByProgress,

    setVolume,
    setMuted,
    volume,

    setPlaybackRate,

    setPlayLoop,
    // 画中画/宽屏模式/全屏模式/网页全屏
    togglePictureInPicture,
    toggleWideScreen,
    toggleWebFullScreen,
    toggleFullScreen,
    isWideScreen,
    isWebFullScreen,
  }
}
