<script setup>
import HeaderChannel from './HeaderChannel.vue'
import HeaderNav from './HeaderNav.vue'
import BiliHeaderChannel from './BiliHeaderChannel.vue'
</script>
<template>
  <!-- 头部导航栏，粘性定位 -->
  <div class="header">
    <!-- 粘性定位，当定位变为固定定位的时候需要修改图标，以及透明度变为不透明，颜色变为白色 -->
    <HeaderNav></HeaderNav>
    <!-- 轮番图 -->
    <div class="banner">
      <picture class="v-img banner-img">
        <source srcset="../../assets/images/banner-01.avif" type="image/avif" />
        <source srcset="../../assets/images/banner-02.avif" type="image/webp" />
        <img src="../../assets/images/banner-01.avif" alt="banner" />
      </picture>
    </div>
    <HeaderChannel></HeaderChannel>
    <BiliHeaderChannel></BiliHeaderChannel>
    <!-- 内容区域 -->
  </div>
</template>
<style lang="less" scoped>
// 变量
//  响应式布局,栅栏布局，不同尺寸选择不同的格数
@media (max_width: 1099.9px) {
}

@media (min_width: 1100px) and (max_width: 1336.9px) {
}
.header {
  position: relative;
  color: var(--text1);
  width: 100%;
  min-width: 1100px;
  max-width: 2560px;
  margin: 0 auto;
  min-height: 64px;
  background: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.6;
  /* 不进行缩放 */
  -webkit-text-size-adjust: 100%;

  .banner {
    position: relative;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    .v-img {
      position: relative;
      display: inline-block;
      line-height: 1;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      background-color: var(--graph_bg_regular);
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: inherit;
      }
    }
    .banner-img {
      position: absolute;
      object-fit: cover;
    }
  }
}
</style>