<template>
  <div class="c4tgrid">
    <q-toolbar stretch class='bg-white menuover'>
        <vue-file-toolbar-menu :content='menu' />
      </q-toolbar>
      <q-banner dense class="bg-grey-1">
      <template v-slot:avatar>
        <q-icon name="mdi-database-outline" color="primary" />
      </template>
        <div class="text-h5 text-weight-bolder" v-if="!titleedit"
            v-on:dblclick="startEdit"
                >
            {{ myTitle }}
        </div>
        <input class="text-h5 text-weight-bolder"
            v-if="titleedit"
            @keyup.enter='endEdit'
            v-model="myTitle"/>
    </q-banner>
    <div class="c4tCore">
       <VueExcelEditor
        v-model="statsdata"
        no-finding
        no-finding-next
        no-footer
        no-header-edit
        :header-label="formattedHeaderLabel"
        free-select
      />
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Data Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="myTitle" autofocus @keyup.enter="newDataSet" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="$router.push('/')" />
          <q-btn flat label="Ok" v-close-popup @click="newDataSet()"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from 'boot/axios'
import VueFileToolbarMenu from 'vue-file-toolbar-menu'
import VueExcelEditor from 'components/GridVue/VueExcelEditor.vue'

console.log(VueExcelEditor)
var vueObject = null

const menuInformation = [
  {
    text: 'Data',
    menu: [
      {
        text: 'New',
        click: () => {
          vueObject.newData()
        }
      },
      { is: 'separator' },
      {
        text: 'Save',
        click: () => {
          if (vueObject.myTitle === '') {
            vueObject.prompt = true
          } else {
            vueObject.save()
          }
        }
      },
      { is: 'separator' },
      {
        text: 'Delete',
        click: () => {
          vueObject.$emit('deleteDataset', vueObject.id)
          console.log(vueObject.id)
          vueObject.isDelete = true
        }
      }
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
  name: 'DataGrid',
  components: { VueFileToolbarMenu, VueExcelEditor },
  data: function () {
    return {
        prompt: false,
        mydata: [],
        titleedit: false,
        myTitle: '',
        id: '',
        isDelete: false
    }
  },
  created: function () {
    if (typeof this.dataId === 'undefined' || this.dataId === '') {
      // console.log('New dataset')
        this.mydata = []
        for (var r = 0; r < 50; r++) {
          var dict = {};
          for (var c = 0; c < 26; c++) {
              dict[this.i_to_coll(c)] = ''
          }
          this.mydata.push(dict)
        }
        this.myTitle = ''
        this.id = uuidv4()
    } else {
      console.log('Look for data')
      this.id = this.dataId
      this.myTitle = this.title
      var mySelf = this
      var getData = { params: { id: this.id } }
      axiosInstance.get("getData", getData).then((response) => {
           mySelf.mydata = response.data.data.data
        })
    }
  },
  // beforeDestroy: function () {
  //   vueObject = this
  //     var mustSave = false
  //     this.mydata.forEach(element => {
  //         for (const [key, value] of Object.entries(element)) {
  //           if (key.indexOf('$') < 0) {
  //             if (value !== '') {
  //               mustSave = true
  //             }
  //           }
  //         }
  //     })
  //     if (mustSave) {
  //       var data = JSON.stringify(this.mydata)
  //       var postData = {
  //           data_id: this.id,
  //           title: this.myTitle,
  //           data: data
  //       }
  //       if (!this.isDelete) {
  //         axiosInstance.post("insert", postData).then((response) => {
  //             console.log(response.data.message)
  //         })
  //       }
  //     }
  // },
  computed: {
    menu () {
      vueObject = this
      return menuInformation
    },
    statsdata () {
      return this.mydata
    }
  },
  methods: {
    i_to_coll: (i) => {
      if (i < 26) {
            return String.fromCharCode(i + 65)
        } else {
          return String.fromCharCode(i / 26 + 64) + String.fromCharCode(i % 26 + 65)
      }
    },
    showData: function (id, title) {
      this.titleedit = false
      vueObject = this
          this.id = id
          this.myTitle = title
          if (typeof this.id === 'undefined' || this.id === '') {
          // console.log('New dataset')
            this.mydata = []
            for (var r = 0; r < 50; r++) {
              var dict = {};
              for (var c = 0; c < 26; c++) {
                  dict[this.i_to_coll(c)] = ''
              }
              this.mydata.push(dict)
            }
            this.myTitle = ''
            this.id = uuidv4()
        } else {
          console.log('Look for data')
          var mySelf = this
          var getData = { params: { id: this.id } }
          axiosInstance.get("getData", getData).then((response) => {
              mySelf.mydata = response.data.data.data
            })
        }
    },
    newData: function () {
      this.id = uuidv4()
      this.myTitle = ''
      this.mydata = []
            for (var r = 0; r < 50; r++) {
              var dict = {};
              for (var c = 0; c < 26; c++) {
                  dict[this.i_to_coll(c)] = ''
              }
              this.mydata.push(dict)
            }
    },
    startEdit: function (e) {
        console.log('Double click')
        console.log(this)
        this.titleedit = true
    },
    formattedHeaderLabel: (fieldLabel, fieldObject) => {
      return fieldLabel;
    },
    endEdit: function () {
          this.titleedit = false
          this.$emit('newDataset', this.myTitle, this.id, true)
          var data = JSON.stringify(this.mydata)
          var postData = {
              data_id: this.id,
              title: this.myTitle,
              data: data
          }
          axiosInstance.post("insert", postData).then((response) => {
              console.log(response.data.message)
          })
      },
    save: function () {
          this.titleedit = false
          if (this.myTitle === '') {
            this.$nextTick(() => {
              this.prompt = true
            })
            return
          }
          this.$emit('newDataset', this.myTitle, this.id, true)
          var data = JSON.stringify(this.mydata)
          var postData = {
              data_id: this.id,
              title: this.myTitle,
              data: data
          }
          axiosInstance.post("insert", postData).then((response) => {
              console.log(response.data.message)
          })
      },
    newDataSet: function () {
          this.prompt = false
          if (this.myTitle === '') {
            this.$nextTick(() => {
              this.prompt = true
            })
            return
          }
          this.$emit('newDataset', this.myTitle, this.id)
          var dataRaw = this.mydata
          var data = JSON.stringify(dataRaw)
          var postData = {
              data_id: this.id,
              title: this.myTitle,
              data: data
          }
          axiosInstance.post("insert", postData).then((response) => {
            console.log(response.data.message)
          })
      }
  }
}
</script>

<style scoped>
.c4tgrid {
    position: absolute;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3em;
    height: 95vh;
}
.menuover {
  z-index: 20000;
}
.c4tCore{
  margin-top: 20px;
  display: inline-block;
  overflow: auto;
  height: 80vh;
}
</style>
