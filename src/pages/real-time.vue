<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link panel-open="left" icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu"></f7-link>
      </f7-nav-left>

      <f7-nav-title sliding>RT</f7-nav-title>
      <f7-nav-right v-if="mStationName!=''">
        <f7-link
          :href="citramLink"
          external
          icon-ios="f7:chevron_right"
          icon-aurora="f7:chevron_right"
          icon-md="material:chevron_right"
        ></f7-link>
      </f7-nav-right>
      <!-- <f7-nav-title sliding>RT</f7-nav-title>
      <f7-nav-title-large>RT</f7-nav-title-large>-->
    </f7-navbar>

    <div class="list no-hairlines-md">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <!-- <div class="item-title item-label">Station</div> -->
            <div class="item-input-wrap">
              <input
                onClick="this.setSelectionRange(0, this.value.length)"
                type="text"
                placeholder="Station"
                id="autocomplete-dropdown-all"
                clear-button
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <f7-block>{{ mStationId }}</f7-block> -->
    <!-- <f7-button fill @click="refreshData">Button</f7-button> -->
    <!-- <f7-block>{{ lines }}</f7-block> -->

    <f7-block v-if="loading" class="text-align-center">
      <f7-preloader color="multi"></f7-preloader>
    </f7-block>

    <!-- <f7-block-title>Siguientes trenes...</f7-block-title> -->
    <f7-list v-if="!loading">
      <f7-list-item
        v-for="(line, index) in lines"
        :title="line.lineBound"
        :key="index"
        :badge="line.waitTime"
        external
      ></f7-list-item>
    </f7-list>
    <f7-block v-if="!loading">{{ refreshedTime }}</f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      mStationId: "x",
      lines: [],
      mStationName: "",
      loading: false,
      refreshedTime: "",
      stations: [
        { id: "5_60", name: "Pozuelo" },
        { id: "5_25", name: "Delicias" },
        { id: "5_18", name: "Chamartin" },
        { id: "5_51", name: "Nuevos Ministerios" },
        { id: "5_9", name: "Aravaca" },
        { id: "5_142", name: "Aeropuerto T4" },
        { id: "5_1", name: "Aguilas, Las" },
        { id: "5_2", name: "Alcalá De Henares" },
        { id: "5_3", name: "Alcalá De Henares Universidad" },
        { id: "5_4", name: "Alcobendas-S.S. De Los Reyes" },
        { id: "5_5", name: "Alcorcon" },
        { id: "5_6", name: "Alpedrete" },
        { id: "5_7", name: "Aluche" },
        { id: "5_8", name: "Aranjuez" },
        //{ id: "5_9", name: "Aravaca" },
        { id: "5_98", name: "Arcos De Jalon" },
        { id: "5_116", name: "Arevalo" },
        { id: "5_112", name: "Ariza" },
        { id: "5_10", name: "Asamblea De Madrid-Entrevias" },
        { id: "5_11", name: "Atocha" },
        { id: "5_97", name: "Avila" },
        { id: "5_12", name: "Azuqueca" },
        { id: "5_13", name: "Barrial-C.Com.Pozuelo, El" },
        { id: "5_15", name: "Cantoblanco Universidad" },
        { id: "5_103", name: "Casar, El" },
        { id: "5_16", name: "Cercedilla" },
        //{ id: "5_18", name: "Chamartin" },
        { id: "5_19", name: "Ciempozuelos" },
        { id: "5_20", name: "Collado Mediano" },
        { id: "5_21", name: "Colmenar Viejo" },
        { id: "5_22", name: "Coslada" },
        { id: "5_23", name: "Cotos" },
        { id: "5_24", name: "Cuatro Vientos" },
        //{ id: "5_25", name: "Delicias" },
        { id: "5_26", name: "Doce De Octubre" },
        { id: "5_28", name: "Embajadores" },
        { id: "5_29", name: "Escorial, El" },
        { id: "5_113", name: "Espinar, El" },
        { id: "5_30", name: "Fanjul" },
        { id: "5_31", name: "Fuencarral" },
        { id: "5_32", name: "Fuenlabrada" },
        { id: "5_133", name: "Fuente De La Mora" },
        { id: "5_33", name: "Galapagar-La Navata" },
        { id: "5_106", name: "Garena, La" },
        { id: "5_34", name: "Getafe Centro" },
        { id: "5_35", name: "Getafe Industrial" },
        { id: "5_36", name: "Getafe Sector 3" },
        { id: "5_37", name: "Goloso, El" },
        { id: "5_38", name: "Guadalajara" },
        { id: "5_120", name: "Guimorcondo" },
        { id: "5_119", name: "Herradon-La Canada" },
        { id: "5_104", name: "Humanes" },
        { id: "5_40", name: "Laguna" },
        { id: "5_41", name: "Leganes" },
        { id: "5_115", name: "Losa-Navas De Riofrio, La" },
        { id: "5_42", name: "Majadahonda" },
        { id: "5_43", name: "Margaritas-Universidad, Las" },
        { id: "5_44", name: "Matas, Las" },
        { id: "5_45", name: "Meco" },
        { id: "5_121", name: "Medina Del Campo" },
        { id: "5_46", name: "Mendez Alvaro" },
        { id: "5_47", name: "Molinos, Los" },
        { id: "5_48", name: "Mostoles" },
        { id: "5_49", name: "Mostoles El Soto" },
        { id: "5_118", name: "Navalperal" },
        { id: "5_117", name: "Navas Del Marques, Las" },
        { id: "5_50", name: "Negrales, Los" },
        //{ id: "5_51", name: "Nuevos Ministerios" },
        { id: "5_52", name: "Orcasitas" },
        { id: "5_114", name: "Otero-Herreros" },
        { id: "5_53", name: "Parla" },
        { id: "5_105", name: "Parque Polvoranca" },
        { id: "5_55", name: "Pinar De Las Rozas" },
        { id: "5_56", name: "Pinto" },
        { id: "5_57", name: "Piramides" },
        { id: "5_58", name: "Pitis" },
        { id: "5_59", name: "Pozo, El" },
        //{ id: "5_60", name: "Pozuelo" },
        { id: "5_61", name: "Principe Pio" },
        { id: "5_62", name: "Puente Alcocer" },
        { id: "5_63", name: "Puerto Navacerrada" },
        { id: "5_64", name: "Ramon Y Cajal" },
        { id: "5_65", name: "Recoletos" },
        { id: "5_66", name: "Retamas, Las" },
        { id: "5_67", name: "Robledo De Chavela" },
        { id: "5_68", name: "Rozas, Las" },
        { id: "5_69", name: "San Cristobal De Los Angeles" },
        { id: "5_70", name: "San Cristobal Industrial" },
        { id: "5_71", name: "San Fernando" },
        { id: "5_72", name: "San Jose De Valderas" },
        { id: "5_74", name: "San Yago" },
        { id: "5_75", name: "Santa Eugenia" },
        { id: "5_76", name: "Santa Maria De La Alameda" },
        { id: "5_99", name: "Segovia" },
        { id: "5_77", name: "Serna, La" },
        { id: "5_100", name: "Sigüenza" },
        { id: "5_122", name: "Sol" },
        { id: "5_143", name: "Soto Del Henares" },
        { id: "5_101", name: "Toledo" },
        { id: "5_81", name: "Torrejon De Ardoz" },
        { id: "5_82", name: "Torrelodones" },
        { id: "5_83", name: "Tres Cantos" },
        { id: "5_84", name: "Universidad P. Comillas" },
        { id: "5_144", name: "Valdebebas" },
        { id: "5_85", name: "Valdelasfuentes" },
        { id: "5_86", name: "Valdemoro" },
        { id: "5_111", name: "Valladolid" },
        { id: "5_87", name: "Vallecas" },
        { id: "5_90", name: "Vicalvaro" },
        { id: "5_91", name: "Villalba" },
        { id: "5_92", name: "Villaverde Alto" },
        { id: "5_93", name: "Villaverde Bajo" },
        { id: "5_94", name: "Zarzalejo" },
        { id: "5_95", name: "Zarzaquemada" },
        { id: "5_96", name: "Zorreras, Las" },
        { id: "", name: "" }
      ]
    };
  },
  computed: {
    citramLink() {
      return (
        "http://www.citram.es/HORARIOS/infoM.aspx?estacion=" + this.mStationId
      );
    }
  },

  mounted() {
    console.log("mountted");
  },
  deactivated() {
    console.log("deactivated");
  },

  methods: {
    name() {},
    refreshData() {
      console.log("onPageBeforeRemove...");
      this.loading = true;

      fetch("https://api.interurbanos.welbits.com/v1/stop/" + this.mStationId)
        .then(response => response.json())
        .then(data => {
          this.loading = false;
          this.lines = data.lines;
          this.refreshedTime = Date();
        });
    },
    onPageBeforeRemove() {
      console.log("onPageBeforeRemove...");
      const self = this;
      // Destroy all autocompletes
      self.autocompleteDropdownSimple.destroy();
      self.autocompleteDropdownExpand.destroy();
      self.autocompleteDropdownAll.destroy();
      self.autocompleteDropdownPlaceholder.destroy();
      self.autocompleteDropdownTypeahead.destroy();
      self.autocompleteDropdownAjax.destroy();
      self.autocompleteDropdownAjaxTypeahead.destroy();
      self.autocompleteStandaloneSimple.destroy();
      self.autocompleteStandalonePopup.destroy();
      self.autocompleteStandaloneMultiple.destroy();
      self.autocompleteStandaloneAjax.destroy();
    },
    onPageInit() {
      console.log("onPageInit..");
      const self = this;
      const app = self.$f7;
      const stations = self.stations;
      const $ = self.$$;
      // Dropdown with all values
      self.autocompleteDropdownAll = app.autocomplete.create({
        inputEl: "#autocomplete-dropdown-all",
        openIn: "dropdown",
        autoFocus: true,
        source(query, render) {
          console.log("source...");
          const results = [];
          // Find matched items
          for (let i = 0; i < stations.length; i += 1) {
            //console.log(i + " " + stations[i].name);
            if (
              stations[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0
            ) {
              results.push(stations[i].name);

              // Render items by passing array with result items
              render(results);
            }
          }
        },
        on: {
          change: function(value) {
            console.log(value);
            //self.mStationId = value.id;
            self.mStationName = value[0];
            for (let i = 0; i < stations.length; i += 1) {
              if (stations[i].name == value) {
                var xx = stations[i].id;
                self.mStationId = xx.replace("_", "-");
              }
            }
            console.log(self.mStationName + " - " + self.mStationId);
            //self.mStationId.replace("_", "-");
            self.refreshData();
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>