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
    <img class="main-image" src="../assets/images/homePageTitle.jpg" />
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
              @click.prevent="sendComment()"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </article>
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
            this.$router.push(`/allComments`)
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
  height: 470px
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
  border-bottom: 1px solid gray
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

.comment-title
  color: white
  width: 100%
  margin-bottom: .7em
  border: 1px solid $green-accent
  border-radius: 5px
  background-color: $dark-background
  font-size: 1.2em
  line-height: 2

.comment-title.error
  border: 1px solid red

.comment-title::placeholder
  color: $green-accent
  padding-left: .3em

.comment-text
  line-height: 2
  border: 1px solid $green-accent
  border-radius: 5px
  font-size: 1.2em
  width: 100%
  color: white
  padding: 0
  height: 150px
  resize: none
  background-color: $dark-background

.comment-text::placeholder
  color: $green-accent
  padding-left: .3em

.send-comment-button
  border: none
  width: 150px
  height: 55px
  margin-top: .8em
  border-radius: 5px
  background-color: $green-accent
  font-size: .9em

.validation-error
  color: white

</style>
