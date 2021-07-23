Component({

  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 3
      });
    }
  },

  data: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
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

    toLogin:function(){
      wx.navigateTo({
        url: '../login/login',
      })
    }

  },

  

})