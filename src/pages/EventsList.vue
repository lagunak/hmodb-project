<template>
  <div>
    <f7-page>
      <f7-navbar title="Events"></f7-navbar>
      <f7-block-title>Your events</f7-block-title>
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
  </div>
</template>

<script>
import jsonDemo from '../js/hmodb/demoInfoJson.js'

var jsonn = jsonDemo
//console.log(jsonn);
export default {
  data() {
    return {
      events: jsonn.events
    }
  }
}
</script>

<style lang="scss" scoped>
</style>