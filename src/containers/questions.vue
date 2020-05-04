<template>
  <div class="grid-container" v-if="Object.keys(presentData).length">
    <div v-show="!showResult">
      <radial-progress-bar
        class="grid-item item2"
        :diameter="300"
        :completed-steps="index"
        :total-steps="10"
        :animateSpeed="1000"
      >
        <br />&nbsp;&nbsp;
        <p>Attempted: {{ index }}</p>&nbsp;&nbsp;
        <p>Remaining: {{ 10 - index }}</p>
      </radial-progress-bar>
      <b-form-group class="grid-item item1">
        Q.{{ presentData.id }} {{ presentData.question }}
        <b-form-radio
          v-for="(option, index) in presentData.options"
          :key="index"
          name="radio"
          stacked
          size="lg"
          v-model="selected"
          v-on:change="handleChoice(index, presentData.answer)"
        >
          <h2>{{ option }}</h2>
        </b-form-radio>

        <b-button size="lg" v-on:click="handleNext">{{nextButton}}</b-button>
        <b-alert
          class="alert-link alert"
          :show="dismissCountDown"
          dismissible
          fade
          variant="info"
          @dismiss-count-down="countDownChanged"
        >
          <h6>Select one option...</h6>
        </b-alert>
      </b-form-group>
    </div>
    <div v-show="showResult" class="result">
      <h1>{{ resultMessage }}</h1>
      <img
        :src="require(`../assets/${resultImage}.png`)"
        alt="resultImage"
        width="600"
        height="500"
      />
      <br />
      <b-button size="lg" v-on:click="reset">Retake</b-button>
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
      nextButton: "Next",
      popoverDisabled: false,
      resultImage: "mid",
      dismissSecs: 1,
      dismissCountDown: 0
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
      this.popoverDisabled = true;
    },
    handleNext() {
      if (this.selected == null) return this.showAlert();
      this.popoverDisabled = false;
      if (this.answer == this.selected) {
        this.score += 10;
      }
      this.index += 1;
      if (this.index === 10) {
        if (this.score >= 70) this.resultImage = "high";
        else if (this.score >= 40) this.resultImage = "mid";
        else this.resultImage = "low";
        this.showResult = true;
        this.resultMessage = this.handleResultMessage(this.score);
      } else this.presentQuestion();
      this.clearSelection();
      this.selected = null;
      if (this.index === 9) this.nextButton = "End";
    },
    reset() {
      this.index = 0;
      this.score = 0;
      this.showResult = false;
      this.nextButton = "Next";
      this.selected = null;
      this.popoverDisabled = false;
      this.presentQuestion();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style scoped>
div {
  font-family: fantasy;
  padding-top: 21px;
  color: rgb(245, 238, 238);
  border: none;
}
.grid-container {
  display: grid;
  grid-gap: 0px;
  padding: 10px;
}

.item1 {
  position: absolute;
  top: 20%;
  font-size: 50px;
  text-align: left;
  grid-column: 1;
  grid-row: 1;
  margin-left: 40px;
}

.item2 {
  position: relative;
  left: 80%;
  color: #54ec18;
  font-size: 30px;
  text-align: center;
  grid-column: 3;
  grid-row: 1;
}

.result {
  position: absolute;
  padding-left: 25%;
  top: 20%;
  align-self: center;
  font-size: 50px;
  text-align: center;
}

.alert {
  color: black;
  width: 250px;
}
</style>