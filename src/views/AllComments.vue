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
    <!-- Update comment modal window -->
    <updateModal
      @validatedComment="saveToStore"
      @closeModal="hideUpdateModal"
      :commentToUpdate="commentToUpdate"
    >
    </updateModal>
    <!-- Back button -->
    <homeButton />
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import homeButton from '@/components/homeButton.vue'
import comment from '@/components/comment.vue'
import updateModal from '@/components/updateModal.vue'

export default {
  name: 'allComments',
  components: {
    homeButton,
    comment,
    updateModal
  },
  computed: {
    ...mapGetters([
      `getAllComments`
    ])
  },
  data () {
    return {
      commentToUpdate: {
        id: undefined,
        title: undefined,
        body: undefined
      }
    }
  },
  created () {
    this.setAllComments()
  },
  methods: {
    ...mapActions([
      `updateComment`,
      `setAllComments`
    ]),
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
    saveToStore (comment) {
      this.updateComment(comment)
        .then(() => {
          this.hideUpdateModal()
        })
    }
  }
}
</script>

<style src='@/assets/sass/allComments.sass' lang="sass"></style>
