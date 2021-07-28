Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 2
      });
    }
  },
  data: {
    dataList:[],
    page:1,
  },
  pageLifetimes: {
    show: function() {
      var _this = this;
      // 页面被展示
      _this.onRequest();
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  //触底响应函数
  
  methods:{
    onReachBottom: function() {
      this.onBottom()
     },

     onBottom(){
      var that = this;
      (this.data.page)++;
      that.onRequest();
      console.log(123)
    },
    onRequest(){
      var _this = this;
      wx.request({
        url: 'http://localhost:8080/wx/getNews',
        data:{
          param:_this.data.page
        },
        success:reps=>{
         if(_this.data.page == 1){
          _this.setData({
        		dataList: reps.data,
         	})
         }else{
            //获取原始列表
            let dataList = _this.data.dataList;
            //获取新列表
            let arr = reps.data;
            //新列表数据与原列表数据合并
            let newArr = dataList.concat(arr);
            _this.setData({
              dataList: newArr,
            })
         } 
        }
      })
    },
 
    /**
     * 页面上拉触底事件的处理函数
     */
    
  }
})