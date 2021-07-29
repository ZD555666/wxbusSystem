const app = getApp()
var QR = require("../../utils/qrcode.js");
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  data: {
    scanCodeMsg: '',
    imagePath: ''
  },

  scanCode() {
    var that = this;
    wx.scanCode({ //扫描微信API
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) { //成功
        console.log(res) //输出回调信息
        that.setData({
          scanCodeMsg: res.result
        });
        that.costMoney();
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  costMoney() {
    wx.request({
      url: this.data.scanCodeMsg,
      success: (res) => {
        console.log(res)
        Notify({
          type: 'primary',
          message: res.data.msg == 'paySuccess' ? '支付成功' : "支付失败",
          // onClose: wx.switchTab({
          //   url: '../me/me'
          // })
        });

      }
    })
  },

  reqScanCode() {
    wx.request({
      url: app.globalData.prefix + '/wx/reqScanCode',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res) => {
        console.log(res.data.msg)
        var size = this.setCanvasSize();
        this.createQrCode(app.globalData.prefix + res.data.msg, "mycanvas", size.w, size.h);
      }
    })
  },

  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 750; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    QR.api.draw(url, canvasId, cavW, cavH, this, this.canvasToTempImage);
  },

  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath
        });
        that.saveQr();
      },
      fail: function (res) {
        console.log(res);
      }
    }, that);
  },

  saveQr() {
    console.log(this.data.imagePath)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imagePath,
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
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
    this.reqScanCode();
    this.scanCode();
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