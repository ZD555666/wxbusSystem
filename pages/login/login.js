// import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
// import Loading from '../../miniprogram_npm/@vant/weapp/loading/index';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },

  getUserInfo(e) {
    console.log(e.detail);
  },

  onGetUserInfo(e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo != undefined) {
      wx.setStorageSync('loginInfo', e.detail.userInfo)
      wx.login({
        success: res => {
          console.log(res.code)
          if (res.code) {
            this.setData({loading:true})
            wx.request({
              url: app.globalData.prefix+'/wx/getOpenId',
              data: {
                code: res.code
              },
              success: (res) => {
                console.log(res)
                wx.setStorageSync('opid', res.data.data.openid)
                if(!res.data.data.isRegis){
                  wx.navigateTo({
                    url: '../phone/phone',
                  })
                }else{
                  wx.setStorageSync('isLogin', res.data.data.openid)
                  wx.switchTab({
                    url: '../me/me',
                  })
                }
              },
              fail: (error) => {
                console.log(error)
              }
            })
          }
        }
      })
      
     
      
        
    }

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