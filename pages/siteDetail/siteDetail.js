const app = getApp();
let bmap = require('../../utils/bmap-wx.min.js');
Page({

  data: {
    activeNames: [],
    openMapTitle: '展开地图',
    stationId: '',
    busToWhere: [],
    distanceAndSpeed: [],
    clickStation: '',
    nowLongitude: '',
    nowLatitude: '',
    markers: [],
    stationXpoint: '',
    stationYpoint: '',
<<<<<<< HEAD
=======
    cityName:'',
>>>>>>> gjw
    hideMap: true
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
      openMapTitle: event.detail == 1 ? "关闭地图" : "展开地图",
      hideMap: event.detail == 1 ? false : true,
    });
<<<<<<< HEAD

=======
>>>>>>> gjw
  },

  queryDetail() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryDetail',
      method: 'POST',
      data: {
        stationId: parseInt(this.data.stationId),
<<<<<<< HEAD
        cityName: app.globalData.cityInfo.city
=======
        cityName: this.data.cityName
>>>>>>> gjw
      },
      success: (res) => {
        console.log(res)
        this.setData({
          busToWhere: res.data.data
        })
        this.queryBusDetailInfo();
      }
    })
  },

  queryBusDetailInfo() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryBusDetailInfo',
      method: 'POST',
      data: {
        busDetailInfo: this.data.busToWhere,
<<<<<<< HEAD
        cityName: app.globalData.cityInfo.city,
=======
        cityName: this.data.cityName,
>>>>>>> gjw
        clickStation: this.data.clickStation
      },
      success: (res) => {
        console.log(res)
        this.setData({
          distanceAndSpeed: res.data.data,
          clickStation: this.data.clickStation
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
    console.log(this.data.nowLongitude)
=======
>>>>>>> gjw
    wx.setNavigationBarTitle({
      title: options.stationName
    })
    this.setData({
      stationId: options.stationId,
      clickStation: options.stationName,
      nowLongitude: app.globalData.longitude,
      nowLatitude: app.globalData.latitude,
      stationXpoint: options.xPoint,
      stationYpoint: options.yPoint,
<<<<<<< HEAD
=======
      cityName: options.cityName,
>>>>>>> gjw
      markers: [
        {
          iconPath: "../../images/marker_red.png",
          id: 0,
          longitude: options.xPoint,
          latitude: options.yPoint,
          wigth: "15px",
          height: "33px"
        }
      ],
    })
    this.queryDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
<<<<<<< HEAD
})
=======
})
>>>>>>> gjw
