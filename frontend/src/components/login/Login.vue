<template lang="pug">
  v-content
        v-container(fluid, fill-height)
            v-layout(justify-center)
                v-flex(xs12, sm8, md4)
                    div#logo-container
                      img#logo(alt="logo", src="../../assets/logo.png")
                    v-card.elevation-12
                        //- v-toolbar(light).elevation-0
                        //-     v-toolbar-title Login
                        v-card-text
                            v-form(v-model="form.valid", ref="form", lazy-validation)
                                v-text-field(name="username", v-model="credentials.username", prepend-icon="face", v-on:keyup.13='submit', label="Username", type="text", :rules="form.userRules")
                                v-text-field(name="password", v-model="credentials.password", prepend-icon="lock", label="Password", v-on:keyup.13='submit', :append-icon="form.passwordVisible ? 'visibility' : 'visibility_off'", :append-icon-cb="() => (form.passwordVisible = !form.passwordVisible)", :type="form.passwordVisible ? 'text' : 'password'", :rules="form.passwordRules")#password
                        v-card-text.text-xs-center
                          v-layout(row, wrap).mb-3
                            v-flex(xs12)
                              v-btn(@click.prevent="submit", color="primary", round, dark)
                                span(v-show="!loading") Login
                                v-progress-circular(v-show="loading", color="white", :size="24", indeterminate)
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      form: {
        valid: false,
        passwordVisible: false,
        userRules: [v => !!v || "Please, enter your username"],
        passwordRules: [v => !!v || "Please, enter your password"]
      },
      loading: false,
      credentials: {}
    };
  },
  created(){
    if(this.auth.isLoggedIn){
      this.$router.push('/rentals')
    }
  },
  computed: {
    ...mapState({
      auth: 'auth'
    })
  },
  methods: {
    enterPressed() {
      this.submit();
    },
    submit() {
      var self = this
      this.login(this.credentials)
          .then(() => {
            self.$router.push('/rentals')
          })
          .catch(console.log)
    },
    ...mapActions({
      login: "login"
    })
  }
};
</script>
<style scoped>
#logo {
  width: 175x;
  height: 100px;
  margin: 50px;
  border: 0px none #fff;
  src: url("../../assets/logo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#logo-container img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: block;
}
</style>


