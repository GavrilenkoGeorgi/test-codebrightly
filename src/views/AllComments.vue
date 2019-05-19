<template>
  <section id="show-comments">
    <h1>Comments</h1>
    <div class="comments-container">
      <div class="single-comment"
        v-for="(comment, index) in blogs"
        :key="index"
      >
        <span class="comment-title">{{ comment.title }}</span><br />
        <p class="comment-body">{{ comment.body }}</p>
        <router-link
          class="read-more-link"
          :to="{ name: 'singleComment', params: { id: comment.id }}"
        >
          Read more
        </router-link>
      </div>
    </div>
    <!-- controls -->
    <homeButton />
  </section>
</template>

<script>

import homeButton from '@/components/homeButton.vue'

export default {
  name: 'getComments',
  components: {
    homeButton
  },
  data () {
    return {
      blogs: []
    }
  },
  created () {
    this.$http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments`)
      .then(function (data) {
        this.blogs = data.body.slice(0, 6)
        // console.table(this.blogs)
      })
  }
}

</script>

<style lang="sass" scoped>
h1
  font-size: 3em

section
  // border: 1px solid pink
  width: 70%

.comments-container
  // border: 1px solid pink
  // width: 70%
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  // align-items: stretch
  // align-content: flex-start
  // justify-content: space-between
  // padding: 0em 2em 0em 2em
  .single-comment
    padding: 2em 1.2em 2em 1.2em
    flex: 0 45%
    // box-sizing:border-box
    // -webkit-box-shadow: 10px 10px 27px -6px rgba(150,150,150,1)
    // -moz-box-shadow: 10px 10px 27px -6px rgba(150,150,150,1)
    box-shadow: 5px 5px 20px -6px rgba(200,200,200,1)
    .comment-title
      font-size: 1.3em
    .comment-body
      color: gray
    .read-more-link
      text-decoration: none
      background-color: #60e3a1
      border-radius: .2em
      width: 8em
      height: 3em
      border: 0

.lower-part
  text-align: center
  padding: 2em 0em 2em 0em
  p
    font-size: 1.3em
  .back-button
    background-color: white
    border: none
    border: .075em solid #60e3a1
    height: 3em
    border-radius: .2em
</style>
