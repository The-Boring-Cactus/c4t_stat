<template>
  <div class="c4tgrid">
      <q-banner dense class="bg-grey-1">
      <template v-slot:avatar>
        <q-icon name="signal_wifi_off" color="primary" />
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
      <table class="c4tCore">
      <thead>
          <th/>
          <th v-for="col in allColums"
          :key="col.keys" >
          <div class="relative">
              <span class="colHeader" :col ="col.key">
                  {{col.title}}
              </span>
              <div class="manualColumnResizer" />
          </div>
          </th>
      </thead>
      <tbody>
          <tr v-for="row in allRow" :key="row.row">
              <th>{{row.row}}</th>
            <td v-for="col in row.data" :key="col.col" >
                <input :ref = "'r' + row.row + '_c' + col.col" :id = "'r' + row.row + '_c' + col.col"
                :r = "row.row"
                :c = "col.col"
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
</template>

<script>
var VueScrollTo = require('vue-scrollto')

export default {
  name: 'DataGrid',
  props: {
    dataId: {
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
      cols: [],
      rows: [],
      titleedit: false,
      myTitle: 'Unknown'
    }
  },
  created: function () {
    if (typeof this.dataId === 'undefined' || this.dataId === '') {
      console.log('New dataset')
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
                var tmpC = { col: cc, data: '' }
                rc.push(tmpC)
            }
            var row = { row: r, data: rc }
            rme.push(row)
        }
        this.rows = rme
    } else {
      console.log('Look for data')
    }
  },
  computed: {
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
              e.data.push({ col: c, data: '' })
              rowLocal.push(e)
           })
           this.rows = rowLocal
      },
      addRow: function () {
          var r = this.rows.length + 1
          var c = this.cols.length
          var rc = []
            for (var cc = 0; cc < c; cc++) {
                var tmpC = { col: cc, data: '' }
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
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3em;
    font-size: 13px;
}

.c4tgrid * {
    box-sizing: content-box;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
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

.c4tgrid th,
.c4tgrid td {
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    height: 22px;
    line-height: 21px;
    padding: 0 4px 0 4px;
    background-color: #FFF;
    font-size: 12px;
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
/* textarea border color */

textarea.c4tgridInput {
    border: 2px solid #5292F7;
    outline-width: 0;
    margin: 0;
    padding: 1px 4px 0 2px;
    font-family: Arial, Helvetica, sans-serif;
    /*repeat from .c4tgrid (inherit doesn't work with IE<8) */
    line-height: 1.3em;
    font-size: 13px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
    resize: none;
    /*below are needed to overwrite stuff added by jQuery UI Bootstrap theme*/
    display: inline-block;
    font-size: 13px;
    line-height: inherit;
    color: #000;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
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
    background: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    padding: 0px;
    box-sizing: border-box;
    margin: 0px;
}

.c4tgrid input:focus {
    border: 1px solid #07c;
    box-shadow: 0 0 5px #07c;
    padding: 0px;
    margin: 0px;
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
