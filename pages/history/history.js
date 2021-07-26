Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 2
      });
    }
  },
  data: {
    dataList:[]
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      wx.request({
        url: 'http://localhost:8080/wx/getNews',
        data:{
          param:1
        },
        success:reps=>{
          console.log(reps.data)
          this.setData({
            dataList:reps.data
          })
        }
      })
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})