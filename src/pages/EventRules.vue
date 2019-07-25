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

      <f7-block-title>Others</f7-block-title>
      <f7-list>
        <f7-list-input
          label="Type"
          type="select"
          :defaultValue="event.type"
          placeholder="Please choose..."
          @change="event.type = $event.target.value"
        >
          <option value="Mass">Mass</option>
          <option value="Confession">Confession</option>
          <option value="Adoration">Adoration</option>
        </f7-list-input>

        <div class="block-title">Time</div>
        <div class="list no-hairlines-md">
          <ul>
            <li>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <input
                      type="text"
                      placeholder="Start Time"
                      readonly="readonly"
                      :value="event.time_start"
                      @change="event.time_start = $event.target.value"
                      id="time_picker"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <f7-list-input
          label="Comment"
          type="text"
          placeholder="Overview of this Event"
          :value="event.comment"
          @change="event.comment = $event.target.value"
          clear-button
        ></f7-list-input>

        <f7-list-input
          type="colorpicker"
          label="Color"
          placeholder="Color"
          @change="event.color = $event.target.value"
          :value="{ hex: event.color }"
        ></f7-list-input>
      </f7-list>
    </f7-page>
  </div>
</template>

<script>
import { jsonDemo } from '../js/hmodb/demoInfoJson.js'

var jsonn = jsonDemo
export default {
  data() {
    return {
      key: 'value',
      event: []
    }
  },
  props: {
    event_id: {
      type: String,
      default: ''
    }
  },
  computed: {
    eventPatterns() {
      var outputt = []
      jsonn.events.forEach(event => {
        if (event.id == this.event_id) {
          outputt = event.advanced //return the patterns ("advanced")
          this.event = event
        }
      })
      console.log(outputt)
      return outputt
    }
  },
  mounted() {
    var pickerDescribe = this.$f7.picker.create({
      inputEl: '#time_picker',
      rotateEffect: true,
      formatValue(values, displayValues) {
        return values[0] + ':' + values[1]
      },
      cols: [
        {
          textAlign: 'left',
          values: '0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23'.split(
            ' '
          )
        },
        {
          divider: true,
          content: ':'
        },
        {
          values: '00 15 30 45'.split(' ')
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
</style>