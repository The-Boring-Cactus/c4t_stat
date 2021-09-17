<template>
  <q-layout view='hHh lpR fFf'>
    <q-header elevated>
      <q-toolbar class="q-electron-drag">
        <q-toolbar-title>
          F-Stat <q-badge align="top">v1.0.0</q-badge>
        </q-toolbar-title>
         <q-space />
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
        <vue-file-toolbar-menu :content='menu' />
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
          v-for='link in datanav'
          :key='link.id'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view @newDataset="newDataset"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import DataHouse from 'components/DataHouse.vue'
import VueFileToolbarMenu from 'vue-file-toolbar-menu'

var vueObject = null

const menuInformation = [
  {
    text: 'Data',
    menu: [
      {
        text: 'New',
        click: () => {
          console.log('new')
          vueObject.$router.push('/').catch(err => {
            console.log(err)
          })
          vueObject.$nextTick(() => {
            vueObject.$router.push('/data').catch(err => {
              console.log(err)
            })
          })
        }
      },
      { is: 'separator' },
      { text: 'Delete', click: () => alert('Youre amazing, ' + (prompt('Whats your name?') || 'friend') + '!') }
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
      datainfo: [
      ]
      // DataHouse: linksData
    }
  },
  methods: {
      sideMenu: function () {
          this.leftDrawerOpen = !this.leftDrawerOpen
          this.myicon = this.leftDrawerOpen ? 'chevron_left' : 'chevron_right'
      },
      newDataset: function (arg1, arg2) {
        console.log('Arg1: ' + arg1)
        console.log('Arg2: ' + arg2)
        this.datainfo.push({
          title: arg1,
          caption: 'Data set',
          id: arg2,
          icon: 'mdi-file-tree',
          link: '/data?id=' + arg2 + '&title=' + arg1
        })
      },
      testElectron: function () {
      console.log('Open Bokeh')
      // alert(ipcRenderer.sendSync('getPath'))
      this.$router.push('/bokeh')
    }
  },
  mounted: function () {
    vueObject = this
    setTimeout(function () {
      pywebview.api.getMenu().then((response) => {
        for (var menu of response.menu) {
          vueObject.datainfo.push({
            title: menu.title,
            caption: 'Data set',
            id: menu.id,
            icon: 'mdi-file-tree',
            link: '/data?id=' + menu.id + '&title=' + menu.title
          })
        }
        vueObject.$q.loading.hide()
      })
    }, 500)
  },
  created: function () {
    this.$q.loading.show()
  },
  computed: {
    menu () {
      vueObject = this
      return menuInformation
    },
    datanav () {
      return this.datainfo
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
