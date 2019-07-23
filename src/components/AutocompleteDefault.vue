<template>
  <div>
    <div class="list no-hairlines-md">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <!-- <div class="item-title item-label">Station</div> -->
            <div class="item-input-wrap">
              <input
                onClick="this.setSelectionRange(0, this.value.length)"
                type="text"
                :placeholder="placeholder"
                id="autocomplete-dropdown-all-component"
                clear-button
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search..."
    },
    options: {
      type: Array,
      default() {
        return ["Option 1", "Option 2"];
      }
    }
  },
  data() {
    return {
      myOptions: this.options,
      autocompleteDropdownAll: []
    };
  },

  mounted() {
    const self = this;
    const app = self.$f7;
    //const myOptions = self.myOptions;
    const $ = self.$$;
    console.log("mountted");
    // Dropdown with all values
    self.autocompleteDropdownAll = app.autocomplete.create({
      inputEl: "#autocomplete-dropdown-all-component",
      openIn: "dropdown",
      autoFocus: true,
      source(query, render) {
        console.log("source...");
        const results = [];
        // Find matched items
        for (let i = 0; i < self.myOptions.length; i += 1) {
          //console.log(i + " " + myOptions[i].name);
          if (
            self.myOptions[i].toLowerCase().indexOf(query.toLowerCase()) >= 0
          ) {
            results.push(self.myOptions[i]);
            //self.mStationId = self.myOptions[i].id;
            //self.mStationName = self.myOptions[i].name;
            // Render items by passing array with result items
            render(results);
          }
        }
      },
      on: {
        change: function(value) {
          console.log(value);
          self.$emit("input", value[0]); //this makes the v-model work :)
        }
      }
    });
  },

  destroyed() {
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
  deactivated() {
    console.log("deactivated");
  }
};
</script>

<style lang="scss" scoped>
</style>