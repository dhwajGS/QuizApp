export default {
  methods: {
    handleResultMessage: (score) => {
      let resultMessage = "";
      if (score >= 7) {
        resultMessage = `Congrats Potter Head !!! Your score is ${score}`;
      } else if (score >= 4) {
        resultMessage = ` Your score is ${score}. You can do better !!!`;
      } else {
        resultMessage = `Your score is ${score}. You can try watching Potter series !!!`;
      }
      return resultMessage;
    },
  },
};
