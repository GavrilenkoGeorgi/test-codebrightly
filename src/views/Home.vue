<template>
  <main>
    <article class="home-title">
      <h1>Lorem Ipsum is simply <br />dummy text of the printing<br /> and typesetting industry</h1>
      <div class="image-container">
        <img class="main-image cover" src="../assets/images/homePageTitle.jpg" />
      </div>
    </article>
    <article class="about">
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
        <weDoIcon />
        <h2>What we do</h2>
        <ul>
          <li>Many desktop publishing packages and web page</li>
          <li>There are many variatins of passages of Lorem Ipsum available, but the majority have</li>
          <li>Various versions have evolved over the years, sometimes by accident</li>
        </ul>
      </div>
      <div class="description">
        <techIcon />
        <h2>Technology</h2>
        <ul>
          <li>The point of using Lorem Ipsum</li>
          <li>As opposed to using 'Content here, content here'</li>
          <li>Contrary to polular belief, Lorem Ipsum is not simply random text</li>
          <li>A Latin professor at Hampden-Sydney College in Virginia</li>
        </ul>
      </div>
    </article>
    <article class="write-comment-section">

      <div class="form-title">
        <p>Write<br />comment</p>
      </div>

      <div class="form-container">
        <form>
          <input
            class="comment-title"
            type="text"
            name="title"
            placeholder="Title"
          >
          <br />
          <textarea
            class="comment-text"
            type="text"
            name="comment"
            placeholder="Your comment"
          >
          </textarea>
          <br />
          <input
            class="send-comment-button"
            type="submit"
            value="Send"
          >
        </form>
      </div>
    </article>
    <footer>
      <div class="contacts-container">
        mail@mailtest.com <br />
        +30-6977664062
      </div>
      <div class="copyrights">
        Copyright &copy; 2019 Test All Rights Reserved.
      </div>
    </footer>
  </main>
</template>

<script>
import weAreIcon from '@/assets/svg/weAreIcon.svg'
import weDoIcon from '@/assets/svg/weDoIcon.svg'
import techIcon from '@/assets/svg/techIcon.svg'

export default {
  name: 'home',
  components: {
    weAreIcon,
    weDoIcon,
    techIcon
  }
}
</script>

<style lang="sass" scoped>
.home-title
  font-size: 2.2em
  line-height: 1.3
  h1
    padding: 0em 7em 0em 3.5em

.main-image
  height: 470px
  width: 100%
  object-fit: cover
.image-container
  background-color: #f7f7f7

.about
  // border: 1px solid pink
  padding: 0em 12em 0em 12em
  height: 470px
  display: flex
  justify-content: space-around
  background-color: #f7f7f7

.description
  // border: 1px solid green
  flex-grow: 1
  flex-basis: 0
  padding: 3em
  ul
    padding-left: 1em
  li
    padding: .4em 0em .4em 0em

.description:first-child
  padding-left: 0

.description:last-child
  padding-right: 0

.write-comment-section
  // border: 1px solid blue
  padding: 10em 12em 0em 12em
  height: 574px
  display: flex
  justify-content: space-between
  background-color: #1d1e25
  p
    margin: 0

.form-title
  // border: 1px solid yellow
  color: white
  font-size: 3em
  line-height: 1
  &:after
    display: inline-block
    content: ''
    // border: 2px solid red
    background-color: #f9d10d
    width: 1.5em
    height: .1em

.form-container
  // border: 1px solid #60e3a1
  font-size: 1.3em

.comment-title
  width: 590px
  margin-bottom: 1em
  border: 1px solid #60e3a1
  border-radius: 5px
  padding: 1em
  background-color: #1d1e25

.comment-title::placeholder
  color: #60e3a1

.comment-text
  border: 1px solid #60e3a1
  border-radius: 5px
  padding: 1em
  width: 590px
  height: 150px
  resize: none
  background-color: #1d1e25

.comment-text::placeholder
  color: #60e3a1

.send-comment-button
  border: none
  width: 150px
  height: 55px
  margin-top: .8em
  border-radius: 5px
  background-color: #60e3a1
  font-size: .8em

footer
  // border: 1px solid black
  display: flex
  justify-content: space-between
  align-items: center
  color: white
  background-color: #1d1e25
  padding: 1.5em 3em 1.5em 3em
  .contacts-container
    line-height: 2
  .copyrights
    color: #4a4d5e
</style>
