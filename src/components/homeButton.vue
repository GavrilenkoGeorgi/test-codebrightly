<template>
  <div class="title">
    <p>Lorem ipsum is text of the typesetting industry</p>
    <router-link
      to="/"
    >
      <button
        class="home-button"
        type="button"
      >
        <backArrowIcon class="back-icon" />
          Back to homepage
      </button>
    </router-link>
  </div>
</template>

<script>
import backArrowIcon from '@/assets/svg/backArrowIcon.svg'

export default {
  name: 'homeButton',
  components: {
    backArrowIcon
  }
}
</script>

<style lang="sass" scoped>
  @import '@/assets/sass/homeButton.sass'
</style>
