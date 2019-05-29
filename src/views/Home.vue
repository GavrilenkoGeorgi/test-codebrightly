<template>
  <section class="home-view-layout">
    <!-- Page header with image -->
    <div class="header">
      <div class="header-width">
        <h1>
          Lorem Ipsum is simply dummy text of
          the printing and typesetting industry
        </h1>
      </div>
    </div>
    <img
      class="main-image"
      src="../assets/images/homePageTitle.jpg"
      alt="Hero image"/>
    <!-- Three blocks with description text -->
    <article id="about" class="about">
      <div class="description-wrapper">
        <div class="description">
          <weAreIcon />
          <h2>Who we are</h2>
          <ul>
            <li>It is a long established fact that a reader will be distracted</li>
            <li>By the readable content of a page when looking at its layout</li>
            <li>The point of using Lorem Ipsum</li>
            <li>As opposed to using 'Content here, content here'.</li>
          </ul>
        </div>
        <div class="description">
          <weDoIcon class="svg-icon"/>
          <h2>What we do</h2>
          <ul>
            <li>Many desktop publishing packages and web page</li>
            <li>There are many variations of passages of Lorem Ipsum available, but the majority have</li>
            <li>Various versions have evolved over the years, sometimes by accident</li>
          </ul>
        </div>
        <div class="description">
          <techIcon />
          <h2>Technology</h2>
          <ul>
            <li>The point of using Lorem Ipsum</li>
            <li>As opposed to using 'Content here, content here'</li>
            <li>Contrary to popular belief, Lorem Ipsum is not simply random text</li>
            <li>A Latin professor at Hampden-Sydney College in Virginia</li>
          </ul>
        </div>
      </div>
    </article>
    <!-- Write comment form -->
    <article id="writeComment" class="write-comment-section">
      <div class="write-comment-wrapper">
        <div class="form-title">
          <p>Write<br />comment</p>
        </div>
        <div class="form-container">
          <form @submit.prevent="sendNewComment()">
            <div class="form-group">
              <input
                class="comment-title"
                :class="{ 'error': $v.commentTitle.$error }"
                type="text"
                id="title"
                name="title"
                aria-label="Comment title"
                placeholder="Title"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='Title'"
                v-model.trim="$v.commentTitle.$model"
              >
              <div
                class="validation-error"
                v-if="!$v.commentTitle.minLength ||
                      !$v.commentTitle.maxLength"
              >
                Title must have at least
                  {{ $v.commentTitle.$params.minLength.min }}
                letters min and
                  {{ $v.commentTitle.$params.maxLength.max }}
                letters max.
              </div>
            </div>
            <br />
            <textarea
              class="comment-text"
              :class="{ 'error': $v.commentBody.$error }"
              type="text"
              id="comment"
              name="comment"
              aria-label="Comment text"
              placeholder="Your comment"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='Your comment'"
              v-model.trim="$v.commentBody.$model"
            >
            </textarea>
            <div
              class="validation-error"
              v-if="!$v.commentBody.minLength ||
                    !$v.commentBody.maxLength"
            >
              Comment must have at least
                {{ $v.commentBody.$params.minLength.min }}
              letters min and
                {{ $v.commentBody.$params.maxLength.max }}
              letters max.
            </div>
            <br />
            <button
              class="send-comment-button"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </article>
    <!-- Confirm comment add modal -->
    <modal
      name="confirm-comment"
      :adaptive="true"
      :width="330"
    >
      <div class="dialog">
        <p>Your comment was successfully added.</p>
        <div class="modal-buttons-layout">
          <button
            type="button"
            @click="hideSentModal"
          >
            Close
          </button>
          <button
            type="button"
            @click="navigateToComments"
          >
            All comments
          </button>
        </div>
      </div>
    </modal>
    <modal
      name="cant-send"
      :adaptive="true"
      :width="330"
    >
      <div class="dialog">
        <p>You have to fill the form properly to send something!</p>
        <button
            type="button"
            @click="hideCantSendModal"
          >
            I understand. )
        </button>
      </div>
    </modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import weAreIcon from '@/assets/svg/weAreIcon.svg'
import weDoIcon from '@/assets/svg/weDoIcon.svg'
import techIcon from '@/assets/svg/techIcon.svg'

export default {
  name: 'home',
  components: {
    weAreIcon,
    weDoIcon,
    techIcon
  },
  data () {
    return {
      commentTitle: undefined,
      commentBody: undefined
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
      `sendComment`
    ]),
    showSentModal () {
      this.$modal.show('confirm-comment')
    },
    hideSentModal () {
      this.$modal.hide('confirm-comment')
    },
    showCantSendModal () {
      this.$modal.show('cant-send')
    },
    hideCantSendModal () {
      this.$modal.hide('cant-send')
    },
    navigateToComments () {
      this.$router.push(`/allComments`)
    },
    clearFormValues () {
      this.commentTitle = undefined
      this.commentBody = undefined
      // and reset validation
      this.$nextTick(() => { this.$v.$reset() })
    },
    sendNewComment () {
      // if all is ok
      if (!this.$v.commentTitle.$error &&
        !this.$v.commentBody.$error &&
        this.commentTitle &&
        this.commentBody) {
        // create new comment
        let date = new Date()
        let timestamp = date.getTime()
        let testComment = {
          created_at: timestamp,
          title: this.commentTitle,
          body: this.commentBody
        }
        this.sendComment(testComment)
          .then(() => {
            this.showSentModal()
            this.clearFormValues()
          })
      } else {
        this.showCantSendModal()
      }
    }
  }
}
</script>

<style src="@/assets/sass/home.sass" lang="sass" scoped></style>
