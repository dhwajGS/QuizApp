<template>
  <div id="app">
    <Header />
    <Questions />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Questions from "./containers/questions";
export default {
  name: "App",
  components: {
    Header,
    Questions,
    Footer
  }
};
</script>

<style scoped>
#app {
  font-family: fantasy;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
