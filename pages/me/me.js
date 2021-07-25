const app = getApp()
Component({

  pageLifetimes: {
    show() {
      let info = wx.getStorageSync('loginInfo')
      console.log(info)
      this.getTabBar().setData({
        active: 3
      });

      if (info != (undefined || '') && wx.getStorageSync('isLogin') != '') {
        wx.request({
          url: app.globalData.prefix + '/wx/getLoginUserInfo',
          method: "post",
          data: {
            opId: wx.getStorageSync('isLogin')
          },
          success: res => {
            wx.setStorageSync('loginUserInfo', res.data.data)
            this.setData({
              loginInfo: res.data.data,
              isLogin: res.data.data.nickname
            })
          }
        })
     
      } else {
        this.setData({
          isLogin: "登录/注册",
          loginInfo: ""
        })
      }

    }
  },

  data: {
    defaultAva: '/images/defaultAva.jpg',
    loginInfo: '',
    isLogin: ''
  },


  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () { },
    detached: function () { },
  },


  methods: {
    getUserInfo(e) {
      console.log(e.detail);
    },

    onGetUserInfo(e) {
      console.log(e.detail.userInfo);
    },

    toLogin: function () {
      console.log(this.data.loginInfo)
      if (this.data.loginInfo == (undefined || '')) {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    },



  },



})