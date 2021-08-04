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
    hideMap: true
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
      openMapTitle: event.detail == 1 ? "关闭地图" : "展开地图",
      hideMap: event.detail == 1 ? false : true,
    });
  },

  queryDetail() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryDetail',
      method: 'POST',
      data: {
        stationId: parseInt(this.data.stationId),
        cityName: app.globalData.cityInfo.city
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
        cityName: app.globalData.cityInfo.city,
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
    console.log(this.data.nowLongitude)
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
})
