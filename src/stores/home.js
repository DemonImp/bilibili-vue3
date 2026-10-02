import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const list1 = ref(['专栏', '直播', '活动', '课堂', '社区中心', '新歌热榜'])
  const list2 = ref([
    '番剧',
    '电影',
    '国创',
    '电视剧',
    '综艺',
    '纪录片',
    '动画',
    '游戏',
    '鬼畜',
    '音乐',
    '舞蹈',
    '影视',
    '娱乐',
    '知识',
    '科技数码',
    '资讯',
    '美食',
    '小剧场',
    '汽车',
    '时尚美妆',
    '体育运动',
    '动物',
    'vlog',
    '绘画',
    '人工智能',
    '家装房产',
    '户外',
    '健身',
    '手工',
    '旅游出行',
    '三农',
    '亲子',
    '健康',
    '情感',
    '生活兴趣',
    '生活经验',
    '公益',
    '超高清',
    '视频播客',
  ])

  function useChannelList(columnCount, addItem) {
    const splitIndex = computed(() => {
      return Math.max(0, (columnCount.value - 3) * 2 + addItem.value)
    })

    const listTop = computed(() => {
      return list2.value.slice(0, splitIndex.value)
    })

    const listBottom = computed(() => {
      return list2.value.slice(splitIndex.value)
    })

    return {
      listTop,
      listBottom,
    }
  }
  return {
    list1,
    list2,
    useChannelList,
  }
})
