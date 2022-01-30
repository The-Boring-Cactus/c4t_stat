<template>
  <div v-html="div" />
</template>

<script>
export default {
  name: 'BokehPlot',
  props: {
    div: {
      type: String,
      default: ''
      },
    script: {
      type: String
    }
  },
  methods:  {
    createGraph: function() {
      eval(this.script)
    }
  },
  watch: { 
    script: function(newVal, oldVal) {
      this.createGraph()
    }
  },
  computed: {
      mydiv: function () {
          return this.plot.div
      }
  }
}
</script>
