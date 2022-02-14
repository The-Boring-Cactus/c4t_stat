<template>
  <q-layout view='hHh lpR fFf'>
    <q-header elevated>
      <q-toolbar class="q-electron-drag">
        <q-btn
          flat
          dense
          round
          :icon='myicon'
          aria-label='Menu'
          @click='sideMenu'
        />
        <q-toolbar-title>
          F-Stat <q-badge align="top">v1.0.0</q-badge>
        </q-toolbar-title>
         <q-space />
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
          @naviGate="naviGate"
          v-for='link in datanav'
          :key='link.id'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <DataGrid ref="datagrid" @newDataset="newDataset" @deleteDataset="deleteDataset"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import DataHouse from 'components/DataHouse.vue'
import DataGrid from 'components/DataGrid.vue'
import { axiosInstance } from 'boot/axios'
var vueObject = null

export default {
  name: 'MainLayout',
  components: { DataHouse, DataGrid },
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
      deleteDataset: function (arg1) {
        this.datainfo.splice(this.datainfo.findIndex(item => item.id === arg1), 1)
        this.$refs.datagrid.showData()
      },
      naviGate: function (id, title) {
          this.$refs.datagrid.showData(title, id)
      },
      newDataset: function (arg1, arg2, arg3) {
        console.log('Arg1: ' + arg1)
        console.log('Arg2: ' + arg2)
        if (!arg3) {
          this.datainfo.push({
            title: arg1,
            caption: 'Data set',
            id: arg2,
            icon: 'mdi-file-tree',
            graphs: [],
            results: []
          })
        } else {
          this.datainfo.forEach(e => {
            if (e.id === arg2) {
              e.title = arg1
            }
          })
        }
      }
  },
  mounted: function () {
    vueObject = this
    setTimeout(function () {
      axiosInstance.get("getMenu").then((response) => {
        console.log(response)
        for (var menu of response.data.menu) {
          vueObject.datainfo.push({
            title: menu.title,
            caption: 'Data set',
            id: menu.id,
            icon: 'mdi-file-tree',
            graphs: [],
            results: []
          })
        }
        if (vueObject.datainfo.length === 0) {
            vueObject.$refs.datagrid.showData()
        }
        vueObject.$q.loading.hide()
      })
    }, 500)
  },
  created: function () {
    this.$q.loading.show()
  },
  computed: {
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
