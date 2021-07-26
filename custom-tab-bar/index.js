Component({
  data: {
    active: 0,
    list: [{
      text: "首页",
      icon: "home-o",
      url: "/pages/index/index"
    },
    {
      text: "去哪",
      icon: "exchange",
      url: "/pages/towhere/towhere"
    },
    {
      text: "新闻",
      icon: "todo-list-o",
      url: "/pages/history/history"
    },
    {
      text: "个人中心",
      icon: "contact",
      url: "/pages/me/me"
    },
    ]
  },
  methods: {
    onChange:function(e){
      var i = e.detail;
      console.log(i)
      wx.switchTab({
        url: this.data.list[i].url,
      })
      this.setData({
        active : i
      })
    }
  }
});
