<template>
    <div>
        <div class="div_logo">
            <img src="https://cdn.plabelclothing.com/source/web-portal-plabel/other/logo-small.png">
        </div>
        <br>
        <section class="section reg_form">
            <!--<b-field class="h2_title">-->
            <!--<h2 class="title">-->
            <!--Login to backoffice panel-->
            <!--</h2>-->
            <!--</b-field>-->
            <b-field label="Username"
                     message="This username is available">
                <b-input value="johnsilver" maxlength="30"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password"
                         value="iwantmytreasure"
                         password-reveal>
                </b-input>
            </b-field>
            <b-field>
                <b-button>Login</b-button>
            </b-field>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Auth'
    }
</script>

<style>
    .div_logo {
        margin: 10% auto 0%;
        width: 150px;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .reg_form {
        margin: 0 auto;
        width: 400px;
    }
</style>