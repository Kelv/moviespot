<template lang="pug">
  transition(name="fade")
    router-view
</template>

<script>

import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  created(){
    if(!this.auth.isLoggedIn){
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      auth: 'auth'
    })
  }
}
</script>
