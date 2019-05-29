<template>
  <article id="all-comments">
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
        <div class="controls-layout">
          <router-link
            class="readmore-link"
            :to="{ path: `/singleComment/${comment.id}`}"
          >
            Read more
          </router-link>
          <button
            class="comment-button"
            type="button"
            @click="deleteComment(comment.id)"
          >
            Delete
          </button>
          <button
            class="comment-button"
            type="button"
            @click="showUpdateModal(comment.title, comment.body, comment.id)"
          >
            Update
          </button>
        </div>
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
              :class="{ 'error': $v.commentTitle.$error }"
              type="text"
              name="title"
              placeholder="Title"
              v-model.trim="$v.commentTitle.$model"
            >
            <br />
            <textarea
              class="comment-text"
              :class="{ 'error': $v.commentBody.$error }"
              type="text"
              name="comment"
              placeholder="Your comment"
              v-model.trim="$v.commentBody.$model"
            >
            </textarea>
            <br />
            <div class="buttons-layout">
              <button
                class="modal-button"
                type="button"
                @click="handleSaveComment(commentId)"
              >
                Save
              </button>
              <button
                class="modal-button"
                type="button"
                @click="hideUpdateModal()"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import homeButton from '@/components/homeButton.vue'

export default {
  name: 'allComments',
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
  validations: {
    commentTitle: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(15)
    },
    commentBody: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50)
    }
  },
  created () {
    this.setAllComments()
  },
  methods: {
    ...mapActions([
      `deleteComment`,
      `updateComment`,
      `setAllComments`
    ]),
    handleSaveComment (id) {
      if (id && !this.$v.commentTitle.$error &&
          !this.$v.commentBody.$error &&
          this.commentTitle &&
          this.commentBody) {
        let date = new Date()
        let timestamp = date.getTime()
        let updatedComment = {
          id: id,
          created_at: timestamp,
          title: this.commentTitle,
          body: this.commentBody
        }
        this.updateComment(updatedComment).then(() => {
          this.hideUpdateModal()
        })
      }
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

article
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
  .single-comment
    flex: 0 50%
    padding: 2em 0em 2em 0em
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

.controls-layout
  display: flex

.comment-button, .modal-button, .readmore-link
  font-size: 1em
  border: none
  background-color: $green-accent
  border-radius: $default-border-radius
  width: 5.5em
  height: 2.6em
  line-height: 2.6em
  margin: .3em
  text-decoration: none
  text-align: center
  color: black
  padding: 0

.modal-button:first-child
  margin-left: 0

.modal-container
  padding: 1em
  display: flex
  flex-direction: column
  p
    font-size: 1.3em

.update-comment-form
  .comment-title, .comment-text
    box-sizing: border-box
    width: 100%
    padding: .5em
    border: .0625em solid $green-accent
    border-radius: $default-border-radius
  .comment-title
    margin-bottom: .7em
  .comment-text
    height: 8em
    resize: none
  .error
    border: .08em solid red

</style>
