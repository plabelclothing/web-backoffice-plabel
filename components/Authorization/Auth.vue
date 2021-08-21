<template>
  <div>
    <section @keydown.enter="$emit('loginButton', login, password)" class="section reg_form">
      <div class="div_logo">
        <img src="https://cdn.plabelclothing.com/source/web-portal-plabel/other/logo-small.png">
      </div>
      <br>
      <b-field label="Username"
               :message=message>
        <b-input v-model="login"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password"
                 v-model="password"
                 password-reveal>
        </b-input>
      </b-field>
      <b-field class="button_center">
        <b-button @click="$emit('loginButton', login, password)">Login</b-button>
      </b-field>
    </section>
  </div>
</template>

<script>
export default {
  name:  'Auth',
  props: {
    message:     String,
    loginButton: Function,
  },
  data() {
    return {
      login:    null,
      password: null,
    }
  },
}
</script>

<style>
.div_logo {
  margin:10% auto 0%;
  width:150px;
}

.button_center {
  display:flex;
  justify-content:center;
  align-items:center;
}

.reg_form {
  margin:0 auto;
  width:400px;
}
</style>
