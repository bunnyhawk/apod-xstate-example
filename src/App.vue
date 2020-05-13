<template>
  <div id="x-state-example" :data-state="current.value" class="viewport">
    <md-toolbar :md-elevation="1">
      <span class="md-title">Search by Date</span>
    </md-toolbar>
    <md-content>
    <Form
      :state="current.value"
      :beginDate="beginDate"
      :endDate="endDate"
      :change-date="changeDate"
      @handle-submit="handleSubmit"
    />
    </md-content>
    <div v-if="current.value === 'gallery'">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Gallery</span>
      </md-toolbar>
      <md-content v-if="context.photos">
        <Gallery
          :state="current.value"
          :photos="context.photos"
          :select-photo="handlePhotoSelect"
        />
      </md-content>
    </div>
    <div v-if="current.value === 'photo' || current.value === 'hdphoto'">
      <md-toolbar :md-elevation="1">
        <span class="md-title">{{context.currentPhoto.title}}</span>
      </md-toolbar>
      <md-content>
        <Photo
          :state="current.value"
          :photo="context.currentPhoto"
          :leave-photo="handleLeavePhoto"
        />
      </md-content>
    </div>
    {{ context.errorMessage }}
  </div>
</template>

<script>
import { interpret } from 'xstate';
import { apodMachine } from './machine';
import Form from './components/Form.vue';
import Gallery from './components/Gallery.vue';
import Photo from './components/Photo.vue';

export default {
  name: 'x-state-example',
  components: {
    Form,
    Gallery,
    Photo,
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
    handleLeavePhoto: function() {
      this.apodService.send('LEAVE_PHOTO');
    },
    handlePhotoSelect: function(photo) {
      console.log('app', photo)
      this.apodService.send('SELECT_PHOTO', { currentPhoto: photo })
    },
    handleSubmit: function() {
      this.apodService.send('FETCH', { dates: this.getDates() })
    },
    changeDate: function(value) {
      this.date = value;
    },
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
