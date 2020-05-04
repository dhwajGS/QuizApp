export default {
  methods: {
    handleResultMessage: (score) => {
      let resultMessage = "";
      if (score >= 70) {
        resultMessage = "Congrats Potter Head !!!";
      } else if (score >= 40) {
        resultMessage = "You can do better !!!";
      } else {
        resultMessage = "Try watching Potter series !!!";
      }
      return resultMessage;
    },
  },
};
