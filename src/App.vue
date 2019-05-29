<template>
  <main id="app">
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
  </main>
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
  @import '@/assets/sass/app.sass'
</style>
