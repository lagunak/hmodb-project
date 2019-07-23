<template>
  <div>
    <f7-page>
      <f7-navbar
        :title="event.time_start + ' - ' + event.type"
        back-link="Events"
        :back-link-force="true"
      ></f7-navbar>
      <f7-block-title>Patterns</f7-block-title>
      <!-- <f7-block-title>{{ event.time_start + ' - ' + event.type }}</f7-block-title> -->

      <f7-list>
        <f7-list-item
          v-for="(pattern, index) in eventPatterns"
          :header="pattern.type"
          :title="pattern.description"
          :key="index"
          link="/xxx/"
          after="Edit"
          :link="'/pattern/' + JSON.stringify(pattern)"
        ></f7-list-item>
      </f7-list>
      <f7-button fill href="/pattern/xxxx">Add new...</f7-button>
    </f7-page>
  </div>
</template>

<script>
import jsonDemo from '../js/hmodb/demoInfoJson.js'

var jsonn = jsonDemo
export default {
  data() {
    return {
      key: 'value',
      event: []
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    eventPatterns() {
      var outputt = []
      jsonn.events.forEach(event => {
        if (event.id == this.id) {
          outputt = event.advanced
          this.event = event
        }
      })
      console.log(outputt)
      return outputt
    }
  }
}
</script>

<style lang="scss" scoped>
</style>