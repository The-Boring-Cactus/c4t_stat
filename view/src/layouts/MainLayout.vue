<template>
  <q-layout view='hHh lpR fFf'>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          F-Stat
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar stretch class='bg-white'>
        <q-btn
          class='text-black'
          flat
          dense
          round
          :icon='myicon'
          aria-label='Menu'
          @click='sideMenu'
        />
        <vue-file-toolbar-menu :content='menuData' />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model='leftDrawerOpen'
      show-if-above
      bordered
      content-class='bg-grey-1'
    >
      <q-list>
        <q-item-label
          header
          class='text-grey-8'
        >
          Data Sets
        </q-item-label>
        <DataHouse
          v-for='link in DataHouse'
          :key='link.title'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class='text-white'>
      <div class='q-pa-lg flex flex-center'>
        F-Stat v1.0
        </div>
    </q-footer>
  </q-layout>
</template>

<script>
import DataHouse from 'components/DataHouse.vue'
// import MenuToolbar from 'components/MenuToolbar.vue'
import VueFileToolbarMenu from 'vue-file-toolbar-menu'
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

const menuData2 = [
  {
    text: 'File',
    menu: [
      { text: 'New', click: () => { this.$refs.text.innerHTML = this.initial_html; this.focus_text() } },
      { text: 'Save...', click: () => alert('Youre amazing, ' + (prompt('Whats your name?') || 'friend') + '!') },
      { is: 'separator' },
      { text: 'Print...', click: () => window.print() },
      { is: 'separator' },
      { text: 'Close', click () { if (confirm('Do you want to close the page?')) window.close() } }
    ]
  },
  {
    text: 'Edit',
    menu: [
      { text: 'Cut', click: () => document.execCommand('cut') },
      { text: 'Copy', click: () => document.execCommand('copy') },
      { text: 'Paste', click () { navigator.clipboard.readText().then(text => { document.execCommand('insertText', false, text) }) } }
    ]
  },
  {
    text: 'Formats',
    menu: [
      { text: 'Basic' },
      { text: 'Disabled', disabled: true },
      {
        text: 'Sub-menus',
        custom_chevron: '►',
        menu: [
          { text: 'Hello!' },
          {
            text: 'Im a sub-menu',
            custom_chevron: '►',
            menu: [
              { text: 'And Im another sub-menu!' }
            ],
            menu_width: 240
          }
        ],
        menu_width: 200
      },
      {
        text: 'Hotkey',
        hotkey: 'ctrl+e',
        click () {
          alert('Hotkey menu triggered either via clicking or shortcut.')
        }
      },
      { text: 'Material icon', icon: 'shopping_cart', click: () => window.open('https://material.io/resources/icons', '_blank') },
      { text: 'Platform emoji', emoji: 'call_me_hand', click: () => window.open('https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json', '_blank') },
      { text: 'Menu text is wrapped when it is too long' }
    ],
    menu_width: 220
  },
  {
    text: 'Help',
    menu: [
      { text: 'About', icon: 'help', click: () => alert('vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License') },
      { is: 'separator' },
      { text: 'Repository', icon: 'exit_to_app', click: () => window.open('https://github.com/motla/vue-file-toolbar-menu') },
      { text: 'API', icon: 'exit_to_app', click: () => window.open('https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md') },
      { text: 'Report Issue', icon: 'exit_to_app', click: () => window.open('https://github.com/motla/vue-file-toolbar-menu/issues') },
      { text: 'Release Notes', icon: 'exit_to_app', click: () => window.open('https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md') }
    ],
    menu_width: 220
  }
]
export default {
  name: 'MainLayout',
  components: { DataHouse, VueFileToolbarMenu },
  data () {
    return {
      leftDrawerOpen: false,
      myicon: 'chevron_left',
      DataHouse: linksData
    }
  },
  methods: {
      sideMenu: function () {
          this.leftDrawerOpen = !this.leftDrawerOpen
          this.myicon = this.leftDrawerOpen ? 'chevron_left' : 'chevron_right'
      }
  },
  computed: {
    menuData () {
      return menuData2
    }
  }
}
</script>

<style scoped>
.bars {
  background-color: var(--demo-bars-bkg, white);
  border-radius: var(--demo-bars-border-radius, 5px);
  box-shadow: var(--demo-bars-shadow, 0 0 20px black);
  padding: var(--demo-bars-padding, 8px);
  transition: .5s;
}
::v-deep.bars * {
  transition: font-size .1s linear, padding .1s linear, margin .1s linear;
}
</style>
