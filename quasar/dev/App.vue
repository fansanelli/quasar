<template>
  <div id="q-app">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" :duration="300" @leave="resetScroll">
      <router-view/>
    </transition>
    <div
      style="padding: 10px; right: 10px; bottom: 10px"
      class="generic-border-radius bg-white shadow-4 fixed z-top"
    >
      <q-btn dense flat size="sm" icon="visibility" @click="showSelector = !showSelector" class="absolute-top-right z-top" />
      <template v-if="showSelector">
        <q-btn dense flat size="sm" :icon="lang === 'he' ? 'navigate_before' : 'navigate_next'" @click="lang = lang === 'en-us' ? 'he' : 'en-us'" class="absolute-bottom-right z-top" />
        <q-select
          label="I18n"
          dense
          borderless
          :options="[
            { label: 'English (US)', value: 'en-us' }
            ,{ label: 'English (UK)', value: 'en-uk' }
            ,{ label: 'Romanian', value: 'ro' }
            ,{ label: 'Hebrew', value: 'he' }
            ,{ label: 'Chinese (Simplified)', value: 'zh-hans' }
            ,{ label: 'Italian', value: 'it' }
            ,{ label: 'Spanish', value: 'es' }
            ,{ label: 'Swedish', value: 'sv' }
            ,{ label: 'Farsi', value: 'fa-ir' }
            ,{ label: 'French', value: 'fr' }
            ,{ label: 'Dutch', value: 'nl' }
            ,{ label: 'German', value: 'de' }
            ,{ label: 'Indonezian', value: 'id' }
            ,{ label: 'Croatian', value: 'hr' }
            ,{ label: 'Russian', value: 'ru' }
            ,{ label: 'Ukrainian', value: 'uk' }
            ,{ label: 'Polish', value: 'pl' }
            ,{ label: 'Czech', value: 'cs' }
          ]"
          emit-value
          map-options
          dense-options
          v-model="lang"
        />
        <q-select
          label="Icon set"
          dense
          borderless
          :options="[
            { label: 'Material', value: 'material-icons' }
            ,{ label: 'MDI', value: 'mdi' }
            ,{ label: 'Ionicons', value: 'ionicons' }
            ,{ label: 'Fontawesome', value: 'fontawesome' }
            ,{ label: 'Eva Icons', value: 'eva-icons' }
          ]"
          emit-value
          map-options
          dense-options
          v-model="iconSet"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  meta: {
    title: 'Quasar Development'
  },
  data () {
    return {
      lang: this.$q.i18n.lang,
      iconSet: this.$q.icon.name,
      showSelector: false
    }
  },
  watch: {
    lang (lang) {
      import(`../i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
    },
    iconSet (set) {
      import(`../icons/${set}`).then(iconSet => {
        this.$q.icon.set(iconSet.default)
      })
    }
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  }
}
</script>
