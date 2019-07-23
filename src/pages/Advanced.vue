<template>
  <div>
    <f7-page>
      <f7-navbar title="Advanced" back-link="Back" :back-link-force="true"></f7-navbar>
      <f7-block>{{ element.time_start + ' - ' + element.type }}</f7-block>

      <f7-list>
        <f7-list-item
          v-for="(ad, index) in advancedData"
          :header="ad.type"
          :title="ad.description"
          :key="index"
          link="/xxx/"
          after="Edit"
          :link="'/pattern/' + JSON.stringify(ad)"
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
      element: []
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    advancedData() {
      var outputt = []
      jsonn.events.forEach(element => {
        if ((element.id = this.id)) {
          outputt = element.advanced
          this.element = element
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