<template>
  <article id="all-comments">
    <h1>Comments</h1>
    <!-- All comments -->
    <div class="comments-container">
      <comment
        v-for="(comment, index) in getAllComments"
        :key="index"
        @updateComment="showUpdateModal"
        :commentId="comment.id"
        :commentTitle="comment.title"
        :commentBody="comment.body"
      >
      </comment>
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
import comment from '@/components/comment.vue'

export default {
  name: 'allComments',
  components: {
    homeButton,
    comment
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
    showUpdateModal (id, title, body) {
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

<style lang="sass">
  @import '@/assets/sass/allComments.sass'
</style>
