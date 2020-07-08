Component({
  properties: {
    mediaInfo: Object
  },
  data: {
    // 是否全屏
    isFull: false,
    // 是否加载中
    isLoad: false,
    // 时间信息
    timeInfo: {
      currentTime: 0,
      duration: 0,
      currentTimeTel: '00:00',
      durationTel: '00:00',
      percen: 0
    },
    mediaObj: {},
    windowHeight: 0,
    isPlay: false
  },
  ready() {
    let {mediaInfo, timeInfo} = this.data;
    
    // 获取窗口高度
    let windowHeight = wx.getSystemInfoSync().windowHeight
    // 获取 video 对象
    let mediaObj = wx.createVideoContext(mediaInfo.id, this)

    // 设置是否播放参数 默认 false
    mediaObj.isPlay = false

    // 设置默认时间
    timeInfo.duration = mediaInfo.mediaTime || 120
    timeInfo.durationTel = this.getTimeTel(mediaInfo.mediaTime || 120)
    // 先跳转 0s 获取视频时间
    // this.mediaObj.seek(0)

    // 加入媒体对象
    // this.$store.commit('addMedieObj', {id: this.id, mediaObj: this.mediaObj})
    this.triggerEvent('addMedieObj', {id: mediaInfo.id, mediaObj})
    this.setData({
      windowHeight,
      mediaObj,
      timeInfo
    })
  },
  methods: {
    // 播放
    playMedia () {
      let { mediaObj } = this.data;
      
      if (mediaObj.isPlay) {
        mediaObj.pause()
      } else {
        mediaObj.play()
        // this.$store.commit('playOnlyMedia', this.id)
      }
      mediaObj.isPlay = !mediaObj.isPlay

      this.setData({
        mediaObj
      })
    },

    // 拖动进度条
    changeMedia (e) {
      let { mediaObj, timeInfo } = this.data;
      let time = e.detail.value * timeInfo.duration * 0.01
      mediaObj.seek(time)
    },

    // 全屏
    full () {
      let { isFull, mediaObj } = this.data;

      if (isFull) {
        mediaObj.exitFullScreen()
      } else {
        mediaObj.requestFullScreen()
      }

      this.setData({
        isFull: !isFull
      })
    },

    // 播放结束
    ended () {
      let { mediaObj } = this.data;

      mediaObj.isPlay = false
      mediaObj.stop()

      this.setData({
        mediaObj,
        isPlay: false
      })
    },

    play () {
      this.setData({
        isPlay: true
      })
    },
    pause () {
      this.setData({
        isPlay: false
      })
    },

    // 播放进度
    timeupdate (e) {
      let { timeInfo } = this.data;
      let {currentTime, duration} = e.detail

      timeInfo = {
        duration: parseInt(duration),
        currentTime: parseInt(currentTime),
        durationTel: this.getTimeTel(duration),
        currentTimeTel: this.getTimeTel(currentTime),
        percen: parseInt((currentTime / duration) * 100)
      }

      this.setData({
        timeInfo,
        isLoad: false
      })
    },

    // 视频缓存
    waiting () {
      let { mediaObj, isLoad } = this.data;

      // 播放中显示 loading
      if (mediaObj.isPlay) {
        this.setData({
          isLoad: true
        })
      }
    },

    // 时间格式化 0s => 00:00
    getTimeTel (time) {
      let m = parseInt(time / 60)
      let s = parseInt(time % 60)

      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    }
  }
});