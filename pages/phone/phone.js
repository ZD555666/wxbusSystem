// pages/phone/phone.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms: '',
    info: '发送验证码',
    show: false,
  },

  sendsms() {
    wx.request({
      url: app.globalData.prefix + '/wx/sendSms',
      data: {
        phone: this.data.phone
      },
      method: "POST",
      success: (res) => {
        console.log(res)
        if (res.data.code == 500) {
          Notify({ type: 'primary', message: '请等待60s后再次发送' });
        } else if (res.data.code == 200) {
          Notify({ type: 'primary', message: '发送成功' });
          this.setData({
            info: '',
            show: true,
            isDisable: true
          })
          this.start()
        }

      }
    })
  },

  start() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
  },

  finished() {
    this.setData({
      info: '发送验证码',
      show: false,
      isDisable: false
    })
  },

  sub(){
    wx.request({
      url: app.globalData.prefix + '/wx/subSms',
      method:'POST',
      data:{
        opid: wx.getStorageSync('opid'),
        userInfo: JSON.stringify(wx.getStorageSync('loginInfo')),
        phone: this.data.phone,
        sms: this.data.sms
      },
      success:(res)=>{
        console.log(res.data.code)
        if(res.data.code==200){
          wx.setStorageSync('isLogin', wx.getStorageSync('opid'))
          wx.switchTab({
            url: '../me/me',
          })
        }else{
          Notify({ type: 'primary', message: res.data.msg });
        }
      }
    })
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