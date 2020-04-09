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
          v-on:change="handleResult(index, presentData.answer)"
          >{{ option }}</b-form-radio
        >
        <b-container>
          <b-row>
            <b-col
              ><radial-progress-bar
                :diameter="230"
                :completed-steps="index"
                :total-steps="10"
                :animateSpeed="1000"
              >
                <h4 class="status">Attempted: {{ index }}</h4>
                <h4 class="status">Remaining: {{ 10 - index }}</h4>
              </radial-progress-bar></b-col
            >
            <b-col
              ><radial-progress-bar
                :diameter="230"
                :completed-steps="score"
                :total-steps="100"
                :animateSpeed="1000"
              >
                <h4 class="status">Score: {{ score }}</h4>
                <h4 class="status">Highest: 100</h4>
              </radial-progress-bar></b-col
            >
          </b-row>
        </b-container>
      </b-form-group>
    </div>
    <div class="result" v-show="showResult">
      <h1>{{ resultMessage }}</h1>
      <b-button variant="light" v-on:click="reset">Play Again</b-button>
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
    RadialProgressBar,
  },
  mixins: [clearSelection, handleResultMessage],
  data() {
    console.log("Hello");
    return {
      questions,
      selected: false,
      index: 0,
      presentData: {},
      score: 0,
      showResult: false,
      resultMessage: "",
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
      if (value == answer) {
        this.score += 10;
      }
      this.index += 1;
      if (this.index === 10) {
        this.showResult = true;
        this.resultMessage = this.handleResultMessage(this.score);
      } else this.presentQuestion();
      this.clearSelection();
      this.selected = false;
    },
    reset() {
      console.log("this.index", this.index);
      this.index = 0;
      this.score = 0;
      this.showResult = false;
      this.presentQuestion();
    },
  },
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
</style>
