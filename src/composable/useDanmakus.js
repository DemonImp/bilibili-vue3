import { ref, nextTick } from 'vue'

let uid = 0

/**
 * @param videoRef  播放器 <video> 的 ref
 * @param layerRef  弹幕层容器的 ref
 * @param danmakus  全部弹幕数据（按 time 升序）
 */
export function useDanmaku(videoRef, layerRef, danmakus, options = {}) {
  console.log('useDanmaku:', danmakus)
  const speed = options.speed ?? 100 // px/s
  const laneHeight = options.laneHeight ?? 30

  const items = ref([]) // 当前屏幕上的弹幕（响应式）
  const isPause = ref(false) // 对应你模板里的 danmask-x-paused

  let ptr = 0 // 发射指针
  let laneFreeAt = [] // 每条泳道可再次使用的时刻(video.currentTime)
  let lastTime = 0
  let rafId = 0
  const laneCount = () => {
    console.log('layerRef', layerRef.value, ' clientHeight:', layerRef.value.clientHeight)
    return Math.floor(layerRef.value.clientHeight / laneHeight)
  }
  function pickLane(now) {
    for (let i = 0; i < laneCount(); i++) {
      if ((laneFreeAt[i] ?? 0) <= now) return i
    }
    return -1 // 泳道全满，丢弃
  }

  async function spawn(dm) {
    const video = videoRef.value
    const layer = layerRef.value
    const lane = pickLane(video.currentTime)
    if (lane === -1) return
    console.log('dm:', dm)
    const item = {
      id: ++uid,
      text: dm.text,
      show: false,
      vars: {
        '--opacity': 1,
        '--fontSize': '25px',
        '--fontWeight': 'bold',
        '--color': dm.color || '#ffffff',
        '--textShadow': '1px 0 1px #000,0 1px 1px #000,0 -1px 1px #000,-1px 0 1px #000',
        '--top': lane * laneHeight + 'px',
        '--duration': '0s', // 占位，量完宽度再填
        '--offset': '0px',
        '--translateX': '0px',
        '--translateY': '4px',
      },
    }
    items.value.push(item)
    await nextTick()
    console.log('item.id:', item.id)
    const el = layer.querySelector(`[data-dm-id="${item.id}"]`)
    if (!el) return

    const w = el.offsetWidth
    const cw = layer.clientWidth
    // console.log('w:', w, 'cw:', cw)
    item.vars['--offset'] = cw + 'px'
    item.vars['--translateX'] = -(cw + w) + 'px'
    item.vars['--duration'] = (cw + w) / speed + 's'
    laneFreeAt[lane] = video.currentTime + w / speed
    console.log('item:', item)
    // 入场淡入：下一帧再加 show class，配合 transition 有淡入效果
    requestAnimationFrame(() => (item.show = true))
  }

  function remove(id) {
    // ★ 删除时机①：动画播完
    items.value = items.value.filter((it) => it.id !== id)
  }

  function clearAll() {
    // ★ 删除时机②：seek
    items.value = []
    laneFreeAt = []
  }

  function loop() {
    const video = videoRef.value
    const t = video.currentTime
    if (!video.paused && !video.seeking) {
      // seek 检测：回跳，或一次性前进超过 1 秒
      if (t < lastTime || t - lastTime > 1) {
        clearAll()
        ptr = danmakus.findIndex((d) => d.time >= t)
        if (ptr === -1) ptr = danmakus.length
      }
      // ★ 发射时机：到点即发
      while (ptr < danmakus.length && danmakus[ptr].time <= t) {
        spawn(danmakus[ptr++])
      }
      isPause.value = false // 恢复弹幕动画
    } else {
      isPause.value = true // 冻结弹幕动画
    }

    lastTime = t
    rafId = requestAnimationFrame(loop)
  }

  function start() {
    videoRef.value?.addEventListener('play', () => (isPause.value = false))
    videoRef.value?.addEventListener('pause', () => (isPause.value = true))
    rafId = requestAnimationFrame(loop)
  }

  function destroy() {
    cancelAnimationFrame(rafId)
  }

  return { items, isPause, remove, start, destroy }
}
