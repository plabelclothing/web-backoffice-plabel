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
import {CookieConst, RouteConst} from '../assets/const';

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
          },
          {
            to:    '/sales',
            label: 'Sales',
            icon:  'currency-usd',
          },
        ],
        'Other',
        [],
      ]
    }
  },
  created() {
    document.getElementsByTagName('html')[0].classList.add('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded');
  },
  async mounted() {
    const cookie = this.$cookies.get(CookieConst.A_COOKIE);
    if (!cookie) {
      return this.$router.push({
        name: RouteConst.AUTHORIZATION,
      });
    }

    /** get default data **/
    try {
      const resultOfGetData = await this.$api.userData(cookie);
      this.$store.commit('SET_USER_EMAIL', resultOfGetData.data.data.userEmail);
    } catch (e) {
      const now = new Date();
      this.$cookies.remove(CookieConst.A_COOKIE, {
        expires: now.toUTCString(),
        path:    '/'
      });
      return this.$router.push({
        name: RouteConst.AUTHORIZATION,
      });
    }
  },
}
</script>
