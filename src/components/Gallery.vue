<template>
  <section class="photoGallery" :data-state="state">
    <span v-if="state === 'error'" class="error">Uh oh, search failed.</span>
    <md-card
      v-for="photo in photos"
      :key="photo.date"
      
    >
      <md-ripple>
        <md-card-media>
          <img
            v-if="photo.media_type === 'image'"
            :src="photo.url"
            alt="People"
            class="md-image"
            @click="() => handlePhotoClick(photo)"
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
          <div @click="() => handlePhotoClick(photo)">
            <h2 class="md-title">{{ photo.title }}</h2>
            <div class="md-subhead">{{ photo.date }}</div>
          </div>
        </md-card-header>
      </md-ripple>
    </md-card>
  </section>
</template>

<style>
.photoGallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
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
  props: ["state", "transition", "photos", 'selectPhoto'],
  methods: {
    handlePhotoClick: function(photo) {
      this.selectPhoto(photo)
    }
  }
}
</script>