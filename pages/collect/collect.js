const app = getApp()
Page({

  data: {
    mainActiveIndex: 0,
    activeId: null,
    items: []
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    this.setData({ activeId });
    console.log(detail)
    wx.navigateTo({
      url: '/pages/siteDetail/siteDetail?stationId=' +
      detail.id + '&stationName=' + detail.text + '&xPoint=' + detail.xPoint + '&yPoint=' + detail.yPoint + "&cityName=" + detail.cityName,
    })

  },

  onLoad: function (options) {
    this.queryMyCollect()
  },

  queryMyCollect() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryMyCollect',
      method: 'POST',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res) => {
        console.log(res)
        this.setData({
          items: res.data.data
        })
      }
    })
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