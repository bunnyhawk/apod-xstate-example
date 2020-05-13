<template>
  <md-card>
    <md-ripple>
      <md-card-media>
        <img
          v-if="photo.media_type === 'image'"
          :src="photo.url"
          alt="People"
          class="md-image"
          @click="handlePhotoSelect"
        >
        <iframe
          v-if="photo.media_type === 'video'"
          :src="photo.url"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </md-card-media>
      <md-card-header>
        <div @click="handlePhotoSelect">
          <h2 class="md-title">{{ photo.title }}</h2>
          <div class="md-subhead">{{ photo.date }}</div>
        </div>
      </md-card-header>
    </md-ripple>
  </md-card>
</template>

<style>
.md-card-media {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
}
.md-card-media .md-image {
  height: 100%;
  width: auto;
}
.md-card {
  width: 320px;
  margin: 4px;
}
</style>

<script>
export default {
  props: ['apodServiceAction', 'photo'],
  methods: {
    handlePhotoSelect: function() {
      this.apodServiceAction('SELECT_PHOTO', { currentPhoto: this.photo })
    },
  }
}
</script>