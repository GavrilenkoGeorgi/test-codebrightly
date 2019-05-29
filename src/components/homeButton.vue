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

<style src="@/assets/sass/homeButton.sass" lang="sass" scoped></style>
