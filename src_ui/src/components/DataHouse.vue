<template>
  <q-item
    clickable
    tag="a"
    @click="navigate(link)"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'DataHouse',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '/'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    navigate (e) {
      this.$router.push('/').catch(err => {
            console.log(err)
          })
          this.$nextTick(() => {
            this.$router.push(e).catch(err => {
              console.log(err)
            })
          })
    }
  }
}
</script>
