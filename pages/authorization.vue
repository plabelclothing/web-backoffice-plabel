<template>
  <Auth
      :message="message"
      @loginButton="loginButton"
  />
</template>

<script>
import Auth from '/components/Authorization/Auth';
import {Messages} from '../assets/const';

export default {
  name:       'authorization',
  components: {
    Auth,
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
      } catch (e) {
        this.message = Messages.AUTHORIZATION.LOGIN_PASSWORD_NOT_CORRECT;
      }
    }
  }
}
</script>
