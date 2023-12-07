<template>
  <div id="app">
    <Demo />
  </div>
</template>

<script>
import Demo from './components/Demo.vue'


export default {
  name: 'App',
  components: {
    Demo
  },
  mounted() {
    // const script = document.createElement('script');
    // script.src = 'https://kit.fontawesome.com/43263daed0.js';
    // script.crossOrigin = 'anonymous';
    // document.head.appendChild(script);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
