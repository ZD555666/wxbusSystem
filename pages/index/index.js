const app = getApp()
let bmap = require('../../utils/bmap-wx.min.js');
Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 0
      });
      this.getMyLocation();

    }
  },
  data: {
    ak: "5sqq8W5B4v0ukIInelAaD8jW16Cz0zXj",
    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    cityInfo: {},
    nearStation: [],
    currentValue: 50,
    isHide: false
  },
  methods: {
    onLocation() {
      wx.reLaunch({
        url: '/pages/chooseCity/chooseCity',
      })
    },

<<<<<<< HEAD
=======
<<<<<<< HEAD

    onSearch() {
      if (this.data.searchValue != '') {

=======
>>>>>>> master
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
<<<<<<< HEAD
=======
>>>>>>> gjw
>>>>>>> master
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
          distance: this.data.currentValue
        },
        success: (res) => {
          console.log(res)
          this.setData({
            nearStation: res.data.data
          })

        }
      })
<<<<<<< HEAD
=======
<<<<<<< HEAD
      },
    goSearch(){
      wx.reLaunch({
        url: '/pages/search/search',
      })
=======
>>>>>>> master
    },

    onDrag(event) {
      this.setData({
        currentValue: event.detail
      })
      this.queryNearStation()
    },

    choseStation(event) {
      let value = event.currentTarget.dataset.value
      wx.navigateTo({
        url: '/pages/siteDetail/siteDetail?stationId=' + value,
      })

<<<<<<< HEAD
=======
>>>>>>> gjw
>>>>>>> master
    }

  }
})