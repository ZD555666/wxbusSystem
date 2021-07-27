const app = getApp()
var QR = require("../../utils/qrcode.js");
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
    amount:'',
    showLoad:false,
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
    this.onPullDownRefresh()
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

  createPay(){
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
      success: (res)=>{
        console.log(res)
        var size = that.setCanvasSize(); //动态设置画布大小
        that.createQrCode(res.data.msg, "mycanvas", size.w, size.h);
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
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH, this, this.canvasToTempImage);
    
    // setTimeout(() => { this.canvasToTempImage();},100);

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
    var that = this;
    wx.request({
      url: app.globalData.prefix + '/wx/queryBalance',
      data: {
        opId: wx.getStorageSync("loginUserInfo").openid
      },
      success: (res)=>{
        that.setData({
          assetsNum: (res.data.data) / 100 + '元',
          assetsHideNum: (res.data.data) / 100 + '元',
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})