<template>
  <q-page padding>
    <q-btn dense flat icon="apps" @click="creategraph1" />
    <q-btn dense flat icon="apps" @click="creategraph2" />
    <bokeh-plot :div="div" :script="script"></bokeh-plot>
  </q-page>
</template>
<script>
import BokehPlot from '../components/BokehPlot'
// const { ipcRenderer } = require('electron')

export default {
  components: { BokehPlot },
  name: 'Bokeh',
  data: function () {
    return {
      div: '',
      script: ''
    }
  },
  created: function () {
    console.log('create')
  },
  methods: {
    creategraph1: function () {
      pywebview.api.sayHelloTo('Bokeh').then((response) => {
        console.log(response.message)
      })
      // const myself = this
      // ipcRenderer.send('testGraph', 'scripts.test2', 'Titulo1')
      // ipcRenderer.once('testGraph-reply', (event, arg) => {
      //   console.log(arg)
      //   myself.div = arg.div
      //   myself.script = arg.script
      // })
    },
    creategraph2: function () {
      // const myself = this
      // ipcRenderer.send('testGraph', 'scripts.test1', 'Titulo2')
      // ipcRenderer.once('testGraph-reply', (event, arg) => {
      //   console.log(arg)
      //   myself.div = arg.div
      //   myself.script = arg.script
      // })
    }
  }
}
</script>
