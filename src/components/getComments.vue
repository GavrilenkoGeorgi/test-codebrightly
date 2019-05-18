<template>
  <div id="show-comments">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>All comments</h1>
    <div v-for="(comment, index) in blogs" :key="index" class="single-comment">{{ comment.body }}</div>
  </div>
</template>

<script>

export default {
  name: 'getComments',
  data () {
    return {
      blogs: []
    }
  },
  methods: {

  },
  created () {
    this.$http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments`)
      .then(function (data) {
        this.blogs = data.body.slice(0, 5)
        console.log(this.blogs)
      })
  }
}

</script>
