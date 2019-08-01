<template>
  <f7-page>
    <f7-navbar title="Agenda">
      <f7-link back>Cancel</f7-link>
    </f7-navbar>
    <f7-block-title>Agenda</f7-block-title>

    <f7-list>
      <f7-list-item
        v-for="(event, index) in events"
        :title="event.time_start + ' - ' + event.type"
        :link="'/advanced/id/' + event.id"
        :key="index"
        :badge="event.advanced.length"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  props: {
    temple_id: {
      type: String,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
