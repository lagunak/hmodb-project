<template>
  <f7-page>
    <f7-navbar title="meeting" back-link="Back"></f7-navbar>
    <!-- <f7-block-title>Plans</f7-block-title> -->
    <f7-list>
      <f7-list-item
        v-for="item in items"
        :title="item.text"
        :link="item.link"
        :key="item.id"
        external="true"
      ></f7-list-item>
    </f7-list>

    <mCalendar v-model="selectedDate"></mCalendar>
    <p>{{ selectedDate }}</p>

    <Autocomplete2 v-model="autocompleteResult" :options="['alex','berni']"></Autocomplete2>
    <f7-block>
      <p>{{autocompleteResult}}</p>
    </f7-block>
    <f7-button @cick="testme()">test</f7-button>
  </f7-page>
</template>

<script>
import mCalendar from "../components/CalendarDefault.vue";
import Autocomplete2 from "../components/AutocompleteDefault.vue";
export default {
  data() {
    return {
      items: [],
      autocompleteResult: "",
      selectedDate: ""
    };
  },
  methods: {
    testme() {
      console.log("aaaaaaaa");
      console.log(this.selectedDate);
    }
  },
  components: {
    mCalendar,
    Autocomplete2
  }
};
</script>

<style lang="scss" scoped>
</style>