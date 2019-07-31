<template>
  <div>
    <f7-page>
      <f7-navbar title="Pattern" back-link="Rules" :back-link-force="true"></f7-navbar>
      <f7-block>{{ JSON.stringify(pattern) }}</f7-block>

      <!--  FORM -->
      <f7-list no-hairlines-md>
        <f7-list-input
          label="description"
          floating-label
          type="textarea"
          resizable
          placeholder="description"
          :value="pattern.description"
        ></f7-list-input>

        <!-- TYPE -->
        <f7-list-input
          label="Type"
          type="select"
          :defaultValue="pattern.type"
          :value="pattern.type"
          placeholder="Please choose..."
        >
          <option value="include">include</option>
          <option value="onlyif">onlyif</option>
          <option value="exclude">exclude</option>
          <option value="move">move</option>
          <option value="cancel">cancel</option>
        </f7-list-input>

        <!-- MONTHDAY -->
        <f7-list-item
          title="monthday"
          :value="pattern.monthday.split(',')"
          smart-select
          :smart-select-params="{openIn: 'popup', searchbar: false}"
        >
          <select name="monthday" multiple>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
        </f7-list-item>

        <!-- MONTHS -->
        <f7-list-item
          title="month"
          :value="pattern.month.split(',')"
          smart-select
          :smart-select-params="{openIn: 'popup', searchbar: false}"
        >
          <select name="month" multiple>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </f7-list-item>

        <!-- WEEKDAY -->
        <f7-list-item
          title="weekday"
          :value="pattern.weekday.split(',')"
          smart-select
          :smart-select-params="{openIn: 'popup', searchbar: false}"
        >
          <select name="monthday" multiple>
            <option value="1">Mon</option>
            <option value="2">Tue</option>
            <option value="3">Wed</option>
            <option value="4">Thu</option>
            <option value="5">Fri</option>
            <option value="6">Saturday morning</option>
            <option value="S">Sunday</option>
            <option value="f">Feast Vigil</option>
            <option value="F">Feast</option>
            <option value="p">Public Holiday</option>
          </select>
        </f7-list-item>

        <!-- Monthweek -->
        <f7-list-item
          title="monthweek"
          :value="pattern.monthweek"
          smart-select
          :smart-select-params="{openIn: 'popup', searchbar: false}"
        >
          <select name="monthweek" multiple>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </f7-list-item>

        <f7-list-input
          label="date_list"
          type="datepicker"
          placeholder="Select multiple dates"
          readonly
          :value="pattern.date_list"
          :calendar-params="{ dateFormat: 'M dd yyyy', multiple: true }"
        ></f7-list-input>

        <f7-list-input
          label="date_range"
          type="datepicker"
          :value="pattern.date_range"
          placeholder="Select date range"
          readonly
          :calendar-params="{ dateFormat: 'M dd yyyy', rangePicker: true }"
        ></f7-list-input>
      </f7-list>
    </f7-page>
  </div>
</template>

<script>
export default {
  props: {
    patternString: {
      type: String,
      default: '{}'
    }
  },
  computed: {
    pattern() {
      return JSON.parse(this.patternString)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>