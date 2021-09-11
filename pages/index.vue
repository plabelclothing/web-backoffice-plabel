<template>
  <div>
    <title-bar :titleStack="titleStack"/>
    <p>DU[A</p>
  </div>
</template>

<script>
import {CookieConst, RouteConst} from '../assets/const';
import TitleBar from "../components/Layout/TitleBar";

export default {
  layout: 'dashboard',
  data() {
    return {
      isActive:   true,
      cookie:     null,
      titleStack: [
        'Dashboard',
        'General'
      ]
    }
  },
  components: {
    TitleBar,
  },
  head() {
    return {
      title: 'Dashboard | BACKOFFICE | PLABEL CORP.',
      meta:  [
        {
          charset: 'utf-8'
        },
        {
          name:    'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          robots: [{
            UserAgent: '*',
            Disallow:  '/'
          }]
        }
      ],
    }
  },
  mounted() {
    const cookie = this.$cookies.get(CookieConst.A_COOKIE);
    if (!cookie) {
      return this.$router.push({
        name: RouteConst.AUTHORIZATION,
      });
    }
    this.cookie = cookie;
  }
}
</script>
