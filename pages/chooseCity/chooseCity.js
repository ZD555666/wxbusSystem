// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'IOWBZ-YADWV-4E3P4-U3UP3-JC4YH-BEFPO' 
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityList:[],
    nowCity:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
              nowCity:reps.data.content.address_detail.city
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function(res) {//成功后的回调
        _this.setData({
          cityList:res.result[1]
        })
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})