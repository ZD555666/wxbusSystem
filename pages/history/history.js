Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 2
      });
      wx.request({
        url: 'http://localhost:8080/wx/getNews',
        data: {
          param: 1
        },
        success: reps => {
          console.log(reps.data)
          this.setData({
            dataList: reps.data
          })
        }
      })
    }
  },
  data: {
    dataList: []
  },
  methods: {

  }
})