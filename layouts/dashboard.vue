<template>
  <div>
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <Nuxt/>
  </div>
</template>

<script>
import NavBar from '../components/Layout/NavBar'
import AsideMenu from '../components/Layout/AsideMenu'

export default {
  name:       'dashboard',
  components: {
    AsideMenu,
    NavBar
  },
  computed:   {
    menu() {
      return [
        'General',
        [
          {
            to:    '/',
            icon:  'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Other',
        [
          {
            to:         '/sales',
            label:      'Sales',
            icon:       'currency-usd',
          },
        ],
      ]
    }
  },
  created() {
    document.getElementsByTagName('html')[0].classList.add('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded');
  },
}
</script>
