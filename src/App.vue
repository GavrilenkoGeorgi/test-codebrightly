<template>
  <div id="app">
    <!-- Header & nav -->
    <div class="header-container">
      <header>
        <router-link
          to="/"
          aria-label="Back to home page."
        >
          <SvgLogo />
        </router-link>
      </header>
      <nav>
        <a href="/#about">
          about us
        </a>
        <a href="/#writeComment">
          write comment
        </a>
        <router-link to="/allComments">
          comments
        </router-link>
      </nav>
    </div>
    <!-- Router-view -->
    <section class="router-view-layout">
      <router-view />
    </section>
    <!-- Spacer -->
    <div class="spacer"></div>
    <!-- Footer -->
    <footer>
      <div class="contacts-container">
        mail@mailtest.com<br />
        +30-6977664062
      </div>
      <div class="copyrights">
        Copyright &copy; 2019 Test All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import SvgLogo from '@/assets/svg/logo.svg'

export default {
  name: 'App',
  components: {
    SvgLogo
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/mixins.sass'
@import '@/assets/sass/vars.sass'
@import '@/assets/sass/fonts.sass'

html
  scroll-behavior: smooth

body
  font-size: 16px
  margin: 0

.spacer
  flex: 1

#app
  display: flex
  flex-direction: column
  min-height: 100vh

.wrapper
  min-height: 100%
  height: auto !important
  height: 100%
  margin: 0 auto -4em

.header-container
  display: flex
  justify-content: space-around
  align-items: center
  padding: 1em 0em 1em 0em
  +desktop(96dpi, 600px)
    justify-content: space-between
    padding: 3em
  +handheld(2, 600px)
    justify-content: space-between
    padding: 3em

nav
  text-transform: uppercase
  display: flex
  flex-direction: column
  +handheld(2, 600px)
    flex-direction: row
  +desktop(96dpi, 600px)
    flex-direction: row
  a
    text-decoration: none
    padding: .4em 0em .4em 0em
    color: black
    display: flex
    flex-direction: column
    font-variation-settings: 'wght' 475
    +handheld(2, 600px)
      padding: 0em 1em 0em 1em
    +desktop(96dpi, 600px)
      padding: 0em 1em 0em 1em
  a.router-link-active
    &:before
      content: ''
      background-color: $yellow-accent
      width: 100%
      height: .1em

.router-view-layout
  width: 100%
  display: flex
  justify-content: center

footer
  display: flex
  height: 4em
  justify-content: space-between
  align-items: center
  color: white
  background-color: $dark-background
  padding: 1em
  font-size: .75em
  line-height: 1.5
  +handheld(2, 600px)
    padding: 1em 3em 1em 3em
    line-height: 1.5
    font-size: .75em
  .copyrights
    color: $copyright-color
    text-align: right
</style>
