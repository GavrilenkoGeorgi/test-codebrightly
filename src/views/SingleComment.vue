<template>
  <section class="single-comment">
    <!-- Back link -->
    <router-link
      class="go-back-link"
      to="/allComments"
    >
      <backArrowIcon
        class="back-icon"
      />
        Back to comments
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
    this.showSingleComment(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      `showSingleComment`
    ])
  }
}
</script>

<style src="@/assets/sass/singleComment.sass" lang="sass" scoped></style>
