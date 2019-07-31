<template>
  <f7-page :page-content="false" @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link panel-open="left" icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu"></f7-link>
      </f7-nav-left>
      <f7-nav-title class="navbar-calendar-title" sliding></f7-nav-title>
      <!-- <f7-nav-title sliding>RT</f7-nav-title> -->

      <f7-nav-right>
        <f7-link @click="goToToday()">Center</f7-link>
      </f7-nav-right>
      <!-- <f7-nav-title sliding>RT</f7-nav-title>
      <f7-nav-title-large>RT</f7-nav-title-large>-->
    </f7-navbar>

    <div class="page-content">
      <div id="calendar" class="block block-strong no-padding no-margin no-hairline-top"></div>
      <f7-list id="calendar-events" class="no-margin no-hairlines no-safe-area-left">
        <f7-list-item
          v-for="(item, index) in todayItems"
          :key="index"
          :title="item.title"
          :after="item.event_id"
        >
          <div class="event-color" :style="{'background-color': item.color}" slot="root-start"></div>
        </f7-list-item>
        <f7-list-item v-if="todayItems.length === 0">
          <span class="text-color-gray" slot="title">No events for this day</span>
        </f7-list-item>
      </f7-list>
      <button @click="refreshCalendarTest">Refresh</button>
    </div>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7NavTitle,
  f7List,
  f7ListItem
} from 'framework7-vue'

/*
import { jsonDemo } from '../js/hmodb/demoInfoJson.js'
var jsonn = jsonDemo
*/
import is_on from '../js/hmodb/parse.js'

export default {
  components: {
    f7Navbar,
    f7Page,
    f7NavTitle,
    f7List,
    f7ListItem
  },

  data() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return {
      today: new Date(year, month, day),
      //events: info.events,
      //myDotEvents: [],
      eventsOld2: [
        {
          date: new Date(year, month, day),
          hours: 12,
          minutes: 30,
          title: 'Meeting with Vladimir',
          color: '#2196f3'
        },
        {
          date: new Date(year, month, day),
          hours: 18,
          minutes: 0,
          title: 'Shopping',
          color: '#4caf50'
        },
        {
          date: new Date(year, month, day),
          hours: 21,
          minutes: 0,
          title: 'Gym',
          color: '#e91e63'
        },
        {
          date: new Date(year, month, day),
          hours: 7,
          minutes: 45,
          title: 'Email',
          color: '#e91e63'
        },
        {
          date: new Date(year, month, day + 2),
          hours: 16,
          minutes: 0,
          title: 'Pay loan',
          color: '#2196f3'
        },
        {
          date: new Date(year, month, day + 2),
          hours: 21,
          minutes: 0,
          title: 'Gym',
          color: '#ff9800'
        },
        {
          date: new Date(year, month, day + 9),
          hours: 21,
          minutes: 0,
          title: 'Kaixo',
          color: '#ff9800'
        }
      ],
      todayItems: [] //items happenning in selected date
    }
  },
  computed: {
    info() {
      return this.$store.state.info
    },
    events() {
      return this.info.events
    }
  },
  methods: {
    refreshCalendarTest() {
      this.calendar.init()
      alert('this doesnt really work...')
    },
    refreshDotEvents(calendar) {
      console.log('dot events A', this.myDotEvents)
      const self = this
      console.log('CURRENT MONTH:', calendar.currentMonth)
      var year = calendar.currentYear
      var month = calendar.currentMonth
      var day = 15 //in the middle of the monht :)
      var dotEvAux = []
      for (let offset = -40; offset < 40; offset++) {
        var auxDate = new Date(year, month, day + offset)
        if (self.events != undefined) {
          self.events.forEach(event => {
            if (is_on(event, auxDate)) {
              console.log('MATCH ---- ', auxDate)
              dotEvAux.push({
                date: auxDate,
                color: event.color
              })
            }
          })
        }
      }
      return dotEvAux
      //console.log('dot events B', this.myDotEvents)
    },
    goToToday() {
      var todayy = new Date()
      //this.calendar.setValue([todayy]);  //this does not trigger change events, removing for now.
      this.calendar.setYearMonth(todayy.getFullYear(), todayy.getMonth(), 10)
      //this.calendar.update();
      //this.renderEvents(this.calendar);
    },

    renderEvents(calendar) {
      //list events happening in selected date :)
      const self = this
      const currentDate = calendar.value[0]

      console.log(currentDate, currentDate.getTime())
      const currentEvents = []

      if (self.events != undefined) {
        self.events.forEach(event => {
          if (is_on(event, currentDate)) {
            currentEvents.push(event)
          }
        })
      }

      console.log('AAAAAAA', currentEvents)
      const todayItems = []
      if (currentEvents.length) {
        currentEvents.forEach(event => {
          var titlee = event.time_start + ' - ' + event.type
          todayItems.push({
            title: titlee,
            event_id: event.id,
            color: event.color
          })
        })
      }
      self.todayItems = todayItems
    },
    onPageInit(e, page) {
      const self = this
      const app = self.$f7
      const $ = self.$$
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      self.calendar = app.calendar.create({
        containerEl: '#calendar',
        toolbar: false,
        value: [self.today],
        //events: self.myDotEvents, //self.eventsOld2, //self.events,
        //dateFormat: 'yyyy-mm-dd',
        on: {
          init(calendar) {
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(app.navbar.getElByPage(page.el))
            calendar.$el.addClass('no-safe-area-right')
            self.renderEvents(calendar)
          },
          opened(calendar) {
            calendar.params.events = self.refreshDotEvents(calendar)
            calendar.update()
          },
          monthYearChangeEnd(calendar) {
            calendar.params.events = self.refreshDotEvents(calendar)
            calendar.update()
          },
          monthYearChangeStart(calendar) {
            console.log('month changed 1')
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(app.navbar.getElByPage(page.el))

            //self.renderEvents(calendar)
            //calendar.update()

            console.log('evvvent', calendar.events)
          },
          change(calendar) {
            self.renderEvents(calendar)
          }
        }
      })
    },
    onPageBeforeRemove() {
      console.log('BeforeRemove')
      const self = this
      self.calendar.destroy()
    }
  },
  mounted() {
    console.log('mounteeeeed')
  }
}
</script>




<style scoped>
#calendar-events .event-color {
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
}
</style>