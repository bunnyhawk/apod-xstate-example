<template>
  <div id="x-state-example" class="viewport">
    <DateSelect
      v-if="current.value === 'gallery' || current.value === 'loading' || current.value === 'start'"
      :apod-service-action="apodServiceAction"
      :change-date="changeDate"
      :beginDate="beginDate"
      :endDate="endDate"
      :getDates="getDates"
      :state="current.value"
    />
    <Gallery
      v-if="current.value === 'gallery'"
      :photos="context.photos"
      :apod-service-action="apodServiceAction"
      :state="current.value"
    />
    <PhotoDetails
      v-if="current.value === 'photo' || current.value === 'hdphoto'"
      :photo="context.currentPhoto"
      :apod-service-action="apodServiceAction"
      :state="current.value"
    />
    {{ context.errorMessage }}
  </div>
</template>

<style>
.md-layout {
  padding: 0 20px;
}

.back-button {
  border: 0;
  background: transparent;
  text-align: left;
  width: 100%;
}
</style>

<script>
import { interpret } from 'xstate';
import { apodMachine } from './machine';
import DateSelect from './views/DateSelect.vue';
import Gallery from './views/Gallery.vue';
import PhotoDetails from './views/PhotoDetails.vue';

export default {
  name: 'x-state-example',
  components: {
    DateSelect,
    Gallery,
    PhotoDetails,
  },
  data() {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 9);

    return {
      // Interpret machine and store in data
      apodService: interpret(apodMachine),

      // Start with the machine's initial state
      current: apodMachine.initialState,

      // Start with the machine's initial context
      context: apodMachine.context,
      beginDate: tenDaysAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    }
  },            
  created: function () {
    this.apodService
      .onTransition(state => {
        // Keep current state and context in sync
        this.current = state;
        this.context = state.context;
      })
      .start();
  },
  methods: {
    apodServiceAction: function(key, params) {
      this.apodService.send(key, params);
    },
    changeDate: function(value) {
      this.date = value;
    },
    getDates: function() {
      const dates = [];
      const currentDate = new Date(this.beginDate);
      const stopDate = new Date(this.endDate);

      while (currentDate <= stopDate) {
          dates.push(new Date (currentDate).toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    },
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
