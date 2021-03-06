import Vue from 'vue'

import { isSSR } from '../plugins/platform.js'

const ssrAPI = { onOk () {}, okCancel () {}, hide () {} }

export default function (Component) {
  return ({ className, style, ...props }) => {
    if (isSSR) { return ssrAPI }

    const
      okFns = [],
      cancelFns = [],
      API = {
        onOk (fn) {
          okFns.push(fn)
          return API
        },
        onCancel (fn) {
          cancelFns.push(fn)
          return API
        },
        hide () {
          vm.$refs.dialog.hide()
          cancel()
          return API
        }
      }

    const node = document.createElement('div')
    document.body.appendChild(node)

    const
      ok = data => {
        okFns.forEach(fn => { fn(data) })
      },
      cancel = () => {
        cancelFns.forEach(fn => { fn() })
      }

    let vm = new Vue({
      el: node,

      data () {
        return { props }
      },

      render: h => h(Component, {
        ref: 'dialog',
        props,
        style,
        class: className,
        on: {
          ok,
          cancel,
          hide: () => {
            vm.$destroy()
            vm.$el.remove()
            vm = null
          }
        }
      }),

      mounted () {
        this.$refs.dialog.show()
      }
    })

    return API
  }
}
