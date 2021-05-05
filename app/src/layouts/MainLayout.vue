<template>
  <q-layout view='hHh lpR fFf'>
    <q-header elevated>
      <q-toolbar class="q-electron-drag">
        <q-toolbar-title>
          F-Stat <q-badge align="top">v1.0.0</q-badge>
        </q-toolbar-title>
         <q-space />
         <q-btn dense flat icon="apps" @click="testElectron" />
        <q-btn dense flat icon="expand_more" @click="minimize" />
        <q-btn dense flat icon="expand_less" @click="maximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
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
          v-for='link in linksData'
          :key='link.title'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view @mensajeFromRoute="childMensajeFromRoute"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import DataHouse from 'components/DataHouse.vue'
const { ipcRenderer } = require('electron')
// import MenuToolbar from 'components/MenuToolbar.vue'
import VueFileToolbarMenu from 'vue-file-toolbar-menu'
// const linksData = [
//   {
//     title: 'F-Stat',
//     caption: 'Start page',
//     icon: 'home',
//     link: '/'
//   },
//   {
//     title: 'Grid',
//     caption: 'No Name',
//     icon: 'folder',
//     link: '/peyote'
//   }
// ]

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
      linksData: [
        {
          title: 'F-Stat',
          caption: 'Start page',
          icon: 'home',
          link: '/'
        },
        {
          title: 'Grid',
          caption: 'No Name',
          icon: 'folder',
          link: '/peyote'
        }
      ]
      // DataHouse: linksData
    }
  },
  methods: {
      sideMenu: function () {
          this.leftDrawerOpen = !this.leftDrawerOpen
          this.myicon = this.leftDrawerOpen ? 'chevron_left' : 'chevron_right'
      },
      childMensajeFromRoute: function (arg1, arg2) {
        console.log('Arg1: ' + arg1)
        console.log('Arg2: ' + arg2)
        this.linksData.push({
          title: 'Grid',
          caption: 'No Name',
          icon: 'folder',
          link: '/peyote'
        })
      },
      minimize: function () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },
      testElectron: function () {
      console.log('Open Bokeh')
      alert(ipcRenderer.sendSync('getPath'))
      this.$router.push('/bokeh')
    },
    maximize: function () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },
    closeApp: function () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
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
