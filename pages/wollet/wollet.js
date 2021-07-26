const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assetsNum: '888',
    assetsHideNum: '888',
    closedEye: '',
    openEye: ''
  },
  
  eyes(){
    this.setData({
      assetsNum: this.data.assetsNum==='***'?this.data.assetsHideNum:'***'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("loginUserInfo") == '') {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    this.queryBalance()
  },

  queryBalance(){
    wx.request({
      url: app.globalData.prefix+'/wx/queryBalance',
      method:'POST',
      data:{
        opid: ''
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