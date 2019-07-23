<template>
  <div>
    <f7-page>
      <f7-navbar title="Pattern" back-link="Back" :back-link-force="true"></f7-navbar>
      <f7-block>{{ JSON.stringify(pattern) }}</f7-block>
    </f7-page>
  </div>
</template>

<script>
export default {
  props: {
    patternString: {
      type: String,
      default: '{}'
    }
  },
  computed: {
    pattern() {
      return JSON.parse(this.patternString)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>