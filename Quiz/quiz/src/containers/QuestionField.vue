<template>
  <div class="container" v-if="Object.keys(presentData).length">
    <div v-show="!showResult">
      <b-form-group>
        Q.{{presentData.id}} {{presentData.question}}
        <b-form-radio
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleResult('A',presentData.answer)"
        >{{presentData.options[0]}}</b-form-radio>
        <b-form-radio
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleResult('B',presentData.answer)"
        >{{presentData.options[1]}}</b-form-radio>
        <b-form-radio
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleResult('C',presentData.answer)"
        >{{presentData.options[2]}}</b-form-radio>
        <b-form-radio
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleResult('D',presentData.answer)"
        >{{presentData.options[3]}}</b-form-radio>
      </b-form-group>
      <h6 class="status">{{10 - index}} Questions To go</h6>
      <b-progress-bar
        :value="index"
        :max="10"
        variant="success"
        striped
        :animated="true"
        class="mt-2"
      ></b-progress-bar>
    </div>
    <div class="result" v-show="showResult">
      <h1>Congrats !!! you scored {{score}}</h1>
      <b-button variant="light" v-on:click="reset">Play Again</b-button>
    </div>
  </div>
</template>

<script>
import { questions } from "../assets/questions";

export default {
  name: "QuestionField",
  data() {
    console.log("Hello");
    return {
      questions,
      selected: false,
      index: 0,
      presentData: {},
      score: 0,
      showResult: false
    };
  },
  created() {
    // Lifecycle method used to call presentQuestion method initially
    this.presentQuestion();
  },
  methods: {
    presentQuestion() {
      //
      this.presentData = this.questions[this.index];
    },
    handleResult(value, answer) {
      if (value === answer) {
        this.score += 1;
      }
      this.index += 1;
      if (this.index === 10) {
        this.showResult = true;
      } else this.presentQuestion();
      this.clearSelection();
    },
    clearSelection() {
      this.selected = false;
      // selected radio button get unselected
      document.getElementById("__BVID__7").checked = false;
      document.getElementById("__BVID__8").checked = false;
      document.getElementById("__BVID__9").checked = false;
      document.getElementById("__BVID__10").checked = false;
    },
    reset() {
      console.log("this.index", this.index);
      this.index = 0;
      this.score = 0;
      this.showResult = false;
      this.presentQuestion();
    }
  }
};
</script>

<style scoped>
div {
  text-size-adjust: inherit;
  font-size: xx-large;
  font-family: fantasy;
  padding-top: 40px;
  text-align: left;
  color: white;
  border: none;
}
.result {
  text-size-adjust: inherit;
  font-size: xx-large;
  font-family: fantasy;
  padding-top: 100px;
  text-align: left;
  color: white;
  border: none;
}
.status {
  color: burlywood;
  text-align: start;
}
</style>
