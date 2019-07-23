<template>
  <f7-page>
    <f7-navbar title="Quick Linsk" back-link="Back"></f7-navbar>
    <f7-block-title>My Quick Links</f7-block-title>
    <f7-list>
      <f7-list-item
        v-for="item in items"
        :title="item.text"
        :link="item.link"
        :key="item.id"
        external
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: "10_23",
          text: "Metro Ligero Aravaca",
          link: "http://www.citram.es/HORARIOS/infoM.aspx?estacion=10_23"
        },
        {
          id: "8_06284",
          text: "Bus en Pozuelo Estación",
          link: "http://www.citram.es/HORARIOS/infoM.aspx?estacion=8_06284"
        },
        {
          id: "8_09482",
          text: "Casa -> Caná",
          link: "http://www.citram.es/HORARIOS/infoM.aspx?estacion=8_09482"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>