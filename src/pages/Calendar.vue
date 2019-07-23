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
          v-for="(item, index) in eventItems"
          :key="index"
          :title="item.title"
          :after="item.time"
        >
          <div class="event-color" :style="{'background-color': item.color}" slot="root-start"></div>
        </f7-list-item>
        <f7-list-item v-if="eventItems.length === 0">
          <span class="text-color-gray" slot="title">No events for this day</span>
        </f7-list-item>
      </f7-list>
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
      events: [
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
        }
      ],
      eventItems: []
    }
  },
  methods: {
    goToToday() {
      var todayy = new Date()
      //this.calendar.setValue([todayy]);
      this.calendar.setYearMonth(todayy.getFullYear(), todayy.getMonth(), 10)
      //this.calendar.update();
      //this.renderEvents(this.calendar);
    },
    renderEvents(calendar) {
      //include the events that happend today
      const self = this
      const currentDate = calendar.value[0]
      const currentEvents = self.events.filter(
        event =>
          event.date.getTime() >= currentDate.getTime() &&
          event.date.getTime() < currentDate.getTime() + 24 * 60 * 60 * 1000
      )
      const eventItems = []
      if (currentEvents.length) {
        currentEvents.forEach(event => {
          var titlee = event.title
          var hours = event.hours
          var minutes = event.minutes
          if (minutes < 10) minutes = `0${minutes}`
          console.log(titlee + ': ' + hours + '...' + minutes)
          eventItems.push({
            title: event.title,
            time: hours + ':' + minutes, //`${hours}:${minutes}`,
            color: event.color
          })
        })
      }
      self.eventItems = eventItems
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
        events: self.events,
        on: {
          init(calendar) {
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(app.navbar.getElByPage(page.el))
            calendar.$el.addClass('no-safe-area-right')
            self.renderEvents(calendar)
          },
          monthYearChangeStart(calendar) {
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(app.navbar.getElByPage(page.el))
          },
          change(calendar) {
            self.renderEvents(calendar)
          }
        }
      })
    },
    onPageBeforeRemove() {
      const self = this
      self.calendar.destroy()
    }
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