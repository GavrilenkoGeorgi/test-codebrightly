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
@import '@/assets/sass/vars.sass'

.title
  display: flex
  flex-direction: column
  align-items: center
  padding: 2em 0em 2em 0em
  p
    font-size: 1.4em
    color: gray
    text-align: center
  .home-button
    background-color: white
    border: none
    border: .075em solid $green-accent
    height: 3em
    border-radius: .2em
    padding: 0em 1em 0em 1em
    font-size: 1em
    .back-icon
      padding-right: .6em

</style>
