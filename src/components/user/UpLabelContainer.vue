<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { ElPopover } from 'element-plus'
import UserInfoCard from './UserInfoCard.vue'
import Avatar from './Avatar.vue'
const avatarUrl = ref('https://empty')
const { userInfo } = storeToRefs(useUserStore())
</script>
<template>
  <div class="up-label-container">
    <div class="up-info-container">
      <!-- 头像 -->
      <div class="up-info-left">
        <!-- 弹出框 -->
        <el-popover
          :popper-style="{ width: '366px', margin: 0, padding: 0, 'border-radius': '8px' }"
          :show-arrow="false"
        >
          <template #default>
            <UserInfoCard></UserInfoCard>
          </template>
          <template #reference>
            <Avatar :size="48" :avatarUrl="avatarUrl"></Avatar>
          </template>
        </el-popover>
      </div>
      <div class="up-info-right">
        <div class="up-detail">
          <div class="up-detail-top">
            <!-- 弹出框 -->
            <el-popover
              :popper-style="{ width: '366px', margin: 0, padding: 0, 'border-radius': '8px' }"
              :show-arrow="false"
            >
              <template #default>
                <UserInfoCard></UserInfoCard>
              </template>
              <template #reference>
                <router-link to="#" class="up-name" style="color: #fb7299">{{
                  userInfo.name
                }}</router-link>
              </template>
            </el-popover>

            <router-link to="#">
              <span class="iconfont icon-xiaoxi icon-font"> </span>
              <span>发送消息</span>
            </router-link>
          </div>
          <div class="up-description" :title="userInfo.sign">{{ userInfo.sign }}</div>
        </div>
        <div class="up-info__btn-panel">
          <div class="up-info-btn-panel">
            <div class="default-btn new-charge-btn charge-btn-loaded">
              <svg
                t="1790895855529"
                class="flash"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3416"
                width="20"
                height="20"
              >
                <path
                  d="M395.765333 586.570667h-171.733333c-22.421333 0-37.888-22.442667-29.909333-43.381334L364.768 95.274667A32 32 0 0 1 394.666667 74.666667h287.957333c22.72 0 38.208 23.018667 29.632 44.064l-99.36 243.882666h187.050667c27.509333 0 42.186667 32.426667 24.042666 53.098667l-458.602666 522.56c-22.293333 25.408-63.626667 3.392-54.976-29.28l85.354666-322.421333z"
                  fill="#ff6699"
                  p-id="3417"
                ></path>
              </svg>
              <span>充电</span>
            </div>
            <div class="default-btn follow-btn b-gz not-follow">
              <span class="follow-btn-inner">
                <svg
                  t="1790898334436"
                  class="follow-btn-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4863"
                  width="16"
                  height="16"
                >
                  <path
                    d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"
                    fill="#ffffff"
                    p-id="4864"
                  ></path>
                </svg>
                {{
                  userInfo.follower < 10000
                    ? userInfo.follower
                    : (userInfo.follower / 10000).toFixed(1) + '万'
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-pob-above-modules">
      <div class="video-pob-above-modules__inner"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
.icon-font {
  width: 14px;
  font-size: 14px;
  line-height: 14px;
  fill: #18191c;
  height: 14px;
}
.up-label-container {
  --text1: #18191c;
  --text3: #9499a0;
  --text_white: #ffffff;
  --brand_pink: #ff6699;
  --brand_pink_think: #ffecf1;
  --graph_weak: #c9cccd;
  pointer-events: all;
  .up-info-container {
    box-sizing: border-box;
    height: 104px;
    display: flex;
    align-items: center;
    .up-info-left {
      :deep(.up-info-avatar) {
        width: 48px;
        height: 48px;
      }
    }
    .up-info-right {
      margin-left: 12px;
      flex: 1;
      overflow: auto;
      .up-detail {
        margin-bottom: 5px;
        .up-detail-top {
          display: flex;
          align-items: center;
          .up-name {
            font-size: 15px;
            color: var(--text1);
            font-weight: 500;
            position: relative;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 12px;
            max-width: calc(100% - 12px - 56px);
          }
          a {
            color: inherit;
            text-decoration: none;
            &:hover {
              color: var(--brand_blue);
            }
          }
        }
        .up-description {
          margin-top: 2px;
          font-size: 13px;
          line-height: 16px;
          height: 16px;
          color: var(--text3);
          color: var(--text3);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .up-info__btn-panel {
        .up-info-btn-panel {
          clear: both;
          display: flex;
          white-space: nowrap;
          margin-top: 5px;
          .new-charge-btn.charge-btn-loaded {
            background-color: transparent;
            border: 1px solid var(--brand_pink);
            &:hover {
              background-color: var(--brand_pink_think);
            }
          }
          .new-charge-btn {
            margin-right: 12px;
            flex-shrink: 0;
            width: 109px;
            color: var(--brand_pink);
          }
          .default-btn {
            box-sizing: border-box;
            padding: 0;
            line-height: 30px;
            height: 30px;
            border-radius: 6px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: var(--graph_weak);
            background: var(--graph_weak);
            position: relative;
            transition: 0.3s all;
          }
          .follow-btn {
            flex: 1 1 auto;
            max-width: 200px;
            .follow-btn-inner {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              flex: 1;
              .follow-btn-icon {
                width: 16px;
                height: 16px;
                margin-right: 4px;
              }
            }
          }
          .follow-btn.not-follow {
            background: var(--brand_blue);
            background: var(--brand_blue);
            color: var(--text_white);
            color: var(--text_white);
          }
          .flash {
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
  .video-pob-above-modules {
    overflow: hidden;
    transition: height 0.3s;
    .video-pob-above-modules__inner {
      overflow: hidden;
      * {
        pointer-events: all;
      }
    }
  }
  * {
    pointer-events: all;
  }
}
@media (min-width: 1681px) {
  .up-label-container {
    .up-info-container {
      height: 108px;
      .up-info-right {
        .up-detail {
          .up-detail-top {
            .up-name {
              font-size: 16px;
              max-width: calc(100% - 12px - 60px);
            }
          }
          .up-description {
            font-size: 14px;
          }
        }
        .up-info__btn-panel {
          .up-info-btn-panel {
            .follow-btn {
              max-width: 230px;
            }
          }
        }
      }
    }
  }
}
</style>