<template>
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
              @click="validateAndSave(commentToUpdate)"
            >
              Save
            </button>
            <button
              class="modal-button"
              type="button"
              @click="closeModal()"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'updateModal',
  data () {
    return {
      commentTitle: undefined,
      commentBody: undefined
    }
  },
  props: {
    commentToUpdate: {
      type: Object,
      required: true
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
  methods: {
    ...mapActions([
      `deleteComment`
    ]),
    validateAndSave () {
      if (!this.$v.commentTitle.$error &&
          !this.$v.commentBody.$error) {
        let date = new Date()
        let timestamp = date.getTime()
        let updatedComment = {
          id: this.commentToUpdate.id,
          created_at: timestamp,
          title: this.commentTitle,
          body: this.commentBody
        }
        this.$emit('validatedComment', updatedComment)
      } else {
        console.log(`Validation error.`)
      }
    },
    closeModal () {
      this.$emit('closeModal', event)
    },
    beforeOpen (event) {
      this.commentTitle = event.params.title
      this.commentBody = event.params.body
      this.commentToUpdate.id = event.params.id
    }
  }
}
</script>
