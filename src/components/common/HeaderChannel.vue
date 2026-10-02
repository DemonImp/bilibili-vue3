<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const homeStore = useHomeStore()
// nav的list
const { list1 } = storeToRefs(homeStore)
const addItem = ref(0)
const actionBar = ref(null) // 导航栏
const gridRef = ref(null) // 获取网格的列数量
let observer = null
let gridObserver = null
const show = ref(true) // 导航栏是否显示
const columnCount = ref(0) // 网格数据的列数量
const { listTop, listBottom } = homeStore.useChannelList(columnCount, addItem)
onMounted(() => {
  updateColumnCount()
  // observer = new IntersectionObserver(([entry]) => {
  //   show.value = !entry.isIntersecting
  // })
  gridObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => {
      updateColumnCount()
      // 改尺寸或改状态的逻辑放这里
    })
    // updateColumnCount()
  })
  if (gridRef.value) {
    gridObserver.observe(gridRef.value)
  }
  // observer.observe(actionBar.value)
})

onUnmounted(() => {
  // observer?.disconnect()
  gridObserver?.disconnect()
})
// 方法区
const updateColumnCount = () => {
  if (!gridRef.value) return
  const styles = getComputedStyle(gridRef.value)
  const columns = styles.gridTemplateColumns.split(' ').filter(Boolean)
  columnCount.value = columns.length
}
</script>
<template>
  <!-- 这个是顶部栏，固定位置 -->
  <div class="header-channel" ref="actionBar">
    <div class="header-channel-fixed" v-show="show">
      <!-- 大网格左侧 -->
      <div class="header-channel-fixed-left">
        <a>
          <span class="iconfont icon-dongtai header-channel-icon"></span>
          <span>动态</span>
        </a>
        <a>
          <span class="iconfont icon-remenhot header-channel-icon"></span>
          <span>热门</span>
        </a>
      </div>
      <!-- 分割线 -->
      <div class="header-channel-fixed-center"></div>
      <!-- 大网格右侧 -->
      <div class="header-channel-fixed-right header-channel-fixed-right-gap" ref="gridRef">
        <!-- 第一行，左侧列表，占n-3列，总共两行，列数根据视口大小定,(n-3)*2 -->
        <!-- <div style="grid-column: span 12"> -->
        <div class="header-channel-fixed-list header-channel-fixed-right-gap">
          <a
            class="item"
            v-for="item in listTop"
            :key="item"
            :style="{ letterSpacing: item.length <= 2 ? '2px' : '2px' }"
          >
            {{ item }}
          </a>
        </div>
        <!-- </div> -->
        <!-- 第一行右侧部分,占三列 -->
        <div class="header-channel-fixed-side-list header-channel-fixed-right-gap">
          <a
            class="item"
            v-for="item in list1"
            :key="item"
            :style="{ letterSpacing: item.length <= 2 ? '2px' : '2px' }"
          >
            {{ item }}
          </a>
        </div>
        <!--  底部，list:m-(n-3)*2-->
        <!-- <div style="grid-column: span 3"> -->
        <div class="header-channel-fixed-bottom-list header-channel-fixed-right-gap">
          <a
            class="item"
            v-for="item in listBottom"
            :key="item"
            :style="{ letterSpacing: item.length <= 2 ? '2px' : '2px' }"
          >
            {{ item }}
          </a>
        </div>
        <!-- </div> -->
      </div>
      <div class="header-channel-fixed-arrow">
        <i
          class="iconfont icon-arrow header-channel-icon"
          style="width: 10px; line-height: 10px; font-size: 10px"
        ></i>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
@media (min-width: 1099.9px) {
  .header-channel-fixed {
    font-size: 13px;
  }
}

@media (max-width: 1099.9px) {
  .header-channel-fixed-right {
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);
  }
  .header-channel-fixed-right > *:nth-of-type(n + 25) {
    display: none !important;
  }

  .header-channel-fixed-bottom-list {
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);
  }

  .header-channel-fixed-list {
    grid-column: span 9;
    grid-template-columns: repeat(9, 1fr);
  }
}

@media (min-width: 1100px) and(max-width: 1366.9px) {
  .header-channel-fixed-right {
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);
  }

  .header-channel-fixed-bottom-list {
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);
  }

  .header-channel-fixed-list {
    grid-column: span 9;
    grid-template-columns: repeat(9, 1fr);
  }

  .header-channel-fixed-list > *:nth-of-type(n + 25) {
    display: none !important;
  }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
  .header-channel .header-channel-fixed-right {
    grid-column: span 14;
    grid-template-columns: repeat(14, 1fr);
  }

  .header-channel-fixed-bottom-list {
    grid-column: span 14;
    grid-template-columns: repeat(14, 1fr);
  }

  .header-channel-fixed-list {
    grid-column: span 11;
    grid-template-columns: repeat(11, 1f);
  }

  .header-channel-fixed-list > *:nth-of-type(n + 29) {
    display: none !important;
  }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
  .header-channel .header-channel-fixed-right {
    grid-column: span 15;
    grid-template-columns: repeat(15, 1fr);
  }

  .header-channel-fixed-bottom-list {
    grid-column: span 15;
    grid-template-columns: repeat(15, 1fr);
  }

  .header-channel-fixed-list {
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);
  }

  .header-channel-fixed-list > *:nth-of-type(n + 31) {
    display: none !important;
  }
}

@media (min-width: 2200px) {
  .header-channel .header-channel-fixed-right {
    grid-column: span 17;
    grid-template-columns: repeat(17, 1fr);
  }

  .header-channel-fixed-bottom-list {
    grid-column: span 17;
    grid-template-columns: repeat(17, 1fr);
  }

  .header-channel-fixed-list {
    grid-column: span 14;
    grid-template-columns: repeat(14, 1f);
  }

  .header-channel-fixed-list > *:nth-of-type(n + 35) {
    display: none !important;
  }
}

@media (max-width: 1099.9px) {
  .header-channel-fixed-right-gap {
    grid-gap: 14px 8px;
  }
}

@media (min-width: 1099.9px) and (max-width: 1366.9px) {
  .header-channel-fixed-right-gap {
    grid-gap: 14px 8px;
  }
}

.header-channel-fixed-right-gap {
  grid-gap: 14px 10px;
}

.header-channel {
  width: 100%;
  min-width: 1100px;
  max-width: 2560px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 63px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
  z-index: 1001;
  .header-channel-fixed:hover {
      --wrap-max-height: 400px;
      &:hover {
        .header-channel-fixed-arrow .header-channel-icon {
          transform: rotate(180deg);
        }
      }
    }
  .header-channel-fixed {
    --item-height: 28px;
    --vertical-wrap-padding: 14px;
    --wrap-max-height: calc(var(--item-height) + var(--vertical-wrap-padding) * 2);
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: var(--vertical-wrap-padding) var(--layout-padding, 60px);
    max-height: var(--wrap-max-height);
    overflow: hidden;
    transition: max-height 0.2s;
    font-size: 14px;
    margin: 0 auto;

    .header-channel-fixed-left {
      align-self: self-start;
      display: flex;
      gap: 4px;
      a {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 28px;
        color: #61666d;
        transition: color .2s;
        min-width: 60px;
        max-width: 150px;
      }

      .header-channel-icon {
        margin-right: 5px;
        width: 20px;
        line-height: 20px;
        font-size: 20px;
        transition: transform 0.2s ease;
      }
      
    }
    .header-channel-fixed-arrow {
      position: absolute;
      right: calc(var(--layout-padding, 60px) - 40px);
      width: 28px;
      height: 28px;
      padding: 8px;
      align-self: start;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 4px;
      transition: transform .2s;

    }
  }

  .header-channel-fixed-center {
    width: 1px;
    background: #e3e5e7;
    height: 14px;
    margin: 0 10px;
  }

  .header-channel-fixed-right {
    display: inline-grid;
    position: relative;
    // grid-template-rows: repeat(2,1fr);
    flex: 1;
    align-self: start;
    grid-gap: 14px 10px;
    /* 网格左边列表 */
    .header-channel-fixed-list {
      display: inline-grid;
      /* 先填列 */
      grid-auto-flow: column;
      // width: 100%;
      /* 空出三格 */
      /* grid-column: 1/-4; */
      /* grid-template-columns: repeat(12, 1fr); */
      grid-template-rows: repeat(2, 1fr);
    }
    /* 网格右边列表 */
    .header-channel-fixed-side-list {
      display: inline-grid;
      grid-auto-flow: column;
      grid-template-rows: 28px 28px;
      grid-column: span 3;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    /* 下面的一行 */
    .header-channel-fixed-bottom-list {
      grid-template-rows: repeat(auto-fill, 1fr);
      display: inline-grid;
      grid-auto-flow: row;
    }
  }
}

a {
  // outline: 0;
  color: inherit;
  text-decoration: none;
}
/* 网格里面的元素 */
.item {
  --item-height: 28px;
  --line_light: #F1F2F3;
  --graph_bg_thin: #F6F7F8;
  --text2: #61666d
  cursor: pointer;
    padding: 0 4px;
    height: var(--item-height);
    line-height: var(--item-height);
    text-align: center;
    border: 1px solid var(--line_light);
    background-color: var(--graph_bg_thin);
    border-radius: 6px;
    color: var(--text2);
    transition: background-color .2s;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word!important;
    word-break: break-all;
    line-break: anywhere;
    -webkit-line-clamp: 1
}
.item:hover {
  cursor: pointer;
  background: var(--graph_bg_thick);
}

.item-bg {
  background: var(--graph_bg_thick);
}
</style>
