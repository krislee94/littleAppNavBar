import wxRequest from '../../utils/wxRequest.js';

Component({
  externalClasses: ['i-class'],
  properties: {
    visible: {
      type: Boolean,
      value: false
    },

    mask: {
      type: Boolean,
      value: true
    },

    maskClosable: {
      type: Boolean,
      value: true
    },

    mode: {
      type: String,
      value: 'left' // left right
    }
  },
  data: {
    idrawFoot: [],
  },
  lifetimes: {
    ready: function() {
      var _this = this;
      // 在组件实例进入页面节点树时执行
      wxRequest.dataRequest('https://www.easy-mock.com/mock/5d63c5724003112cc6ca215f/api/goods/front/promotion', 'post', {})
        .then(res => {
          console.log(res.data);
          _this.setData({
            idrawFoot: res.data.footPrintList
          })
        })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    handleMaskClick() {
      if (!this.data.maskClosable) {
        return;
      }
      this.setData({
        visible: !this.data.visible
      })
      // this.triggerEvent('close', {});
    },
    close() {
      if (!this.data.maskClosable) {
        return;
      }
      this.setData({
        visible: !this.data.visible
      })
    },
    show() {
      this.setData({
        visible: true,
      })
    },
    gotoHuTui(e) {
      console.log(e.currentTarget.dataset.info.promotionId);
    },
    idraw_goto(e) {
      console.log(e.currentTarget.dataset.set)
      var id = e.currentTarget.dataset.set;
      switch (id) {
        case 'home':
          //TODO 跳转到首页
          break;
        case 'order':
          //TODO 跳转到订单页
          break;
        case 'like':
          //TODO 跳转到收藏页
          break;
        case 'card':
          //TODO 跳转到卡券也爱你
          break;
        case 'foot':
          //TODO 跳转到足迹 ？ 
          break;
        default:
          //如果都没有，还是进首页把
          break;

      }
    }
  }
});