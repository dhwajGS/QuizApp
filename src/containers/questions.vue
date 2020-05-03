<template>
  <div class="container" v-if="Object.keys(presentData).length">
    <div v-show="!showResult">
      <b-form-group>
        Q.{{ presentData.id }} {{ presentData.question }}
        <b-form-radio
          v-for="(option, index) in presentData.options"
          :key="index"
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleChoice(index, presentData.answer)"
        >{{ option }}</b-form-radio>
        <b-button
          class="alignRight"
          variant="outline-success"
          v-on:click="handleNext"
        >{{nextButton}}</b-button>
        <radial-progress-bar
          :diameter="200"
          :completed-steps="index"
          :total-steps="10"
          :animateSpeed="1000"
        >
          <br />
          <h4 class="status">Attempted: {{ index }}</h4>
          <h4 class="status">Remaining: {{ 10 - index }}</h4>
        </radial-progress-bar>
      </b-form-group>
    </div>
    <div class="result" v-show="showResult">
      <h1>{{ resultMessage }}</h1>
      <radial-progress-bar
        :diameter="230"
        :completed-steps="score"
        :total-steps="100"
        :animateSpeed="1000"
      >
        <br />
        <h4 class="status">Score: {{ score }}</h4>
        <h4 class="status">Highest: 100</h4>
      </radial-progress-bar>

      <b-button class="alignRight" variant="outline-success" v-on:click="reset">Play Again</b-button>
    </div>
  </div>
</template>

<script>
import { questions } from "../assets/questions";
import RadialProgressBar from "vue-radial-progress";
import clearSelection from "../mixins/clearSelectionMixin";
import handleResultMessage from "../mixins/handleResultMessageMixin";
export default {
  name: "QuestionField",
  components: {
    RadialProgressBar
  },
  mixins: [clearSelection, handleResultMessage],
  data() {
    return {
      questions,
      selected: null,
      answer: "",
      index: 0,
      presentData: {},
      score: 0,
      showResult: false,
      resultMessage: "",
      nextButton: "Next"
    };
  },
  created() {
    // Lifecycle method used to call presentQuestion method initially
    this.presentQuestion();
  },
  methods: {
    presentQuestion() {
      this.presentData = this.questions[this.index];
    },
    handleChoice(value, answer) {
      this.answer = answer;
      this.selected = value;
    },
    handleNext() {
      if (this.answer == this.selected) {
        this.score += 10;
      }
      this.index += 1;
      if (this.index === 10) {
        this.showResult = true;
        this.resultMessage = this.handleResultMessage(this.score);
      } else this.presentQuestion();
      this.clearSelection();
      this.selected = null;
      if (this.index === 9) this.nextButton = "End";
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
  color: #bbff42;
  text-align: start;
}
.alignRight {
  position: relative;
  margin-left: 40%;
}
</style>