<template>
  <div>
    <f7-block-title id="navbar-calendar-title">xx</f7-block-title>
    <div id="calendarr" class="block block-strong no-padding no-margin no-hairline-top"></div>
    <f7-button @click="goToToday()">Today</f7-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 'value',
      today: new Date(),
      selectedDate: new Date(),
      calendar: []
    }
  },
  props: {
    monthNames: {
      type: Array,
      default() {
        return [
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
      }
    },
    events: {
      type: Array,
      default() {
        return [
          {
            date: new Date(),
            hours: 12,
            minutes: 30,
            title: 'Meeting with Vladimir',
            color: '#2196f3'
          }
        ]
      }
    },
    age: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    const self = this
    const app = self.$f7
    const $ = self.$$
    self.calendar = app.calendar.create({
      containerEl: '#calendarr',
      toolbar: false,
      value: [self.today],
      events: self.events,
      dateFormat: 'yyyy-mm-dd',
      on: {
        init(calendar) {
          $('#navbar-calendar-title').text(
            self.monthNames[calendar.currentMonth] + ', ' + calendar.currentYear
          )
          //app.navbar.size(app.navbar.getElByPage(page.el));
          calendar.$el.addClass('no-safe-area-right')
          self.renderEvents(calendar)
        },
        monthYearChangeStart(calendar) {
          $('#navbar-calendar-title').text(
            self.monthNames[calendar.currentMonth] + ', ' + calendar.currentYear
          )
          //app.navbar.size(app.navbar.getElByPage(page.el));
        },
        change(calendar) {
          console.log(calendar)
          self.renderEvents(calendar)
          self.selectedDate = calendar.value[0]
          self.$emit('input', calendar.value[0])
          /* if (calendar.length) {
            if (calendar.value.length) {
              self.selectedDate = calendar.value[0];
              self.$emit("input", calendar.value[0]);
            }
          }*/
        }
      }
    })
  },
  methods: {
    goToToday() {
      var todayy = new Date()
      this.calendar.setValue([todayy])
      this.calendar.setYearMonth(todayy.getFullYear(), todayy.getMonth(), 10)
      //this.calendar.update();
      //this.renderEvents(this.calendar);
    },
    renderEvents(calendar) {
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
          const hours = event.date.getHours()
          let minutes = event.date.getMinutes()
          if (minutes < 10) minutes = `0${minutes}`
          eventItems.push({
            title: event.title,
            time: hours + ':' + minutes, //`${hours}:${minutes}`,
            color: event.color
          })
        })
      }
      self.eventItems = eventItems
    }
  },
  destroyed() {
    const self = this
    self.calendar.destroy()
  }
}
</script>

<style lang="scss" scoped>
</style>