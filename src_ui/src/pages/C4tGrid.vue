<template>
  <div class="c4tgrid">
    <q-toolbar stretch class='bg-white'>
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
      <table>
      <thead>
          <th/>
          <th v-for="col in allColums"
          :key="col.keys" >
          <div class="relative">
              <input class="colHeader" :col ="col.key" v-model="col.title" />
          </div>
          </th>
      </thead>
      <tbody>
          <tr v-for="row in allRow" :key="row.row">
              <th>{{row.row}}</th>
            <td v-for="col in row.data" :key="col.c" >
                <input :ref = "'r' + row.row + '_c' + col.c" :id = "'r' + row.row + '_c' + col.c"
                :r = "row.row"
                :c = "col.c"
                v-model="col.d"
                @keyup.enter='enterPressed'
                @keyup.up='upPressed'
                @keyup.down='downPressed'
                @keyup.left='leftPressed'
                @keyup.right='rightPressed'/>
            </td>
          </tr>
      </tbody>
    </table>
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
var VueScrollTo = require('vue-scrollto')
import { axiosInstance } from 'boot/axios'
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
  name: 'C4tGrid',
  components: { VueFileToolbarMenu },
  props: {
    dataId: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    data: {
      type: Array,
      required: false
    }
  },
  data: function () {
    return {
        prompt: false,
        cols: [],
        rows: [],
        titleedit: false,
        myTitle: '',
        id: ''
    }
  },
  created: function () {
    if (typeof this.dataId === 'undefined' || this.dataId === '') {
      // console.log('New dataset')
        var me = []
        for (var c = 0; c < 26; c++) {
            var tmp = { key: c, title: this.i_to_coll(c) }
            me.push(tmp)
        }
        this.cols = me
        var rme = []
        for (var r = 1; r <= 50; r++) {
            var rc = []
            for (var cc = 0; cc < 26; cc++) {
                var tmpC = { c: cc, d: '' }
                rc.push(tmpC)
            }
            var row = { row: r, data: rc }
            rme.push(row)
        }
        this.rows = rme
        this.prompt = true
        this.id = uuidv4()
    } else {
      console.log('Look for data')
      this.id = this.dataId
      this.myTitle = this.title
      var mySelf = this
      var getData = { params: { id: this.id } }
      axiosInstance.get("getData", getData).then((response) => {
           mySelf.cols = response.data.data.data.cols
           mySelf.rows = response.data.data.data.rows
        })
    }
  },
  beforeDestroy: function () {
      var dataRaw = { cols: this.cols, rows: this.rows }
      var data = JSON.stringify(dataRaw)
      var postData = {
          data_id: this.id,
          title: this.myTitle,
          data: data
      }
      console.log(postData)
      axiosInstance.post("insert", postData).then((response) => {
          console.log(response.data.message)
      })
  },
  computed: {
    menu () {
      vueObject = this
      return menuInformation
    },
      allColums: function () {
          return this.cols
      },
       allRow: function () {
          return this.rows
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
        int: (i) => {
        return Number.parseInt(i, 10)
      },
      endEdit: function () {
            this.titleedit = false
        },
      addCol: function () {
          var c = this.cols.length
          var tmp = { key: c, title: this.i_to_coll(c) }
          this.cols.push(tmp)
          var rowLocal = []
          this.rows.forEach(e => {
              e.data.push({ c: c, d: '' })
              rowLocal.push(e)
           })
           this.rows = rowLocal
      },
      addRow: function () {
          var r = this.rows.length + 1
          var c = this.cols.length
          var rc = []
            for (var cc = 0; cc < c; cc++) {
                var tmpC = { c: cc, d: '' }
                rc.push(tmpC)
            }
            var row = { row: r, data: rc }
            this.rows.push(row)
      },
      setFocus: function (element) {
          this.$refs[element][0].focus()
      },
      enterPressed: function (e) {
        //   console.log('Enter Press')
        // this.$emit('mensajeFromRoute', 'Enter', 'Se preciono')
          var rCount = this.rows.length
          var cCount = this.cols.length - 1
          var id = e.target.id.replace('r', '').replace('c', '').split('_')
          var r = Number.parseInt(id[0], 10)
          var c = Number.parseInt(id[1], 10)
          var newRow = 1
          var cell = 'r' + newRow + '_c' + c
          if (rCount === r) {
              newRow = 1
              if (cCount === c) {
                    this.addCol()
                    this.$nextTick(() => {
                        var newCol = c + 1
                        var cell = 'r' + newRow + '_c' + newCol
                        this.setFocus(cell)
                    })
                } else {
                    var newCol = c + 1
                    cell = 'r' + newRow + '_c' + newCol
                    this.setFocus(cell)
                }
          } else {
              newRow = r + 1
              cell = 'r' + newRow + '_c' + c
              this.setFocus(cell)
          }
      },
      saveData: function () {
          var dataRaw = { cols: this.cols, rows: this.rows }
          var data = JSON.stringify(dataRaw)
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
          this.$emit('newDataset', this.myTitle, this.id)
          var dataRaw = { cols: this.cols, rows: this.rows }
          var data = JSON.stringify(dataRaw)
          var postData = {
              data_id: this.id,
              title: this.myTitle,
              data: data
          }
          axiosInstance.post("insert", postData).then((response) => {
            console.log(response.data.message)
          })
      },
      upPressed: function (e) {
        //   console.log('Up Press')
          var id = e.target.id.replace('r', '').replace('c', '').split('_')
          var r = Number.parseInt(id[0], 10) - 1
          var c = Number.parseInt(id[1], 10)
          if (r >= 1) {
              var cell = 'r' + r + '_c' + c
              this.setFocus(cell)
          }
      },
      downPressed: function (e) {
        //   console.log('Down Press')
          var rCount = this.rows.length
          var id = e.target.id.replace('r', '').replace('c', '').split('_')
          var r = Number.parseInt(id[0], 10)
          var c = Number.parseInt(id[1], 10)
          if (rCount === r) {
              this.addRow()
              this.$nextTick(() => {
                  var newRow = r + 1
                  var cell = 'r' + newRow + '_c' + c
                  this.setFocus(cell)
                  VueScrollTo.scrollTo('#r' + newRow + '_c' + c, 0.1, {
                    container: 'q-app',
                    duration: 500,
                    easing: 'ease',
                    offset: 0,
                    force: true,
                    cancelable: true,
                    onStart: false,
                    onDone: false,
                    onCancel: false,
                    x: false,
                    y: true
                })
            })
          } else {
              var newRow = r + 1
              var cell = 'r' + newRow + '_c' + c
              this.setFocus(cell)
          }
      },
      leftPressed: function (e) {
        //   console.log('Left Press')
          var id = e.target.id.replace('r', '').replace('c', '').split('_')
          var r = Number.parseInt(id[0], 10)
          var c = Number.parseInt(id[1], 10) - 1
          if (c >= 0) {
              var cell = 'r' + r + '_c' + c
              this.setFocus(cell)
          }
      },
      rightPressed: function (e) {
        //   console.log('Right Press')
          var cCount = this.cols.length - 1
        //   var rCount = this.rows.length
          var id = e.target.id.replace('r', '').replace('c', '').split('_')
          var r = Number.parseInt(id[0], 10)
          var c = Number.parseInt(id[1], 10)
          if (cCount === c) {
              this.addCol()
              this.$nextTick(() => {
                  var newCol = c + 1
                  var cell = 'r' + r + '_c' + newCol
                  this.setFocus(cell)
            })
          } else {
              var newCol = c + 1
              var cell = 'r' + r + '_c' + newCol
              this.setFocus(cell)
          }
      },
      startEdit: function (e) {
          console.log('Double click')
          console.log(this)
          this.titleedit = true
      }
    }
}
</script>

<style scoped>
.c4tgrid {
    position: absolute;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3em;
    height: 95%;
}

.c4tCore{
  margin-top: 20px;
  display: inline-block;
  overflow: auto;
  height: 80%;
}

.c4tgrid table {
    border-collapse: separate;
    position: relative;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    border-spacing: 0;
    margin: 0;
    border-width: 0;
    table-layout: fixed;
    outline-width: 0;
}

.c4tgrid .rowHeader {
    width: 50px;
}

.c4tgrid th{
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    border-top: 1px solid #CCC;
    height: 22px;
    line-height: 21px;
    background-color: #FFF;
    font-size: 0.85rem;
    vertical-align: top;
    overflow: hidden;
    outline-width: 0;
    width: 50px;
}
.c4tgrid td {
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    height: 22px;
    line-height: 21px;
    background-color: #FFF;
    font-size: 0.75rem;
    vertical-align: top;
    overflow: hidden;
    outline-width: 0;
    width: 50px;
}

.c4tgrid th:last-child {
    /*Foundation framework fix*/
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
}

.c4tgrid tr:first-child th.htNoFrame,
.c4tgrid th:first-child.htNoFrame,
.c4tgrid th.htNoFrame {
    border-left-width: 0;
    background-color: white;
    border-color: #FFF;
}

.c4tgrid th:first-child,
.c4tgrid td:first-child,
.c4tgrid .htNoFrame+th,
.c4tgrid .htNoFrame+td {
    border-left: 1px solid #CCC;
}

.c4tgrid tr:first-child th,
.c4tgrid tr:first-child td {
    border-top: 1px solid #CCC;
}

.c4tgrid thead tr:last-child th {
    border-bottom-width: 0;
}

.c4tgrid thead tr.lastChild th {
    border-bottom-width: 0;
}

.c4tgrid th {
    background-color: #EEE;
    color: #222;
    text-align: center;
    font-weight: normal;
    white-space: nowrap;
}

.c4tgrid th .small {
    font-size: 12px;
}

.c4tgrid thead th {
    padding: 0;
}

.c4tgrid th.active {
    background-color: #CCC;
}

.c4tgrid thead th .relative {
    position: relative;
    padding: 2px 4px;
}

.c4tgrid .inline {
    box-sizing: border-box;
}

.c4tgrid .manualColumnResizer {
    position: absolute;
    right: -1px;
    top: 0;
    background-color: transparent;
    width: 5px;
    height: 25px;
    z-index: 999;
    cursor: col-resize;
}

.c4tgrid th .manualColumnResizer:hover,
.c4tgrid .manualColumnResizerLine .manualColumnResizer {
    background-color: #AAB;
}
/* border line */

.c4tgrid .wtBorder {
    position: absolute;
    font-size: 0;
}

.c4tgrid td.area {
    background-color: #EEF4FF;
}

.c4tgridInputHolder {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
}
/*
  NumericRenderer
  */

.c4tgrid .htNumeric {
    text-align: right;
}

.c4tgrid input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0px;
     -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
         box-sizing: border-box;
    margin: 0px;
}

.c4tgrid input:focus {
    padding: 0px;
    margin: 0px;
    background: #F8F8F8;
    border: 1px solid #217068 !important;
    /* width: auto; */
}

/**
   * dragdealer
   */

.c4tgrid .dragdealer {
    position: relative;
    width: 9px;
    height: 9px;
    background: #F8F8F8;
    border: 1px solid #DDD;
}

.c4tgrid .dragdealer .handle {
    position: absolute;
    width: 9px;
    height: 9px;
    background: #C5C5C5;
}

.c4tgrid .dragdealer .disabled {
    background: #898989;
}
</style>
