<template>
  <f7-app :params="f7params" push-state="true">
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover resizable>
      <!-- panel defined here, then other pages can use a link to open it, but it will open links in the links-view view. -->
      <f7-view url="/panel-left/" links-view="#view-real-time"></f7-view>
    </f7-panel>

    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom>
        <f7-link
          tab-link="#view-real-time"
          tab-link-active
          icon-ios="f7:compass"
          icon-aurora="f7:compass"
          icon-md="material:compass"
          text="RT"
        ></f7-link>
        <f7-link
          tab-link="#view-home"
          icon-ios="f7:home_fil"
          icon-aurora="f7:home_fil"
          icon-md="material:home"
          text="Home"
        ></f7-link>
        <f7-link
          tab-link="#view-events-list"
          icon-ios="f7:list"
          icon-aurora="f7:list"
          icon-md="material:list"
          text="Events"
        ></f7-link>
        <f7-link
          tab-link="#view-calendar"
          icon-ios="f7:calendar_today"
          icon-aurora="f7:calendar_today"
          icon-md="material:calendar_today"
          text="Events"
        ></f7-link>
        <f7-link
          tab-link="#view-settings"
          icon-ios="f7:settings_fill"
          icon-aurora="f7:settings_fill"
          icon-md="material:settings"
          text="Settings"
        ></f7-link>
      </f7-toolbar>
      <!-- <f7-view id="view-home" url="/" :main="true" class="safe-areas" :master-detail-breakpoint="800"></f7-view> -->
      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <!-- <f7-view id="view-home" :push-state="true" main tab tab-active url="/"></f7-view>-->

      <!-- Real Time Train View -->
      <f7-view id="view-real-time" name="real-time" tab tab-active url="/real-time/"></f7-view>

      <!-- Home View -->
      <f7-view id="view-home" name="home" tab url="/home/"></f7-view>

      <!-- Events list view -->
      <f7-view id="view-events-list" name="events-list" tab url="/events/"></f7-view>

      <!-- Calendar View -->
      <f7-view id="view-calendar" name="events" tab url="/calendar/"></f7-view>

      <!-- Settings View -->
      <f7-view id="view-settings" name="settings" tab url="/quick-links/"></f7-view>
    </f7-views>
  </f7-app>
</template>
<script>
import routes from "../js/routes.js";

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: "RT", // App name
        theme: "auto", // Automatic theme detection
        cache: false, //let's do this for now...
        // App root data
        data: function() {
          return {
            user: {
              firstName: "John",
              lastName: "Doe"
            }
          };
        },

        // App routes
        routes: routes
      }
    };
  },
  methods: {
    alertLoginData() {
      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password
      );
    }
  },
  mounted() {
    this.$f7ready(f7 => {
      // Call F7 APIs here
    });
  }
};
</script>