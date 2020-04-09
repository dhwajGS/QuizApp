<template>
  <div id="app">
    <TheHeader />
    <QuestionField />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import QuestionField from "./containers/QuestionField";
export default {
  name: "App",
  components: {
    TheHeader,
    QuestionField,
    TheFooter
  }
};
</script>

<style>
#app {
  font-family: fantasy;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
