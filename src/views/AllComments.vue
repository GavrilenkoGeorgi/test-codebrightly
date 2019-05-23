<template>
  <section id="show-comments">
    <h1>Comments</h1>
    <!-- All comments -->
    <div class="comments-container">
      <div class="single-comment"
        v-for="(comment, index) in getAllComments"
        :key="index"
      >
        <span class="comment-title">
          {{ comment.title }}
        </span>
        <br />
        <p class="comment-body">
          {{ comment.body }}
        </p>
        <button
          class="comment-button"
          @click.prevent="navToSingleComment(comment.id)"
        >
          Read more
        </button>
        <button
          class="comment-button"
          @click.prevent="deleteComment(comment.id)"
        >
          Delete
        </button>
        <button
          class="comment-button"
          @click.prevent="showUpdateModal(comment.title, comment.body, comment.id)"
        >
          Update
        </button>
      </div>
    </div>
    <!-- Back button -->
    <homeButton />
    <!-- Update comment modal window -->
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
import { mapGetters, mapActions } from 'vuex'
import homeButton from '@/components/homeButton.vue'

export default {
  name: 'getComments',
  components: {
    homeButton
  },
  computed: {
    ...mapGetters([
      `getAllComments`
    ])
  },
  data () {
    return {
      // for updating comments
      // in modal window
      commentTitle: undefined,
      commentBody: undefined,
      commentId: undefined
    }
  },
  created () {
    this.$store.dispatch(`setAllComments`)
  },
  methods: {
    ...mapActions([
      `setAllComments`
    ]),
    deleteComment (id) {
      this.$store.dispatch(`deleteComment`, id)
    },
    updateComment (id) {
      let date = new Date()
      let timestamp = date.getTime()
      let updatedComment = {
        id: id,
        created_at: timestamp,
        title: this.commentTitle,
        body: this.commentBody
      }
      this.$store.dispatch(`updateComment`, updatedComment).then(() => {
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
      this.commentTitle = event.params.title
      this.commentBody = event.params.body
      this.commentId = event.params.id
    },
    navToSingleComment (id) {
      this.$router.push(`singleComment/${id}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/mixins.sass'
@import '@/assets/sass/vars.sass'

h1
  font-size: 3em
  font-variation-settings: 'wght' 475

section
  padding: 0em 1em 0em 1em
  +handheld(2, 600px)
    width: $main-layout-width
  +desktop(96dpi, 900px)
    width: $main-layout-width
  +handheld(2, 1500px)
    width: 50%
  +desktop(96dpi, 1280px)
    width: 60%

.comments-container
  display: flex
  flex-wrap: wrap
  flex-direction: column
  justify-content: space-between
  +handheld(2, 900px)
    flex-direction: row
  +desktop(96dpi, 1280px)
    flex-direction: row
  div
    flex: 0 50%
    padding: 2em 0em 2em 0em
  .single-comment
    box-sizing: border-box
    padding: 1em
    width: 100%
    height: 100%
    box-shadow: 0.2125em 0.2125em 1em -0.3125em rgba(200,200,200,1)
    .comment-title
      font-size: 1.3em
      font-variation-settings: 'wght' 550
    .comment-body
      color: gray

.comment-button, .modal-button
  border: none
  background-color: $green-accent
  border-radius: $default-border-radius
  width: 6.5em
  height: 3em
  margin: .3em

.lower-part
  text-align: center
  padding: 2em 0em 2em 0em
  p
    font-size: 1.3em
  .back-button
    background-color: white
    border: none
    border: .075em solid $green-accent
    height: 3em
    border-radius: .2em

.modal-container
  padding: 0em 2em 0em 2em

.update-comment-form
  .comment-title
    width: 100%
    padding: 0
    margin-bottom: .7em
    border: 0.0625em solid $green-accent
    border-radius: $default-border-radius
    line-height: 2
  .comment-text
    line-height: 2
    border: 0.0625em solid $green-accent
    border-radius: $default-border-radius
    width: 100%
    padding: 0
    height: 10em
    margin-bottom: 1em
    resize: none

</style>
