<template>
  <modal
    name="update-comment"
    :adaptive="true"
    :width="325"
    @before-open="beforeOpen"
  >
    <div class="modal-container">
      <p class="modal-title">
        Update comment.
      </p>
      <div class="form-container">
        <form class="update-comment-form">
          <input
            class="modal-comment-title"
            :class="{ 'error': $v.comment.title.$error }"
            type="text"
            name="title"
            placeholder="Title"
            v-model.trim="$v.comment.title.$model"
          >
          <div
            class="validation-error"
            v-if="!$v.comment.title.minLength ||
                  !$v.comment.title.maxLength"
          >
            Title must have at least
              {{ $v.comment.title.$params.minLength.min }}
            letters min and
              {{ $v.comment.title.$params.maxLength.max }}
            letters max.
          </div>
          <br />
          <textarea
            class="modal-comment-text"
            :class="{ 'error': $v.comment.body.$error }"
            type="text"
            name="comment"
            placeholder="Your comment"
            v-model.trim="$v.comment.body.$model"
          >
          </textarea>
          <div
            class="validation-error"
            v-if="!$v.comment.body.minLength ||
                  !$v.comment.body.maxLength"
          >
            Comment must have at least
              {{ $v.comment.body.$params.minLength.min }}
            letters min and
              {{ $v.comment.body.$params.maxLength.max }}
            letters max.
          </div>
          <br />
          <div class="buttons-layout">
            <button
              class="modal-button"
              type="button"
              @click="validateAndSave(comment)"
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
      originalComment: {}
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  validations: {
    comment: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(15)
      },
      body: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50)
      }
    }
  },
  methods: {
    ...mapActions([
      `deleteComment`
    ]),
    validateAndSave () {
      if (!this.$v.comment.title.$error &&
          !this.$v.comment.body.$error) {
        let date = new Date()
        let timestamp = date.getTime()
        let updatedComment = {
          id: this.comment.id,
          created_at: timestamp,
          title: this.comment.title,
          body: this.comment.body
        }
        // if something changed
        if (this.originalComment.title !== updatedComment.title ||
            this.originalComment.body !== updatedComment.body) {
          this.$emit('validatedComment', updatedComment)
        } else {
          // close modal if user decided
          // not to change anything
          // like clicking cancel
          this.$emit('validatedComment', false)
        }
      } else {
        console.log(`Validation error.`)
      }
    },
    closeModal () {
      this.$emit('closeModal', event)
    },
    beforeOpen (event) {
      this.comment.id = event.params.id
      this.comment.title = event.params.title
      this.comment.body = event.params.body
      this.originalComment = Object.assign(this.originalComment, this.comment)
    }
  }
}
</script>

<style src="@/assets/sass/updateModal.sass" lang="sass"></style>
