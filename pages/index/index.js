Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 0
      });
      var _this = this;
    var myIp ;
    wx.request({
      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
      success:reps=>{
        var aaa = reps.data.split(' ');
        var bbb=aaa[4]
        var ccc = bbb.replace('"','')
        var ddd = ccc.replace('"', '')
        var ip = ddd.replace(',', '')
        myIp = ip;
        console.log(myIp);
        wx.request({
          url: "http://api.map.baidu.com/location/ip?ak=c5Z34MLBSy9rlLKezAjovlP20WT1bItG&ip="+myIp+"&coor=bd09ll",
          success:reps=>{
            console.log(reps.data)
            console.log(myIp)
            console.log("http://api.map.baidu.com/location/ip?ak=c5Z34MLBSy9rlLKezAjovlP20WT1bItG&ip="+myIp+"&coor=bd09ll")
            _this.setData({
              name:reps.data.content.address_detail.city
            })
          }
        })
      }
    })
    }
  },
  data: {
    
  },
  methods:{
    onClick(event){
      wx.request({
        url: 'http://localhost:8888/test',
        data:{
          name:"张三",
          age:50
        },
        success:reps=>{
          console.log(reps.data)
          this.setData({
            name:reps.data.content.address
          })
        }
      })
    },
    onLocation(){
      wx.reLaunch({
        url: '/pages/chooseCity/chooseCity',
      })
    }
  }
})