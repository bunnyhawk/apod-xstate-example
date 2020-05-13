<template>
  <div>
    <md-toolbar :md-elevation="1">
      <span class="md-title">Search by Date</span>
    </md-toolbar>
    <md-content>
    <Form
      :beginDate="beginDate"
      :endDate="endDate"
      :change-date="changeDate"
      @handle-submit="handleSubmit"
    />
    </md-content>
  </div>
</template>

<script>
import Form from '../components/Form.vue';

export default {
  props: ['apodServiceAction', 'beginDate', 'endDate', 'changeDate', 'getDates'],
  components: {
    Form,
  },
  methods: {
    handleSubmit: function() {
      this.apodServiceAction('FETCH', { dates: this.getDates() })
    },
  }
}
</script>