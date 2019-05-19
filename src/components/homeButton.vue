<template>
  <div class="lower-part">
    <p>Lorem ipsum is text of the typesetting industry</p>
    <button
      class="home-button"
      @click="navigate"
    >
      x-- Back to homepage
    </button>
  </div>
</template>

<script>
export default {
  name: 'homeButton',
  methods: {
    navigate () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
.lower-part
  text-align: center
  padding: 2em 0em 2em 0em
  p
    font-size: 1.3em
  .home-button
    background-color: white
    border: none
    border: .075em solid #60e3a1
    height: 3em
    border-radius: .2em
</style>
