Component({
  pageLifetimes: {
    show() {
      this.getTabBar().setData({
        active: 1
      });
    }
  },
  data: {
    
  },
})