<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  video: {
    type: Object,
    reqire: true,
  },
  playing: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['preview-start', 'preview-stop'])
const videoRef = ref(null)
const videoPlayTime = ref(0)
const handleTimeUpdate = () => {
  if (videoRef.value) {
    videoPlayTime.value = videoRef.value.currentTime
  }
}
const handleMouseEnter = async () => {
  // playing.value = true
  emit('preview-start', props.video.id)
  await nextTick()
  if (videoRef.value) {
    videoRef.value.currentTime = props.video?.playSeekTime ?? 0
    try {
      await videoRef.value.play()
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('自动播放失败：', error)
      }
    }
  }
}
const handleMouseLeave = () => {
  // playing.value = false
  if (videoRef.value) {
    videoRef.value.pause()
    props.video.playSeekTime = videoRef.value.currentTime
    videoRef.value.currentTime = 0
  }
  nextTick()
  emit('preview-stop', props.video.id)
}
const formatVideoTime = (videoPlayTime) => {
  const totalSeconds = Math.floor(videoPlayTime)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
</script>
<template>
  <div class="video-card">
    <div class="video-card__entry">
      <!-- 图片部分 ,这里设置了相对定位-->
      <div class="video-card__wrap" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <a class="video-card-image-link">
          <!-- 重新播放 -->
          <div class="video-card__image">
            <!-- 图片 ，绝对定位-->
            <div class="picture">
              <picture class="v-img video-card__cover">
                <source
                  v-for="(item, index) in video.src"
                  :srcset="item.image"
                  :type="item.type"
                  :key="index"
                />
                <img :src="video.img" alt="加载图片失败" />
              </picture>
            </div>
            <!-- <div class="v-inline-play" v-show="true" data-player-seek-time="124"> -->
            <div class="v-inline-play" :class="{ visible: playing }" data-player-seek-time="0">
              <div class="docker docker-major" v-if="playing">
                <div
                  class="player-container state-disable-box-shadow state-no-cursor"
                  data-ctrl-hidden="true"
                  data-screen="normal"
                >
                  <div class="player-primary-area" aria-label="仿造b站播放器">
                    <!-- video区域 -->
                    <div class="player-video-area">
                      <!-- 置顶 -->
                      <div class="player-video-perch">
                        <div class="player-video-wrap">
                          <video
                            ref="videoRef"
                            crossorigin="anonymous"
                            preload="auto"
                            :src="video.previewUrl"
                            muted
                            playsinline
                            @timeupdate="handleTimeUpdate"
                          ></video>
                        </div>
                      </div>
                      <div class="player-video-poster"></div>
                      <div class="player-visual-wrap">
                        <div class="player-visual-pixel"></div>
                      </div>
                      <div class="player-render-dm-wrap">
                        <div class="player-adv-dm-wrap"></div>
                        <div class="player-bas-dm-wrap"></div>
                        <div
                          class="player-row-dm-wrap"
                          :class="{ 'danmaku-x-paused': playing }"
                          style="contain: "
                        >
                          <div class="danmaku-x-dm-rotate"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <VideoPlayer></VideoPlayer> -->
            </div>
            <!-- 视频数据统计 -->
            <div class="video-card__mask">
              <div class="video-card__stats">
                <!-- 播放量 -->
                <div class="video-card__stats--left">
                  <span class="video-card__stats--item">
                    <!-- 图标 -->
                    <span class="icon iconfont icon-bofangliang"></span>
                    <span class="video-card__stats--text">{{ video.stats.playCount }}</span>
                  </span>
                  <!-- 评论数 -->
                  <span class="video-card__stats--item">
                    <!-- 图标 -->
                    <span class="icon iconfont icon-wenbenbiaodan"></span>
                    <span class="video-card__stats--text">{{ video.stats.commentCount }}</span>
                  </span>
                </div>
                <!-- 播放时长 -->
                <span class="video-card__stats--text" v-show="playing"
                  >{{ formatVideoTime(videoPlayTime) }}/</span
                >
                <span class="video-card__stats__duration">{{
                  formatVideoTime(video.stats.duration)
                }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <!-- 文本部分 -->
      <div class="video-card-info">
        <div class="video-card-info-content">
          <div class="video-card-info--no-interest">
            <span class="icon"></span>
          </div>
          <div class="video-card-info-title" :title="video.title">
            <a href="#">{{ video.title }}</a>
          </div>
          <div class="video-card-info-bottom">
            <div class="video-card-info-like" v-if="video.like">{{ video.like }}</div>
            <a class="video-card-info-owner">
              <span class="up-icon iconfont icon-UPzhu"></span>
              <div class="video-card-info-author">author</div>
              <div class="video-card-info-date">· 3天前</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
.video-card {
  --info-margin-top: 10px;
  --title-line-height: 22px;
  --title-padding-right: 30px;
  --title-font-size: 15px;
  --subtitle-line-height: 17px;
  --Or5: #ff661a;
  --Or1: #ffede2;
  --follow-icon-font-size: 12px;
  --follow-icon-line-height: 17px;
  --follow-icon-line-height: 17px;
  --video-card-direction: column;
  --video-card-border-radius: 6px;
  --no-interest-entry-size: 18px;
  --cover-radio: 56.25%;
  --graph_bg_regular: #f1f2f3;
  a:hover {
    cursor: pointer;
    color: var(--brand_blue);
  }
  .video-card__entry {
    display: flex;
    flex-direction: var(--video-card-direction);
    position: relative;
    width: 100%;
    height: 100%;
    .video-card__wrap {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: var(--video-card-border-radius);
      overflow: hidden;
      z-index: 1;
      .video-card-image-link {
        outline: 0;
        text-decoration: none;
        color: inherit;
        display: block;
        height: 100%;
        width: 100%;
        &:hover {
          cursor: pointer;
        }
        .video-card__image {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 1;
          border-radius: 6px;
          .picture {
            padding-top: var(--cover-radio);
            border-radius: inherit;
            background-color: var(--graph_bg_regular);
            cursor: pointer;
            opacity: 1;
            transition: opacity 0.4 linear;
            .v-img {
              position: relative;
              display: inline-flex;
              width: 100%;
              height: 100%;
              background-color: var(--graph_bg_regular);
            }
            .video-card__cover {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              overflow: hidden;
              width: 100%;
              height: 100%;
              border-radius: 6px;
              object-fit: cover;
            }
          }
          &:hover {
            .video-card__stats .video-card__stats--left {
              opacity: 0;
            }
            .picture {
              opacity: 0;
            }
          }
          .video-card__mask {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            opacity: 1;
            transition: all 0.2s linear 0.2s;
            pointer-events: none;
            .video-card__stats {
              position: absolute;
              bottom: 0;
              left: 0;
              padding: 14px 8px 6px;
              border-radius: 0 6px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 15px;
              line-height: 15px;
              font-size: 15px;
              background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
              color: #fff;
              // opacity: 1;
              pointer-events: none;
              transition: all 0.2s linear 0.2s;
              .video-card__stats--left {
                flex: 1;
                display: flex;
                align-items: center;
                transition: opacity 0.4s linear;
                .video-card__stats--item {
                  margin-right: 12px;
                  display: flex;
                  justify-content: center;
                  .video-card__stats--text {
                    word-break: keep-all;
                  }
                  .icon {
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    font-size: 18px;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .v-inline-play {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          // background: skyblue;
          pointer-events: none;
          user-select: none;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.2s linear;
          overflow: hidden;
          video {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            content-visibility: visible;
            object-fit: cover;
          }
          .docker {
            transform: scale(1.01);
          }
        }
        .v-inline-play.visible {
          opacity: 1;
        }
      }
    }
  }
  .video-card-info {
    display: flex;
    margin-top: var(--info-margin-top);
    min-height: calc(var(--line_light) * 2 + var(--info-margin-top)+ 4px);
    .video-card-info-content {
      flex: 1;
      position: relative;
      .video-card-info-title {
        padding-right: var(--title-padding-right);
        color: var(--text1);
        font-size: var(--title-font-size);
        line-height: var(--title-line-height);
        height: calc(2 * var(--title-line-height));
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        word-break: break-word !important;
        word-break: break-all;
        line-break: anywhere;
        -webkit-line-clamp: 2;
        a {
          // cursor: pointer;
          color: var(--text1);
          transition: color 0.2s linear;
          font-weight: 500;
          &:hover {
            color: var(--brand_blue);
          }
        }
      }
      .video-card-info-bottom {
        margin-top: 4px;
        color: var(--text3);
        font-size: var(--subtitle-font-size);
        display: flex;
        align-items: center;
        .video-card-info-like {
          flex-shrink: 0;
          display: inline-block;
          color: var(--Or5);
          background-color: var(--Or1);
          border-radius: 4px;
          margin-right: 4px;
          font-size: var(--follow-icon-font-size);
          line-height: var(--follow-icon-line-height);
          height: var(--follow-icon-line-height);
          padding: 0 4px;
          cursor: default;
        }
        .video-card-info-owner {
          cursor: pointer;
          transition: color 0.2s linear;
          display: inline-flex;
          align-items: center;
          color: #9499a0;
          .up-icon {
            margin-right: 2px;
            width: 17px;
            height: 17px;
            line-height: 17px;
            font-size: 17px;
          }
          .video-card-info-author {
            flex: 1;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            word-break: break-word !important;
            word-break: break-all;
            line-break: anywhere;
            -webkit-line-clamp: 1;
            line-height: var(--subtitle-line-height);
          }
          .video-card-info-date {
            margin-left: 4px;
            line-height: var(--subtitle-line-height);
          }
        }
      }
    }
  }
  .video-card-info--no-interest {
    position: absolute;
    top: calc((var(--title-line-height) - var(--no-interest-entry-size)) / 2);
    right: 0;
    color: var(--text2);
    border-radius: 4px;
    display: none;
    .icon {
      width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 24px;
    }
  }
  &:hover .video-card__info--no-interest {
    display: flex;
  }
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
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
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
</style>
