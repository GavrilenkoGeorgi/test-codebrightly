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
        <button
          @click.prevent="deleteComment(comment.id)"
        >
          delete comment
        </button>
        <button
          @click.prevent="showUpdateModal(comment.title, comment.body, comment.id)"
        >
          update comment
        </button>
      </div>
    </div>
    <!-- controls -->
    <homeButton />
    <modal
      name="update-comment"
      :adaptive="true"
      @before-open="beforeOpen"
    >
      <div class="modal-container">
        <p class="modal-title">
          Update comment.
        </p>
        <div class="form-container">
          <form class="update-comment-form">
            <input
              class="comment-title"
              type="text"
              name="title"
              placeholder="Title"
              v-model="commentTitle"
            >
            <br />
            <textarea
              class="comment-text"
              type="text"
              name="comment"
              placeholder="Your comment"
              v-model="commentBody"
            >
            </textarea>
            <br />
            <div class="buttons-layout">
              <button
                class="modal-button"
                @click.prevent="updateComment(commentId)"
              >
                Send
              </button>
              <button
                class="modal-button"
                @click.prevent="hideUpdateModal()"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </modal>
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
      blogs: [],
      commentTitle: undefined,
      commentBody: undefined,
      commentId: undefined
    }
  },
  created () {
    this.$http.get(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments`)
      .then(data => {
        // last six comments
        let sliceStartIndex = data.body.length
        sliceStartIndex = sliceStartIndex - 6
        // console.log(`Index to slice is ${sliceStartIndex}`)
        this.blogs = data.body.slice(sliceStartIndex)
        // console.table(this.blogs)
      })
  },
  methods: {
    deleteComment (id) {
      // console.log(`Deleteing comment with id ${id}`)
      this.$http.delete(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${id}`)
        .then(response => {
          console.log(`Comment deleted.`)
          // console.log(response)
        })
    },
    updateComment (id) {
      // console.log(`Updating comment with id ${id}`)
      let date = new Date()
      let timestamp = date.getTime()
      // console.log(`created at ${timestamp} sec.`)
      let updatedComment = {
        created_at: timestamp,
        title: this.commentTitle,
        body: this.commentBody
      }
      this.$http.put(`https://5cbef81d06a6810014c66193.mockapi.io/api/comments/${id}`, updatedComment)
        .then(response => {
          // console.log(`Comment updated.`)
          // console.log(response)
          this.hideUpdateModal()
        })
    },
    showUpdateModal (title, body, id) {
      this.$modal.show('update-comment', {
        title: title,
        body: body,
        id: id
      })
    },
    hideUpdateModal () {
      this.$modal.hide('update-comment')
    },
    beforeOpen (event) {
      console.log(event.params.title)
      this.commentTitle = event.params.title
      this.commentBody = event.params.body
      this.commentId = event.params.id
      console.log(event.params.body)
      console.log(event.params.id)
    }
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

.modal-container
  padding: 0em 2em 0em 2em

.update-comment-form
  .comment-title
    width: 100%
    padding: 0
    margin-bottom: .7em
    border: 1px solid #60e3a1
    border-radius: 5px
    line-height: 2
  .comment-text
    line-height: 2
    border: 1px solid #60e3a1
    border-radius: 5px
    width: 100%
    padding: 0
    height: 10em
    margin-bottom: 1em
    resize: none
  .modal-button
    border: none
    background-color: #60e3a1
    border-radius: 5px
    width: 6em
    height: 2em
    margin: .3em
</style>
