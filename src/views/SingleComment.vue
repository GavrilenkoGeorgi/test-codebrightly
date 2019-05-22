<template>
  <section class="single-comment">
    <!-- Back link -->
    <router-link
      class="go-back-link"
      to="/allComments"
    >
      <backArrowIcon
        class="back-icon"
      />Back to comments
    </router-link>
    <!-- Comment title and body -->
    <h1>
      {{ getSingleComment.commentTitle }}
    </h1>
    <p>
      {{ getSingleComment.commentBody }}
    </p>
    <homeButton />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import homeButton from '@/components/homeButton.vue'
import backArrowIcon from '@/assets/svg/backArrowIcon.svg'

export default {
  name: 'singleComment',
  components: {
    homeButton,
    backArrowIcon
  },
  computed: {
    ...mapGetters([
      `getSingleComment`
    ])
  },
  created () {
    this.$store.dispatch(`setSingleComment`, this.$route.params.id)
  },
  methods: {
    ...mapActions([
      `setSingleComment`
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/mixins.sass'
@import '@/assets/sass/vars.sass'

.single-comment
  padding: 0em 1em 0em 1em
  +handheld(2, 600px)
    padding: 0
    width: $main-layout-width
  +handheld(2, 1500px)
    width: 50%
  h1
    font-size: 1.6em
    font-variation-settings: 'wght' 475
  p
    font-size: .9em
    line-height: 1.6
    +handheld(2, 600px)
      font-size: 1.2em

.go-back-link
  display: flex
  align-items: center
  color: black
  +handheld(2, 600px)
    font-size: 1.2em
  .back-icon
    padding-right: .6em

</style>
