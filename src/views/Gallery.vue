<template>
  <section>
    <md-toolbar :md-elevation="1">
      <span class="md-title">Gallery</span>
    </md-toolbar>
    <md-content v-if="photos">
      <div class="photoGallery">
        <span v-if="state === 'error'" class="error">Uh oh, search failed.</span>
        <GalleryItem
          v-for="currentPhoto in photos"
          :key="currentPhoto.date"
          :photo="currentPhoto"
          :apodServiceAction="apodServiceAction"
        />
      </div>
    </md-content>
  </section>
</template>

<style>
.photoGallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

<script>
import GalleryItem from '../components/GalleryItem';

export default {
  props: ['apodServiceAction', 'photos', 'state'],
  components: {
    GalleryItem,
  },
  methods: {
    handlePhotoSelect: function(photo) {
      this.apodServiceAction('SELECT_PHOTO', { currentPhoto: photo })
    },
  }
}
</script>