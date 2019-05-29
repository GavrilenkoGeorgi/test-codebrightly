<template>
  <div class="title">
    <p>Lorem ipsum is text of the typesetting industry</p>
    <button
      class="home-button"
      type="button"
      @click="navigate"
    >
      <backArrowIcon class="back-icon" />Back to homepage
    </button>
  </div>
</template>

<script>
import backArrowIcon from '@/assets/svg/backArrowIcon.svg'

export default {
  name: 'homeButton',
  components: {
    backArrowIcon
  },
  methods: {
    navigate () {
      this.$router.push('/')
    }
  }
}
</script>

<style src="@/assets/sass/homeButton.sass" lang="sass" scoped></style>
