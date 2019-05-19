<template>
  <section id="single-comment">
    <router-link to="/allComments"> x-- Back to comments</router-link>
    <h1>{{ comment.title }}</h1>
    <p>{{ comment.body }}</p>
    <homeButton />
  </section>
</template>

<script>
import homeButton from '@/components/homeButton.vue'
import router from 'vue-router'
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'singleComment',
  components: {
    homeButton
  },
  data () {
    return {
      comment: {}
    }
  },
  /*
  computed: {
    ...mapGetters([
      `getCommentToDisplay`
    ])
  }, */
  created () {
    this.$http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${this.$route.params.id}`)
      .then(data => {
        this.comment = data.body
      })
  },
  methods: {
    /*
    ...mapActions([
      `setSingleComment`
    ]), */
    navigate () {
      router.go(-1)
    }
  }
}

</script>

<style lang="sass" scoped>
#single-comment
  border: 1px solid pink
  width: 70%
</style>
