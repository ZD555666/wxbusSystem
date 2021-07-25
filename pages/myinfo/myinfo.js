const app = getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNickName: '',
    headImgHeight: '',
    loginUserInfo: '',
    nickName: '',
    gender: '',
    phone: '',
    showGender: false,
    actions: [
      {
        name: '男',
      },
      {
        name: '女',
      }
    ],
  },

  getRect() {
    var that = this;
    wx.createSelectorQuery().select('#headImg').boundingClientRect(function (rect) {
      rect.height
      that.setData({
        headImgHeight: rect.height
      })
    }).exec()
  },

  clickNickName() {
    this.setData({ showNickName: true });
  },

  onCloseNickName() {
    this.setData({ showNickName: false });
  },

  changeNickName() {
    this.setData({ nickName: this.data.nickName });
  },

  clickGender() {
    this.setData({ showGender: true });
  },

  onCloseGender() {
    this.setData({ showGender: false });
  },

  onSelectGender(event) {
    let gender = event.detail.name == '男' ? 1 : 0
    this.setData({
      gender: gender
    })
  },

  saveInfo() {
    wx.request({
      url: app.globalData.prefix + '/wx/saveInfo',
      method: "POST",
      data: {
        phone: this.data.phone,
        avatarurl: this.data.loginUserInfo.avatarurl,
        openid: this.data.loginUserInfo.openid,
        nickname: this.data.nickName,
        gender: this.data.gender
      },
      success: res => {
        console.log(res)
        Notify({
          type: 'primary',
          message: res.data.code == 200 ? "保存成功" : "保存失败",
          onClose: () => {
            wx.switchTab({
              url: '../me/me',
            })
          }
        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRect(),
      this.setData({
        loginUserInfo: wx.getStorageSync('loginUserInfo'),
        nickName: wx.getStorageSync('loginUserInfo').nickname,
        gender: wx.getStorageSync('loginUserInfo').gender,
        phone: wx.getStorageSync('loginUserInfo').phone
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