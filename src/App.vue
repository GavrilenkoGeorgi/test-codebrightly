<template>
  <div id="app">
    <div class="header-container">
      <header><SvgLogo /></header>
      <nav>
        <a href="#">about us</a>
        <a href="#">write comment</a>
        <a href="#">comments</a>
        <!--router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link-->
      </nav>
    </div>
    <router-view />
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
  font-family: 'Arial'

.header-container
  // border: 1px solid pink
  display: flex
  justify-content: space-between
  align-content: center
  align-items: center
  padding: 50px 50px 0px 50px
header
  // border: 1px solid green
  // padding: 50px
nav
  // border: 1px solid blue
  font-size: 16px
  text-transform: uppercase
  a
    text-decoration: none
    padding: 0em 1em 0em 1em
    color: black
</style>
