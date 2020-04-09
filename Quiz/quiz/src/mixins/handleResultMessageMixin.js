export default {
  methods: {
    handleResultMessage: (score) => {
      let resultMessage = "";
      if (score >= 70) {
        resultMessage = `Congrats Potter Head !!! Your score is ${score}`;
      } else if (score >= 40) {
        resultMessage = ` Your score is ${score}. You can do better !!!`;
      } else {
        resultMessage = `Your score is ${score}. You can try watching Potter series !!!`;
      }
      return resultMessage;
    },
  },
};
