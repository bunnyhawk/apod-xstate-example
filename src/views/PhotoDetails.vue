<template>
  <section>
    <md-toolbar :md-elevation="1">
      <button class="md-title back-button" @click="handleLeavePhoto">&#8592; Back to Gallery</button>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-gutter md-alignment-top">
        <div class="md-layout-item">
          <img v-if="state === 'photo'" :src="photo.url" @click="handlePhotoZoom" />
          <img v-if="state === 'hdphoto'" :src="photo.hdurl" @click="handleLeaveZoom" />
        </div>
        <div class="md-layout-item"  v-if="state === 'photo'" > 
          <h1>{{ photo.title}}</h1>
          <h3>{{ photo.date }}</h3>
          <p>{{ photo.explanation }}</p>
        </div>
      </div>
    </md-content>
  </section>
</template>

<script>
export default {
  props: ['apodServiceAction', 'photo', 'state'],
  methods: {
    handleLeavePhoto: function() {
      this.apodServiceAction('LEAVE_PHOTO');
    },
    handleLeaveZoom: function() {
      this.apodServiceAction('LEAVE_HD_PHOTO');
    },
    handlePhotoZoom: function() {
      this.apodServiceAction('ZOOM_PHOTO');
    },
  }
}
</script>
