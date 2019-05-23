<template>
  <main class="home-view-layout">
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
          <form>
            <div class="form-group" >
              <input
                class="comment-title"
                :class="{ 'error': $v.commentTitle.$error }"
                type="text"
                name="title"
                aria-label="Comment title"
                placeholder="Title"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='Title'"
                v-model.trim="$v.commentTitle.$model"
              >
              <div
                class="validation-error"
                v-if="!$v.commentTitle.minLength"
              >
                Title must have at least
                  {{ $v.commentTitle.$params.minLength.min }}
                letters.
              </div>
            </div>
            <br />
            <textarea
              class="comment-text"
              :class="{ 'error': $v.commentBody.$error }"
              type="text"
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
              v-if="!$v.commentBody.minLength"
            >
              Comment must have at least
                {{ $v.commentBody.$params.minLength.min }}
              letters.
            </div>
            <br />
            <button
              class="send-comment-button"
              :class="{ 'disabled': $v.commentTitle.$error || $v.commentBody.$error }"
              @click.prevent="sendComment()"
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
      :width="300"
      :height="150"
    >
      <div class="confirm-comment-modal">
        <p>Your comment was successfully added.</p>
        <button @click.prevent="hideModal">Close</button>
        <button @click.prevent="navigateToComments">All comments</button>
      </div>
    </modal>
  </main>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
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
      minLength: minLength(4)
    },
    commentBody: {
      required,
      minLength: minLength(10)
    }
  },
  methods: {
    showModal () {
      this.$modal.show('confirm-comment')
    },
    hideModal () {
      this.$modal.hide('confirm-comment')
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
    sendComment () {
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
        this.$store.dispatch(`sendComment`, testComment)
          .then(() => {
            this.showModal()
            this.clearFormValues()
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/mixins.sass'
@import '@/assets/sass/vars.sass'

.home-view-layout
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.header
  padding: 0em 1em 0em 1em
  +handheld(2, 600px)
    width: $main-layout-width
  +desktop(96dpi, 600px)
    width: $main-layout-width
  .header-width
    +handheld(2, 600px)
      width: 85%
    +desktop(96dpi, 600px)
      width: 85%
  h1
    font-size: 2.3em
    font-variation-settings: 'wght' 500
    line-height: 1.2
    +handheld(2, 600px)
      font-size: 4em
    +desktop(96dpi, 600px)
      font-size: 4em

.home-title
  font-size: 2.2em
  line-height: 1.3

.main-image
  height: 30em
  width: 100%
  object-fit: cover

.image-container
  background-color: $gray-background

.about
  width: 100%
  display: flex
  justify-content: center
  background-color: $gray-background
  .description-wrapper
    display: flex
    flex-direction: column
    +handheld(2, 600px)
      flex-direction: row
      padding: 2.5em 0em 2.5em 0em
      width: $main-layout-width
    +desktop(96dpi, 900px)
      flex-direction: row
      padding: 2.5em 0em 2.5em 0em
      width: $main-layout-width

.description
  flex-grow: 1
  flex-basis: 0
  padding: 2em
  h2
    font-size: 2.2em
    font-variation-settings: 'wght' 500
  ul
    padding-left: 1em
  li
    padding: .4em 0em .4em 0em

.description:first-child
  +handheld(2, 600px)
    padding-left: 0
  +desktop(96dpi, 900px)
    padding-left: 0

.description:last-child
  +handheld(2, 600px)
    padding-right: 0
  +desktop(96dpi, 900px)
    padding-right: 0

.write-comment-section
  padding: 4em 0em 4em 0em
  display: flex
  justify-content: center
  background-color: $dark-background
  border-bottom: 0.0625em solid gray
  width: 100%
  .write-comment-wrapper
    width: $main-layout-width
    display: flex
    flex-direction: column
    justify-content: space-around
    +handheld(2, 600px)
      flex-direction: row
    +desktop(96dpi, 900px)
      flex-direction: row
  p
    margin: 0
    font-variation-settings: 'wght' 575

.form-title
  flex: 0 35%
  color: white
  font-size: 2.6em
  &:after
    display: inline-block
    content: ''
    background-color: $yellow-accent
    width: 1.5em
    height: .1em
    margin-bottom: .5em

.form-container
  flex: 0 55%
  font-size: 1.3em

.comment-title, .comment-text
  box-sizing: border-box
  padding: 0.5em

.comment-title
  color: $green-accent
  width: 100%
  border: 0.0625em solid $green-accent
  border-radius: $default-border-radius
  background-color: $dark-background
  font-size: 1.2em

.comment-title.error
  border: 0.0625em solid red

.comment-title::placeholder
  color: $green-accent
  padding-left: .3em

.comment-text
  border: 0.0625em solid $green-accent
  border-radius: $default-border-radius
  font-size: 1.2em
  width: 100%
  color: $green-accent
  height: 7em
  resize: none
  background-color: $dark-background

.comment-text::placeholder
  color: $green-accent
  padding-left: .3em

.send-comment-button
  border: none
  width: 9em
  height: 3em
  margin-top: .8em
  border-radius: $default-border-radius
  background-color: $green-accent
  font-size: .9em

.disabled
  background-color: gray

.validation-error
  color: $yellow-accent
  padding: .5em

.confirm-comment-modal
  color: $green-accent
  background-color: $dark-background
  padding: .5em
  text-align: center
  height: 100%
  border: 0.0625em solid $green-accent
  border-radius: $default-border-radius
  box-sizing: border-box
  p
    margin: 0
    padding-bottom: 1em
    font-size: 1.1em
  button
    border: none
    border-radius: $default-border-radius
    background-color: $green-accent
    height: 3em
    width: 8em
    margin: .2em
    font-size: .8em
    padding: 0em
</style>
