Component({

  pageLifetimes: {
    show() {
      let info = wx.getStorageSync('loginInfo')
      console.log(info)
      this.getTabBar().setData({
        active: 3
      });

      if (info == (undefined || '')) {
        this.setData({
          isLogin: "登录/注册"
        })
      } else {
        this.setData({
          loginInfo: info,
          isLogin: info.nickName
        })
      }

    }
  },

  data: {
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
      if(this.data.loginInfo == (undefined || '')){
        wx.navigateTo({
          url: '../login/login',
        })
      }else{
        wx.navigateTo({
          url: '../exit/exit',
        })
      }
    }

  },



})