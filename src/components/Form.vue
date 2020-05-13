
<template>
  <form @submit="handleSubmit">
    <div class="md-layout md-alignment-center md-gutter">
      <div class="md-layout-item">
        <md-datepicker v-model="submittedBeginDate" />
      </div>
      <div class="md-layout-item">
        <md-datepicker v-model="submittedEndDate" />
      </div>
      <div class="md-layout-item">
        <md-button
          class="md-icon-button md-raised md-primary"
          type="submit"
          md-icon-button="search"
          :disabled="state === 'loading'">
            <md-icon>search</md-icon>
        </md-button>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["beginDate", "endDate", "state", "transition", "changeDate", "query"],
  data() {
    return {
      submittedBeginDate: this.beginDate,
      submittedEndDate: this.endDate
    }
  },
  methods: {
    handleSubmit: function(e) {
      e.preventDefault();
      this.$emit('handle-submit')
    }
  },
  watch: {
    submittedDate: function(date) {
      this.$emit('change-date', date);
    }
  }
}
</script>
