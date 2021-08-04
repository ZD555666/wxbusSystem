const app = getApp()
let bmap = require('../../utils/bmap-wx.min.js');
Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 0
      });
      this.getMyLocation();
    },
    hide() {
      this.setData({ showOpt: false });
    },
  },

  data: {
    actions: [
      { name: '收藏' }, { name: '分享', openType: 'share' }, { name: 'cancle' },
    ],
    showOpt: false,
    ak: "5sqq8W5B4v0ukIInelAaD8jW16Cz0zXj",
    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    cityInfo: {},
    nearStation: [],
    currentValue: 50,
    isHide: false,
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
<<<<<<< HEAD
    selectCollectStation: ''
=======
    selectCollectStation: '',
    xPoint: '',
    yPoint: ''
>>>>>>> gjw
  },
  methods: {
    onLocation() {
      wx.reLaunch({
        url: '/pages/chooseCity/chooseCity',
      })
    },

    onCloseOpt() {
      this.setData({ showOpt: false });
    },

    onSelectOpt(event) {
      // console.log(event.detail);
      if (event.detail.name == '收藏') this.doCollect();
<<<<<<< HEAD
=======
      
>>>>>>> gjw
    },

    doCollect() {
      // console.log(this.data.selectCollectStation)
      wx.request({
        url: app.globalData.prefix + '/wx/doCollect',
        method: 'POST',
        data: {
          stationName: this.data.selectCollectStation,
          cityName: app.globalData.cityInfo.city,
<<<<<<< HEAD
          opId: wx.getStorageSync("loginUserInfo").openid
        },
        success: (res) => {
          console.log(res)
=======
          opId: wx.getStorageSync("loginUserInfo").openid,
          stationId: this.data.stationId,
          xPoint: this.data.xPoint,
          yPoint: this.data.yPoint
        },
        success: (res) => {
          console.log(res)
          //exist
>>>>>>> gjw
        }
      })
    },

    touchStart: function (e) {
      this.touchStartTime = e.timeStamp
    },

    touchEnd: function (e) {
      this.touchEndTime = e.timeStamp
    },

    longpress: function (e) {
      // console.log(e)
      this.setData({
        showOpt: true,
<<<<<<< HEAD
        selectCollectStation: e.currentTarget.dataset.name
      })
=======
        selectCollectStation: e.currentTarget.dataset.name,
        stationId: e.currentTarget.dataset.value,
        xPoint: e.currentTarget.dataset.xpoint,
        yPoint: e.currentTarget.dataset.ypoint
      })
      // console.log(this.data.xPoint)
>>>>>>> gjw
    },

    getMyLocation() {
      var that = this;
      let BMap = new bmap.BMapWX({
        ak: that.data.ak
      });
      let fail = function (data) {
        console.log(data);
      };
      let success = function (data) {
        console.log(data);
        let wxMarkerData = data.wxMarkerData;
        that.setData({
          markers: wxMarkerData,
          latitude: wxMarkerData[0].latitude,
          longitude: wxMarkerData[0].longitude,
          address: wxMarkerData[0].address,
          cityInfo: data.originalData.result.addressComponent
        });
        app.globalData.markers = wxMarkerData,
          app.globalData.latitude = wxMarkerData[0].latitude,
          app.globalData.longitude = wxMarkerData[0].longitude,
          app.globalData.address = wxMarkerData[0].address,
          app.globalData.cityInfo = data.originalData.result.addressComponent
        that.queryNearStation();
      }
      BMap.regeocoding({
        fail: fail,
        success: success
      });

    },

    queryNearStation() {
      wx.request({
        url: app.globalData.prefix + '/wx/queryNearStation',
        method: 'POST',
        data: {
          longitude: this.data.longitude,
          latitude: this.data.latitude,
          cityInfo: this.data.cityInfo.city,
          distance: this.data.currentValue * 10
        },
        success: (res) => {
          console.log(res)
          this.setData({
            nearStation: res.data.data
          })

        }
      })

    },
    goSearch() {
      wx.reLaunch({
        url: '/pages/search/search',
      })

    },

    onDrag(event) {
      this.setData({
        currentValue: event.detail
      })
      this.queryNearStation()
    },

    choseStation(event) {
      this.setData({
        showOpt: false
      })
      let value = event.currentTarget.dataset.value
      let name = event.currentTarget.dataset.name
      let xPoint = event.currentTarget.dataset.xpoint
      let yPoint = event.currentTarget.dataset.ypoint
      wx.navigateTo({
<<<<<<< HEAD
        url: '/pages/siteDetail/siteDetail?stationId=' + value + '&stationName=' + name + '&xPoint=' + xPoint + '&yPoint=' + yPoint,
=======
        url: '/pages/siteDetail/siteDetail?stationId=' +
          value + '&stationName=' + name + '&xPoint=' + xPoint + '&yPoint=' + yPoint + "&cityName=" + app.globalData.cityInfo.city,
>>>>>>> gjw
      })

    }

  }
})
