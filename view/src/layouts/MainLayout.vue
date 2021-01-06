<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          F-Stat
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar stretch >
        <MenuToolbar
          v-for="link in MenuToolbar"
          :key="link.title"
          v-bind="link"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Data Sets
        </q-item-label>
        <DataHouse
          v-for="link in DataHouse"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="text-white">
      <div class="q-pa-lg flex flex-center">
        F-Stat v1.0
        </div>
    </q-footer>
  </q-layout>
</template>

<script>
import DataHouse from 'components/DataHouse.vue'
import MenuToolbar from 'components/MenuToolbar.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const menuData = [
  {
    title: 'Linear models',
    submenus: [
      {
        title: 'Simple',
        module: 'reg_simple'
      },
      {
        title: 'multiple',
        module: 'reg_multiple'
      }
    ]
  },
  {
    title: 'Time series',
    submenus: []
  },
  {
    title: 'Graphics',
    submenus: []
  },
  {
    title: 'Generalized linear models',
    submenus: []
  }
]

export default {
  name: 'MainLayout',
  components: { DataHouse, MenuToolbar },
  data () {
    return {
      leftDrawerOpen: false,
      DataHouse: linksData,
      MenuToolbar: menuData
    }
  }
}
</script>
