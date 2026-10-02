<script setup>
import { ElInput } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'
//颜色调控
const props = defineProps({
  textColor: {
    type: String,
    default: '#fff',
  },
})
const navLeftList = ref([
  { name: '首页', href: '/home' },
  { name: '番剧', href: '/home' },
  { name: '直播', href: '/home' },
  { name: '游戏中心', href: '/home' },
  { name: '会员购', href: '/home' },
  { name: '漫画', href: '/home' },
  { name: '赛事', href: '/home' },
  { name: '大赛', href: '/home' },
  { name: '下载客户端', href: '/home' },
])
const navRightList = ref([
  { title: '大会员', className: 'icon-dahuiyuan', href: '/home' },
  { title: '消息', className: 'icon-xiaoxi', href: '/home' },
  { title: '状态', className: 'icon-dongtai', href: '/home' },
  { title: '收藏', className: 'icon-yixianshi-', href: '/home' },
  { title: '历史', className: 'icon-lishijilu', href: '/home' },
  { title: '创作中心', className: 'icon-chuangzuozhongxin-weixuanzhong', href: '/home' },
])
const searchList = ref([
  {
    keyword: 'IG JDG',
    showName: 'IG战胜JDG晋级世界赛',
    icon: 'http://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png',
    heatScore: 2965610,
  },
  {
    keyword: '锐评IG战胜JDG晋级S赛',
    showName: '锐评IG战胜JDG晋级S赛',
    icon: 'http://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png',
    heatScore: 1693859,
  },
  {
    keyword: 'LPL S16出征仪式',
    showName: 'LPL S16出征仪式',
    icon: 'http://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png',
    heatScore: 1016379,
  },
  {
    keyword: '西贝回应被曝倒闭',
    showName: '西贝回应被曝倒闭',
    icon: 'http://i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png',
    heatScore: 953976,
  },
  {
    keyword: '中国代表团亮相亚运会开幕式',
    showName: '中国代表团亮相亚运会开幕式',
    icon: '',
    heatScore: 745272,
  },
  {
    keyword: '亚细亚洛天依中式梦核',
    showName: '亚细亚洛天依中式梦核',
    icon: '',
    heatScore: 649040,
  },
  {
    keyword: '中国科研团队钻研茶叶蛋做法',
    showName: '中国科研团队钻研茶叶蛋做法',
    icon: '',
    heatScore: 566876,
  },
  {
    keyword: '我的青春结婚了',
    showName: '我的青春结婚了',
    icon: '',
    heatScore: 526336,
  },
  {
    keyword: '中秋和国庆的请假难度belike',
    showName: '中秋和国庆的请假难度belike',
    icon: '',
    heatScore: 505688,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
  {
    keyword: '凡人第192集逐帧解析',
    showName: '凡人第192集逐帧解析',
    icon: '',
    heatScore: 500299,
  },
])
const keyword = ref('')
const showPanel = ref(false)
const searchRef = ref(null)
// methods
const clean = () => {
  keyword.value = ''
}

const search = () => {
  if (keyword.value.trim() === '') {
    //搜索默认类容
  }
}

const handleDocumentClick = (event) => {
  if (!searchRef.value?.contains(event.target)) {
    showPanel.value = false
  }
}
// 钩子函数
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="nav">
    <ul class="left">
      <li v-for="(item, index) in navLeftList" :key="index">
        <div class="left-item">
          <router-link
            class="left-entry__item-trigger"
            :to="item.href"
            :style="{ color: textColor }"
          >
            <i
              v-if="index === 0 || index === navLeftList.length - 1"
              class="iconfont"
              :class="{ 'icon-bilibili-line': index === 0, 'icon-xiazai': index != 0 }"
              style="width: 20px; margin-right: 6px; font-size: 20px; line-height: 20px"
            ></i>

            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-bar" ref="searchRef">
        <!-- 搜索表单，聚焦的时候上面的两个角削去，不聚焦都radio -->
        <div class="search-form" :class="{ 'is-focus': showPanel }">
          <!-- 输入框，单有内容的时候跨域全部取消 -->
          <div class="search-content">
            <!-- 回车绑定 -->
            <input
              @focus="showPanel = true"
              v-model="keyword"
              class="inp"
              type="text"
              @keydown.enter="enter"
              maxlength="100"
              autocomplete="off"
              placeholder="终于懂此男为何钟爱中国结了！年少时的定情信物 后来vein用作了各种配饰戴在身上 v斐"
            />
            <!-- 取消 -->
            <div class="search-clean" @click="clean">
              <i class="iconfont icon-quxiao" style="width: 12px; font-size: 12px"></i>
            </div>
          </div>
          <!-- 搜索标签 -->
          <div class="search-btn">
            <i
              @click="search"
              class="iconfont icon-sousuo"
              style="width: 17px; line-height: 17px; font-size: 17px"
            ></i>
          </div>
        </div>

        <!-- 推荐框，聚焦搜索框的时候 -->
        <div class="search-panel" v-show="showPanel">
          <div class="seach-panel-table">
            <a v-for="(item, index) in searchList" :key="item.keyword">
              <p class="rank" :class="{ 'rank-top': index <= 2 }">
                {{ index + 1 }}
              </p>
              <div class="text">{{ item.showName }}</div>
              <img
                v-if="item.icon != '' || item.icon != null || item.icon != undefined"
                :src="item.icon"
              />
            </a>
          </div>
        </div>
      </div>
      <!-- 搜索框
      <el-input v-model="keyword" placeholder="搜索视频" @focus="showPanel = true" />
       推荐面板
      <div v-show="showPanel" class="search-panel">
        <div
          v-for="item in searchList"
          :key="item.keyword"
          class="search-item"
          @click="selectKeyword(item.keyword)"
        >
          {{ item.name }}
        </div>
      </div> -->
    </div>
    <!-- 登陆等操作区 -->
    <div class="right">
      <ul class="right-main">
        <li class="unlgoin-box right-entry__item">
          <router-link class="right-login" to="/home">登陆</router-link>
        </li>
        <li class="right-box right-entry__item" v-for="(item, index) in navRightList" :key="index">
          <router-link :to="item.href" class="right-outside" :style="{ color: textColor }">
            <!-- <div class="right-icon"> -->
            <span class="iconfont right-icon" :class="[item.className]"></span>
            <!-- </div> -->
            <span class="right-text">{{ item.title }}</span>
          </router-link>
        </li>
        <li class="right-box right-upload">
          <div class="upload-entry">
            <span class="upload-icon iconfont icon-tougaox"></span>
            <span class="upload-text">投稿</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/iconfont/iconfont.css');
.nav {
  height: 64px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  line-height: 64px;
  font-size: 14px;
  z-index: 1002;
}

ul {
  list-style-type: none;
  display: flex;
}

.nav .left {
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  /* margin-right: 30px; */
}

.nav .left .left-item {
  flex-shrink: 0;
  min-height: 100%;
  align-items: center;
  display: flex;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-right: 20px;
}

.nav .left .left-item:hover {
  transform: translateY(-6px);
}

.nav .left .left-item .left-entry__item-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0;
  min-height: 100%;
}

.nav .left a {
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  margin-right: 20px;
}

.nav .search {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.nav .search .search-bar {
  min-width: 181px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.nav .search .search-bar .search-panel {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  max-height: 612px;
  overflow-y: auto;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  background: #ffffff;
  border: 1px solid #f3f5f7;
  -webkit-font-smoothing: antialiased;
}

.search-panel .seach-panel-table {
  display: grid;
  width: 100%;
  /* grid-template-columns: repeat(2, 1fr); */
  justify-content: left;
  grid-auto-flow: row;
}

.search-panel .seach-panel-table .rank {
  margin-right: 7px;
  color: #9499a0;
  font-size: 14px;
  width: 15px;
  min-width: 15px;
  height: 17px;
  line-height: 17px;
  text-align: center;
}

.search-panel .seach-panel-table .text {
  margin-right: 6px;
  height: 17px;
  line-height: 17px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0;
}

.search-panel .seach-panel-table img {
  height: 14px;
  margin-right: 16px;
  border-style: none;
  object-fit: cover;
  display: block;
}

.search-panel .seach-panel-table .rank-top {
  color: black;
}

.search-panel .seach-panel-table a {
  padding-left: 16px;
  align-items: center;
  height: 38px;
  display: flex;
  color: #18191c;
}

.search-panel .seach-panel-table a:hover {
  background: #9499a0;
  cursor: pointer;
}

.nav .search .search-form {
  display: flex;
  align-items: center;
  height: 40px;
  overflow: hidden;
  position: relative;
  line-height: 38px;
  border: 1px solid #e3e5e7;
  border-radius: 8px;
  align-content: center;
  padding: 0 48px 0 4px;
  z-index: 1;
  width: 100%;
  opacity: 0.9;
  background: #f1f2f3;
  transition: background-color 0.3s;
}

.nav .search .search-form:hover {
  opacity: 1;
  background: #ffffff;
}

.nav .search .is-focus {
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  border: 1px solid #e3e5e7;
  background: #ffffff;
}

.nav .search .is-focus {
  border: 1px solid #e3e5e7;
  border-bottom: none;
  background: #ffffff;
}

.nav .search .search-content {
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f2f3;
  width: 100%;
  height: 32px;
  border-radius: 6px;
  border: 2px solid transparent;
}

.nav .search .search-content .inp {
  padding: 0 8px 0 0;
  line-height: 20px;
  border: none;
  outline: none;
  width: 100%;
  color: #61666d;
  background-color: transparent;
  box-shadow: none;
  font-size: 14px;
  flex: 1;
}
.nav .search .search-content .inp:focus {
  color: #18191c;
}

.nav .search .search-content .search-clean {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.nav .search .search-form .search-btn {
  position: absolute;
  flex-shrink: 0;
  top: 3px;
  right: 7px;
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border: none;
  line-height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 6px;
  color: #18191c;
}

.nav .search .search-form .search-btn:hover {
  background: #f1f2f3;
}

.nav .right {
  display: flex;
  color: #ffffff;
  font-size: 13px;
  /* justify-content: center; */
  flex-shrink: 0;
  align-items: center;
}

.nav .right .right-main {
  display: flex;
  align-items: center;
}

.nav .right .right-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* flex-direction: column; */
  /* flex-flow: nowrap; */
}

.nav .right .right-box {
  display: block;
  margin-right: 4px;
  text-align: center;
  min-width: 50px;
  cursor: pointer;
}

.nav .right .right-upload {
  margin: 0;
}

.nav .right .right-upload .upload-entry {
  display: flex;
  height: 34px;
  min-width: 90px;
  margin-left: 16px;
  padding: 0 8px;
  background: #fb7299;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  color: #ffffff;
  border-radius: 8px;
  transition: background-color 0.3;
}

.nav .right .right-upload .upload-entry:hover {
  background: #fa8bab;
}

.nav .right .right-upload .upload-entry .upload-icon {
  width: 18px;
  font-size: 18px;
}

.nav .right .right-box .right-outside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 13px;
  flex-flow: column;
}

.nav .right .right-box .right-outside .right-icon {
  line-height: 20px;
  padding-bottom: 2px;
  /* color: #fff; */
  width: 20px;
  font-size: 20px;
  height: 20px;
  -webkit-font-smoothing: antialiased;
}

.right-text {
  word-break: keep-all;
  line-height: 1.6;
  font-size: 13px;
  /* color: #fff; */
}

.nav .right .right-box .right-outside .right-icon:hover {
  animation: jump 0.4s ease;
}
@keyframes jump {
  0% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-5px);
  }

  60% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(-2px);
  }

  100% {
    transform: translateY(0);
  }
}

.nav .right .unlgoin-box {
  min-height: 50px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav .right .right-main .right-entry__item {
  flex-shrink: 0;
}

.nav .right .right-login {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 16px;
  color: #ffffff;
  background: #00aeec;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1099.9px) {
  .nav .left .left-item {
    margin-right: 10px;
  }
  .nav .search {
    margin: 0 10px;
  }
  .search-panel .seach-panel-table {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
  .nav .left .left-item {
    margin-right: 10px;
  }
  .right .right-main .right-entry__item {
    min-width: 25px;
    margin-right: 8px;
  }
  .right .right-main .right-entry__item:last-child {
    margin-right: 0px;
  }
  .nav .search {
    margin: 0 10px;
  }
  .search-panel .seach-panel-table {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
  .nav .left .left-item {
    margin-right: 15px;
  }
  .nav .search {
    margin: 0 20px;
  }
  .search-panel .seach-panel-table {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
  .nav .search {
    margin: 0 30px;
  }
  .search-panel .seach-panel-table {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1279.9px) {
  .right .right-main .right-entry__item {
    min-width: 25px;
    margin-right: 8px;
  }
  .right .right-main .right-entry__item:last-child {
    margin-right: 0px;
  }
  .right-text {
    display: none;
  }
  .nav .right .right-upload .upload-entry {
    min-width: 34px;
  }
  .nav .right .right-upload .upload-entry .upload-icon {
    margin: 0;
  }

  .nav .right .right-upload .upload-entry .upload-text {
    display: none;
  }
}
</style>
