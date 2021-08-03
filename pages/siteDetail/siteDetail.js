const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stationId: '',
    busToWhere: [],
    distanceAndSpeed: [],
    clickStation: ''
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
        cityName: app.globalData.cityInfo.city
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
    wx.setNavigationBarTitle({
      title: options.stationName
    })
    this.setData({
      stationId: options.stationId,
      clickStation: options.stationName
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