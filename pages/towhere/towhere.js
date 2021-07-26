Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 1
      });
    }
  },
  data: {
    location:'我的位置',
    toWhere:''
  },
  methods:{
    onClickIcon(){
      var _this = this;
      var check =_this.data.location;
      _this.setData({
        location:_this.data.toWhere ,
        toWhere:check
      })
    },
    onClickIcon1(){
     
    },
    focus(){
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    onChange(event){
      var _this = this;
      _this.setData({
        location:event.detail
      })
    },
    onChange1(event){
      var _this = this;
      _this.setData({
        toWhere:event.detail
      })
    }
  }
})