const app = getApp()
var QR = require("../../utils/qrcode.js");
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  data: {
    assetsNum: '',
    assetsHideNum: '',
    closedEye: '',
    openEye: '',
    showCharge: false,
    imagePath: '',
    showSrc: false,
    actions: [
      { name: '5元', index: 5 }, { name: '10元', index: 10 }, { name: '50元', index: 50 }, { name: '100元', index: 100 }
    ],
    amount: '',
    showLoad: false,
    orderNo: '',
    inComeList:[],
    active: 1
  },

  eyes() {
    this.setData({
      assetsNum: this.data.assetsNum === '***' ? this.data.assetsHideNum : '***'
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

  recharge() {
    this.setData({
      showCharge: true
    })
  },

  onCloseCharge() {
    this.setData({ showCharge: false });
  },

  onSelectCharge(event) {
    console.log(event.detail.index)
    this.setData({
      amount: event.detail.index
    })
    this.createPay(event.detail.index);
  },

  completePay() {
    this.queryPay();
  },

  queryPay() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryPay',
      method: 'POST',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid,
        orderNo: this.data.orderNo,
        amount: this.data.amount
      },
      success: (res) => {
        console.log(res)
        this.queryBalance();
        let msg = res.data.msg;
        Notify({ type: 'primary', message: msg == 'WAIT_BUYER_PAY' ? '等待支付' : (msg == 'TRADE_CLOSED' ? '交易关闭' : (msg == 'TRADE_SUCCESS' ? '支付成功' : (msg == 'TRADE_FINISHED' ? '该订单已支付' : '未扫码'))) });
      }
    })
  },

  delPay() {
    wx.request({
      url: app.globalData.prefix + '/wx/delPay',
      method: 'POST',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid,
        orderNo: this.data.orderNo,
      },
      success: (res) => {
        console.log(res)
        Notify({ type: 'primary', message: res.data.msg == 'Business Failed' ? '未扫码' : (res.data.msg == 'Success' ? '支付取消' : 'wrong!') });
      }
    })
    this.queryPay();
  },

  closePay() {
    console.log("1111111111234")
    this.delPay();
  },

  createPay() {
    var that = this;
    this.setData({
      showSrc: true,
      showLoad: true
    })
    wx.request({
      url: app.globalData.prefix + '/wx/aliPay',
      method: 'POST',
      data: {
        amount: this.data.amount,
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res) => {
        console.log(res)
        var size = that.setCanvasSize(); //动态设置画布大小
        that.createQrCode(res.data.data.qrCode, "mycanvas", size.w, size.h);
        that.setData({ orderNo: res.data.data.orderNo })
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
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    QR.api.draw(url, canvasId, cavW, cavH, this, this.canvasToTempImage);
  },

  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          showLoad: false
        });
      },
      fail: function (res) {
        console.log(res);
      }
    }, that);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.queryBalance();
  },

  queryBalance() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryBalance',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res) => {
        this.setData({
          assetsNum: (res.data.data) / 100 + '元',
          assetsHideNum: (res.data.data) / 100 + '元',
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
    this.queryInCome();
  },

  queryInCome() {
    wx.request({
      url: app.globalData.prefix + '/wx/queryInCome',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res) => {
        console.log(res)
        this.setData({
          inComeList: (res.data.data).reverse()
        })
      }
    })
  },

  onUnload:function(){
    this.queryPay();
    this.delPay();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})