<template>
  <Auth
      :message="message"
      @loginButton="loginButton"
  />
</template>

<script>
import Auth from '/components/Authorization/Auth';
import {Messages, CookieConst, RouteConst} from '../assets/const';

export default {
  name:       'authorization',
  components: {
    Auth,
  },
  head() {
    return {
      title: 'Authorization page | BACKOFFICE | PLABEL CORP.',
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
            Disallow:  '/authorization'
          }]
        }
      ],
    }
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    async loginButton(login, password) {
      try {
        const resultOfLogin = await this.$api.signin(login, password);
        this.$store.commit('SET_USER_EMAIL', resultOfLogin.data.data.userEmail);
        this.$cookies.set(CookieConst.A_COOKIE, resultOfLogin.data.data.token, {
          maxAge: CookieConst.EXPIRES,
          path:   '/'
        });
        return this.$router.push({
          name: RouteConst.INDEX,
        });
      } catch (e) {
        this.message = Messages.AUTHORIZATION.LOGIN_PASSWORD_NOT_CORRECT;
      }
    }
  }
}
</script>
