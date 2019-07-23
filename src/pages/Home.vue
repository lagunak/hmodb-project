<template>
  <f7-page>
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link panel-open="left" icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>H</f7-nav-title>
    </f7-navbar>

    <f7-block-title>Let's test current JSON</f7-block-title>

    <f7-list>
      <f7-list-input
        label="Default setup"
        type="datepicker"
        placeholder="Pick a date!"
        @change="dateString = $event.target.value"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block>{{ myDate }}</f7-block>

    <f7-list v-if="fittingEvents.lenght">
      <f7-list-item v-for="(ev, indexx) in fittingEvents" :title="ev" link="#" :key="indexx"></f7-list-item>
    </f7-list>
    <f7-block v-else>No events matching this date</f7-block>
  </f7-page>
</template>

<script>
import is_on from '../js/hmodb/parse.js'
import jsonDemo from '../js/hmodb/demoInfoJson.js'

var jsonn = jsonDemo

export default {
  data() {
    return {
      dateString: '2019-07-22',
      element: []
    }
  },
  computed: {
    myDate() {
      return new Date(this.dateString)
    },
    fittingEvents() {
      console.log('check if fitting in ' + this.myDate)
      var outputt = []
      jsonn.events.forEach(elem => {
        if (is_on(elem, new Date(this.myDate))) {
          outputt.push(elem.comment)
        }
      })
      console.log(outputt)
      return outputt
    },
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