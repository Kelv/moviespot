<template lang="pug">
  v-app#app
    transition(name="fade")
      router-view
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.15s;
}

.fade-enter-active {
  transition-delay: 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
