<template>
  <div class="single-comment">
    <span class="comment-title">
      {{ commentTitle }}
    </span>
    <br />
    <p class="comment-body">
      {{ commentBody }}
    </p>
    <router-link
      :to="{ path: `/singleComment/${commentId}`}"
    >
      <button
        class="comment-button"
        type="button"
      >
        Read more
      </button>
    </router-link>
    <button
      class="comment-button"
      type="button"
      @click="deleteComment(commentId)"
    >
      Delete
    </button>
    <button
      class="comment-button"
      type="button"
      @click="updateComment(commentId, commentTitle, commentBody)"
    >
      Update
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'oneComment',
  props: {
    commentId: {
      type: String,
      required: true
    },
    commentTitle: {
      type: String,
      required: true
    },
    commentBody: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions([
      `deleteComment`
    ]),
    updateComment (id, title, body) {
      this.$emit('updateComment', id, title, body)
    }
  }
}
</script>
