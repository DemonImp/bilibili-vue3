<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import { ElPopover } from 'element-plus'
const homeStore = useHomeStore()
//图片
const iconBgList = ref([
  { icon: 'icon-dongtai', title: '动态', background_color: '#ff9212' },
  { icon: 'icon-remenhot', title: '火热', background_color: '#f07775' },
])
// 网格的监听器
const gridRef = ref(0)
const columnCount = ref(0)
const addItem = ref(-1)
let gridObserver = null
// 拉取网格要省略部分和非省略部分
const { list1, list2 } = storeToRefs(homeStore)
const { listTop, listBottom } = homeStore.useChannelList(columnCount, addItem)
//更新网格数量
const updateColumnCount = () => {
  if (!gridRef.value) return
  const styles = getComputedStyle(gridRef.value)
  const columns = styles.gridTemplateColumns.split(' ').filter(Boolean)
  columnCount.value = columns.length + 3
}

onMounted(() => {
  updateColumnCount()
  gridObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => {
      // 改尺寸或改状态的逻辑放这里
      updateColumnCount()
    })
    // updateColumnCount()
  })
  if (gridRef.value) {
    gridObserver.observe(gridRef.value)
  }
})

onUnmounted(() => {
  gridObserver?.disconnect()
})
</script>
<template>
  <div class="channel">
    <!-- 图标部分 -->
    <div class="channel-icon">
      <a class="icon-item" v-for="item in iconBgList" :key="item.icon">
        <div class="icon-bg" :style="{ background: item.background_color }">
          <span class="iconfont icon-font" :class="item.icon"></span>
        </div>
        <span class="icon-title">{{ item.title }}</span>
      </a>
    </div>
    <!-- 中间部分 -->
    <div class="right-channel-container">
      <!-- 切割数量 -->
      <div class="channel-left" ref="gridRef">
        <div class="channel-items_left">
          <a v-for="item in listTop" :key="item" class="channel-link">
            <span class="side-text">
              {{ item }}
            </span>
          </a>
          <a class="channel-link">
            <el-popover
              trigger="hover"
              placement="bottom"
              :show-arrow="false"
              width="auto"
              v-if="listBottom.length >= 0"
            >
              <!-- 悬浮里面的内容 -->
              <!-- <div style="width: 300px; height: 100px; background: red">测试内容</div> -->
              <div class="v-popover-content">
                <div class="is-zh">
                  <!-- 内容测试 -->
                  <a v-for="item in listBottom" :key="item" class="name">
                    {{ item }}
                  </a>
                </div>
              </div>
              <template #reference>
                <div>
                  <span> 更多 </span>
                  <span
                    style="width: 10px; line-height: 10px; font-size: 10px"
                    class="iconfont icon-arrow arrow-down"
                  ></span>
                </div>
              </template>
            </el-popover>
          </a>
        </div>
      </div>
      <div class="channel-items_right">
        <a v-for="item in list1" :key="item" class="channel-link_right">
          <span class="side-text">
            {{ item }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url('@/assets/iconfont/iconfont.css');
.v-popover-content {
  // background: red;
  // min-width: 200px;
  // min-height: 100px;
  position: relative;
  background-color: var(--bg1_float);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid var(--line_regular);
  color: var(--text1);
}

.is-zh {
  width: auto;
  padding: 8px 16px;
  display: grid;
  grid-auto-flow: column;
  border: 0;
  .name {
    display: block;
    cursor: pointer;
    padding: 0 6px;
    color: var(--text1);
    font-size: 13px;
    white-space: nowrap;
    height: 32px;
    min-width: 64px;
    line-height: 32px;
    transition: background-color 0.3s;
    &:hover {
      background: var(--graph_bg_thick);
      border-radius: 6px;
    }
  }
}

.channel {
  display: flex;
  position: relative;
  min-width: 1020px;
  max-width: calc(1980+var(--layout-padding) * 2);
  width: var(--layout-width);
  max-width: 2078px;
  padding: 0 var(--layout-padding);
  margin: 0 auto;
  height: 130px;
  background: var(--bg1);
  align-items: center;
  .channel-icon {
    display: flex;
    align-items: center;
    z-index: 0;
    .icon-item {
      min-width: 60px;
      max-width: 90px;
      margin-right: 32px;
      position: relative;
      width: max-content;
      align-items: center;
      display: flex;
      flex-direction: column;
      color: var(--text1);
      .icon-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        transition: background-color 0.3;
        .icon-font {
          line-height: 25px;
          width: 25px;
          font-size: 25px;
          color: #fff;
        }
      }
      .icon-title {
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
  .right-channel-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .channel-left {
      display: inline-grid;
    }
    .channel-items_left {
      display: inline-grid;
      position: relative;
      width: 100%;
      grid-template-rows: repeat(2, 1fr);
      grid-auto-flow: column;
      grid-gap: 10px;
      border-right: 1px solid var(--line_regular);
    }

    .channel-items_right {
      grid-column: span 1;
      grid-row-gap: 10px;
      grid-auto-flow: column;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      width: 168px;
      border-left: 1px solid var(--line_regular);
      flex-shrink: 0;
      padding-left: 22px;
    }
  }

  .channel-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--item-height);
    border-radius: 6px;
    padding: 0 2px;
    color: var(--text2);
    border: 1px solid var(--line_light);
    background-color: var(--graph_bg_thin);
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .arrow-down {
      display: inline-block;
      transition: transform 0.2s ease;
    }
    &:hover {
      .arrow-down {
        transform: rotate(180deg);
      }
    }
    .side-text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-word !important;
      word-break: break-all;
      line-break: anywhere;
      -webkit-line-clamp: 1;
    }
    &:hover {
      cursor: pointer;
      background: var(--graph_bg_thick);
    }
  }
  .channel-link_right {
    display: flex;
    text-decoration: none;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--text2);
    text-align: center;
    font-weight: 400;
    transition: background-color 0.3s, color 0.3s;
    .side-text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-word !important;
      word-break: break-all;
      line-break: anywhere;
      -webkit-line-clamp: 1;
    }
    .side-icon {
      flex-shrink: 0;
      margin-right: 4px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
    }
    &:hover {
      cursor: pointer;
      color: var(--brand_blue);
    }
  }
}
@media (max-width: 1099.9px) {
  .is-zh {
    grid-template-rows: repeat(4, 1fr);
    > *:nth-of-type(-n + 17) {
      // display: none !important;
    }
  }

  .channel {
    // padding: 0 56px;
    height: 100px;
    .channel-icon {
      .icon-item {
        max-width: 55px;
        margin-right: 10px;
        .icon-bg {
          width: 40px;
          height: 40px;
        }
        .icon-title {
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
    .right-channel-container {
      .channel-left {
        width: 100%;
        // grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        grid-template-columns: repeat(9, 1fr);
      }
      .channel-items_left {
        grid-column: span 9;
        padding-right: 20px;
        grid-template-columns: repeat(9, 1fr);
      }
      .channel-items__left > *:nth-of-type(n + 18) {
        display: none !important;
      }
      .channel-items_right {
        width: 168px;
      }
    }
    .channel-link {
      height: 22px;
      line-height: 22px;
      font-size: 13px;
    }
    .channel-link_right {
      font-size: 13px;
      height: 28px;
      .side-icon {
        display: none;
      }
    }
  }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
  .is-zh {
    grid-template-rows: repeat(4, 1fr);
    // > *:nth-of-type(-n + 17) {
    //   display: none !important;
    // }
  }

  .channel {
    height: 100px;
    .channel-icon {
      .icon-item {
        width: 55px;
        margin-right: 16px;
        .icon-bg {
          width: 40px;
          height: 40px;
        }
        .icon-title {
          font-size: 16px;
          line-height: 18px;
        }
      }
    }
    .right-channel-container {
      .channel-left {
        width: 100%;
        // grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        grid-template-columns: repeat(9, 1fr);
      }
      .channel-items_left {
        grid-column: span 9;
        padding-right: 20px;
        grid-template-columns: repeat(9, 1fr);
      }
      .channel-items__left > *:nth-of-type(n + 18) {
        display: none !important;
      }
      .channel-items_right {
        width: 230px;
      }
    }
    .channel-link {
      height: 26px;
      line-height: 26px;
      font-size: 13px;
    }
    .channel-link_right {
      font-size: 14px;
      height: 28px;
    }
  }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
  .is-zh {
    grid-template-rows: repeat(4, 1fr);
    // > *:nth-of-type(-n + 21) {
    //   display: none !important;
    // }
  }

  .channel {
    // padding: 0 64px;
    height: 110px;
    .channel-icon {
      .icon-item {
        max-width: 60px;
        margin-right: 24px;
        .icon-bg {
          width: 46px;
          height: 46px;
        }
        .icon-title {
          font-size: 14px;
          height: 20px;
        }
      }
    }
    .right-channel-container {
      .channel-left {
        width: 100%;
        // grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        grid-template-columns: repeat(11, 1fr);
      }
      .channel-items_left {
        grid-column: span 11;
        padding-right: 30px;
        grid-template-columns: repeat(11, 1fr);
      }
      .channel-items__left > *:nth-of-type(n + 22) {
        display: none !important;
      }
      .channel-items_right {
        width: 240px;
      }
    }
    .channel-link {
      height: 26px;
      line-height: 26px;
      font-size: 14px;
    }
    .channel-link_right {
      font-size: 14px;
      height: 28px;
    }
  }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
  .is-zh {
    grid-template-rows: repeat(3, 1fr);
    // > *:nth-of-type(-n + 23) {
    //   display: none !important;
    // }
  }
  .channel {
    // padding: 0 96px;
    max-width: 2270px;
    height: 120px;
    .channel-icon {
      .icon-item {
        max-width: 60px;
        margin-right: 24px;
        .icon-bg {
          width: 46px;
          height: 46px;
        }
        .icon-title {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    .right-channel-container {
      .channel-left {
        width: 100%;
        // grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        grid-template-columns: repeat(12, 1fr);
      }
      .channel-items_left {
        grid-column: span 12;
        padding-right: 30px;
        grid-template-columns: repeat(12, 1fr);
      }
      .channel-items__left > *:nth-of-type(n + 24) {
        display: none !important;
      }
      .channel-items_right {
        width: 258px;
      }
    }
    .channel-link {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .channel-link_right {
      font-size: 15px;
      height: 32px;
    }
  }
}

@media (min-width: 2200px) {
  .is-zh {
    grid-template-rows: repeat(2, 1fr);
    // > *:nth-of-type(-n + 27) {
    //   display: none !important;
    // }
  }
  .channel {
    max-width: 2078px;
    height: 130px;
    .channel-icon {
      .icon-item {
        max-width: 70px;
        margin-right: 32px;
        .icon-bg {
          width: 46px;
          height: 46px;
        }
        .icon-title {
          font-size: 15px;
          line-height: 20px;
        }
      }
    }
    .right-channel-container {
      .channel-left {
        width: 100%;
        // grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        grid-template-columns: repeat(14, 1fr);
      }
      .channel-items_left {
        grid-column: span 14;
        padding-right: 30px;
        grid-template-columns: repeat(14, 1fr);
      }
      .channel-items__left > *:nth-of-type(n + 28) {
        display: none !important;
      }
      .channel-items_right {
        width: 258px;
      }
    }
    .channel-link {
      height: 30px;
      line-height: 30px;
      font-size: 15px;
    }
    .channel-link_right {
      font-size: 15px;
      height: 32px;
    }
  }
}

@media (max-width: 1139.9px) {
  .channel {
    width: 1020px;
  }
}

@media (min-width: 1300px) and (max-width: 1399.9px) {
  .channel {
    width: 1180px;
  }
}
</style>