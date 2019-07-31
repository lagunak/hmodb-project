<template>
  <f7-page>
    <f7-block>
      <input v-model="id" />
      <button @click="downalodNow">Download</button>
    </f7-block>
    <f7-block>{{ infoJson }}</f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      id: 4
    }
  },
  computed: {
    infoJson() {
      return JSON.stringify(this.$store.state.info)
    }
  },
  methods: {
    downalodNow() {
      this.$store.dispatch({ type: 'downloadInfo', id: this.id })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>