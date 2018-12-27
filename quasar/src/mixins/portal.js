import Vue from 'vue'
import uid from '../utils/uid.js'

export default {
  methods: {
    __showPortal () {
      if (this.__portal !== void 0 && this.__portal.showing !== true) {
        document.body.appendChild(this.__portal.$el)
        this.__portal.showing = true
      }
    },

    __hidePortal () {
      if (this.__portal !== void 0 && this.__portal.showing === true) {
        this.__portal.$el.remove()
        this.__portal.showing = false
      }
    }
  },

  data: () => ({
    portalId: uid()
  }),

  render (h) {
    this.__portal !== void 0 && this.__portal.$forceUpdate()
    return null
  },

  beforeMount () {
    const id = this.portalId

    this.__portal = new Vue({
      render: h => this.__render(h),

      created () {
        this.portalParentId = id
      },

      methods: {
        __qPortalClose: this.hide
      }
    }).$mount()
  },

  beforeDestroy () {
    this.__portal.$destroy()
    this.__portal.$el.remove()
    this.__portal = void 0
  }
}
