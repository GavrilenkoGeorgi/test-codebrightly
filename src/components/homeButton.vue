<template>
  <div class="button-layout">
    <p>Lorem ipsum is text of the typesetting industry</p>
    <router-link
      to="/"
    >
      <backArrowIcon class="back-icon" />Back to homepage
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

.button-layout
  display: flex
  flex-direction: column
  align-items: center
  padding: 2em 0em 2em 0em
  height: auto
  box-sizing: border-box
  p
    font-size: 1.4em
    color: gray
    text-align: center
  a
    background-color: white
    border: none
    border: .075em solid $green-accent
    height: 3em
    line-height: 3em
    text-decoration: none
    color: black
    border-radius: .2em
    padding: 0em 1em 0em 1em
    font-size: 1.2em
    font-variation-settings: 'wght' 450
    .back-icon
      padding-right: .6em

</style>
