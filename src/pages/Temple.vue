<template>
  <f7-page>
    <f7-navbar title="Temple">
      <f7-link back>Cancel</f7-link>
    </f7-navbar>
    <f7-block-title>Temple</f7-block-title>

    <f7-block>ID: {{ temple_id }}</f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      temple_data: { events: [] } //default value with events key
    }
  },
  props: {
    temple_id: {
      type: String,
      default: 0
    }
  },
  mounted() {
    fetch(
      'http://thecatholicdb.com/api/select.php?json={"apiKey":"invited034","sql":"select json from temples where temple_id=' +
        this.temple_id +
        '"}'
    )
      .then(response => response.json())
      .then(data => {
        this.temple_data = JSON.parse(decodeURIComponent(data[0].json))
      })
  }
}
</script>

<style lang="scss" scoped>
</style>