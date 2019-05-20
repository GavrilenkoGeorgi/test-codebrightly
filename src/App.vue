<template>
  <div id="app">
    <!-- header & nav -->
    <div class="header-container">
      <header><SvgLogo /></header>
      <nav>
        <a href="#">about us</a>
        <a href="#">write comment</a>
        <router-link to="/allComments">comments</router-link>
        <!--router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link-->
      </nav>
    </div>
    <!-- router-view -->
    <section class="router-view-layout">
      <router-view />
    </section>
    <!-- spacer -->
    <div class="spacer"></div>
    <!-- footer -->
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

body
  margin: 0
  font-family: 'Tahoma Regular'
  // font-family: 'Courier'

.spacer
  flex: 1

#app
  display: flex
  flex-direction: column
  min-height: 100vh
  // border: 1px solid blue
  // min-height: 100%
  // flex: 1 0 auto
  // position: relative
  // padding-bottom: 4em // footer height var

.wrapper
  min-height: 100%
  height: auto !important
  height: 100%
  margin: 0 auto -4em

.header-container
  // border: 1px solid pink
  display: flex
  justify-content: space-between
  align-content: center
  align-items: center
  padding: 3em

nav
  // border: 1px solid blue
  font-size: 16px
  text-transform: uppercase
  a
    text-decoration: none
    padding: 0em 1em 0em 1em
    color: black
  a:last-child
    padding-right: 0

.router-view-layout
  // border: 1px solid green
  width: 100%
  display: flex
  justify-content: center
  // padding-bottom: 4em // footer height var

footer
  // border: 1px solid black
  // flex-shrink: 0
  display: flex
  height: 4em
  justify-content: space-between
  align-items: center
  color: white
  background-color: #1d1e25
  // position: absolute
  // width: 100%
  // bottom: 0
  padding: 1em 3em 1em 3em
  .contacts-container
    line-height: 1.8
  .copyrights
    color: #4a4d5e
</style>
