<template>
  <section
    :data-state="state"
    @click="handlePhotoClick">
    <img v-if="state === 'photo'" :src="photo.url" />
    <img v-if="state === 'hdphoto'" :src="photo.hdurl" />
  </section>
</template>

<style>
img {
  max-width: 100%;
}
</style>

<script>
export default {
  props: ['photo', 'state', 'leavePhoto'],
  methods: {
    handlePhotoClick: function(photo) {
      this.leavePhoto(photo)
    }
  }
}
</script>