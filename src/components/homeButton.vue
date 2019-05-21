<template>
  <div class="title">
    <p>Lorem ipsum is text of the typesetting industry</p>
    <button
      class="home-button"
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

<style lang="sass" scoped>
.title
  display: flex
  flex-direction: column
  align-items: center
  padding: 2em 0em 2em 0em
  p
    font-size: 1.4em
    color: gray
  .home-button
    background-color: white
    border: none
    border: .075em solid #60e3a1
    height: 3em
    border-radius: .2em
    padding: 0em 1em 0em 1em
    font-size: 1em
    .back-icon
      padding-right: .6em
</style>
