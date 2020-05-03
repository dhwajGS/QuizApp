export default {
  methods: {
    clearSelection() {
      let ids = document.querySelectorAll("[id]");
      Array.prototype.forEach.call(ids, function(el, i) {
        if (i) document.getElementById(el.id).checked = false;
      });
    },
  },
};
