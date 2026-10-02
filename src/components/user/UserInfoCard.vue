<script setup>
import { ElCard } from 'element-plus'
import { ref } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
const bgUrl = ref('src/assets/images/user-info-bg.webp')
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const color = ref('rgb(251,114,153)')
onMounted(() => {
  userStore.getUserInfo()
})
</script>
<template>
  <div class="user-info-card">
    <el-card header-class="el-card-header" body-class="el-card-body">
      <!-- 背景图 -->
      <template #header>
        <div src="" class="bg" :style="{ backgroundImage: `url(${bgUrl})` }"></div>
      </template>
      <!-- 正文 -->
      <div class="user-info-wrap">
        <!-- 头像 -->
        <router-link to="#" class="avatar" style="display: block">
          <Avatar :size="48" :avatar-url="userInfo.avatar"> </Avatar>
        </router-link>
        <div class="info">
          <p class="user">
            <router-link to="#" class="name" :style="{ color: color }">{{
              userInfo.name
            }}</router-link>
            <img src="../../assets/images/man.png" width="16" height="16" />
          </p>
          <p class="social">
            <router-link to="#">
              <span class="like">{{ userStore.userDataFormat(userInfo.attention) }}</span>
              <span class="tip-text">关注</span>
            </router-link>
            <router-link to="#">
              <span class="fans">{{ userStore.userDataFormat(userInfo.follower) }}</span>
              <span class="tip-text">粉丝</span>
            </router-link>
            <span>
              <span>{{ userStore.userDataFormat(userInfo.likeNum) }}</span>
              <span class="tip-text">获赞</span>
            </span>
          </p>
          <div class="offical-wrap">
            <img />
            bilibili个人认证：
            {{ userInfo.official.title }}
          </div>
          <p class="sign">{{ userInfo.official.desc }}</p>
          <div class="btn-box">
            <router-link to="#" class="like">
              <span class="plus">+</span>
              <span>关注</span>
            </router-link>
            <router-link to="#" class="message">发送消息</router-link>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
:deep(.el-card-header) {
  padding: 0;
}
:deep(.el-card-body) {
  font-size: 12px;
  padding: 0;
}
.bg {
  width: 100%;
  height: 85px;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.user-info-card {
  width: 100%;
  .user-info-wrap {
    --text1: #18191c;
    --text2: #61666d;
    --text3: #9499a0;
    --text_white: #ffffff;
    --graph_weak: #c9ccd0;
    position: relative;
    display: flex;
    padding: 0 20px 16px 10px;
    .avatar {
      position: relative;
      top: 10px;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      background-color: var(--graph_weak);
      margin-right: 12px;
    }
    .info {
      p {
        margin: 0;
      }
      .user {
        margin-top: 12px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        .name {
          font-size: 16px;
          margin-right: 4px;
          max-width: 158px;
          font-weight: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sex {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
      .social {
        margin-bottom: 10px;
        a {
          color: var(--text1);
          margin-right: 18px;
        }
        .tip-text {
          color: var(--text3);
          margin-left: 3px;
        }
      }
      .offical-wrap {
        font-style: 12px;
        color: var(--text3);
        line-height: 17px;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-break: anywhere;
        img {
          border: none;
        }
        .offical-icon {
          width: 14px;
          height: 14px;
          margin-right: 2px;
          vertical-align: sub;
        }
      }
      .sign {
        color: var(--text3);
        line-height: 17px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-break: anywhere;
      }
      .btn-box {
        display: flex;
        margin-top: 16px;
        .like {
          background-color: var(--brand_blue);
          color: var(--text_white);
          &:hover {
            background-color: #00b8f6;
          }
        }
        a {
          box-sizing: border-box;
          cursor: pointer;
          text-decoration: none;
          width: 100px;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
          border-radius: 4px;
          transition: all 0.3s;
          font-size: 14px;
        }
        .message {
          color: var(--text2);
          background-color: transparent;
          border: 1px solid;
          &:hover {
            color: #00b8f6;
          }
        }
      }
    }
  }
}
</style>