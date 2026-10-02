import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: '27218150',
    name: '刘哔电影',
    sex: '男',
    rank: '10000',
    avatar: 'https://i2.hdslb.com/bfs/face/654ed89c763ca1f003cc2d0145e1ec444cc7f0e8.jpg',
    birthday: '',
    place: '',
    description: '',
    article: 0,
    attentions: [],
    fans: 3950912,
    attention: 1422,
    sign: '关注我让你更沙雕快乐！合作微信13311286278',
    nameplate: {
      nid: 76,
      name: '2018百大UP主',
      image: 'https://i2.hdslb.com/bfs/face/948d7b4c70e20cc060188c0908e1083798951aab.png',
      image_small: 'https://i1.hdslb.com/bfs/face/45d56689317d5b4a9d2f3de4816b11f731afb3bc.png',
      level: '稀有勋章',
      condition: '经过创作力、影响力、口碑力三个指标官方评定后，在2018年名列前茅的100位UP主',
    },
    official: {
      role: 1,
      title: 'bilibili 2018百大UP主、 知名影视UP主',
      desc: '代表作《辣眼神剧吐槽之舞法天女》',
      type: 0,
    },
    articleount: 0,
    follower: 3950912,
    likeNum: 33926486,
  })
  function getUserInfo() {
    return (userInfo.value = {
      id: '27218150',
      name: '刘哔电影',
      sex: '男',
      rank: '10000',
      avatar: 'https://i2.hdslb.com/bfs/face/654ed89c763ca1f003cc2d0145e1ec444cc7f0e8.jpg',
      birthday: '',
      place: '',
      description: '',
      article: 0,
      attentions: [],
      fans: 3950912,
      attention: 1422,
      sign: '关注我让你更沙雕快乐！合作微信13311286278',
      nameplate: {
        nid: 76,
        name: '2018百大UP主',
        image: 'https://i2.hdslb.com/bfs/face/948d7b4c70e20cc060188c0908e1083798951aab.png',
        image_small: 'https://i1.hdslb.com/bfs/face/45d56689317d5b4a9d2f3de4816b11f731afb3bc.png',
        level: '稀有勋章',
        condition: '经过创作力、影响力、口碑力三个指标官方评定后，在2018年名列前茅的100位UP主',
      },
      official: {
        role: 1,
        title: 'bilibili 2018百大UP主、 知名影视UP主',
        desc: '代表作《辣眼神剧吐槽之舞法天女》',
        type: 0,
      },
      articleount: 0,
      follower: 3950912,
      likeNum: 33926486,
    })
  }

  function userDataFormat(value) {
    console.log('format:', value)
    if (value < 10000) return value
    else {
      if (value < 100000000) return (value / 10000).toFixed(1) + '万'
      else return (value / 100000000).toFixed(1) + '亿'
    }
  }
  return { userDataFormat, userInfo, getUserInfo }
})
