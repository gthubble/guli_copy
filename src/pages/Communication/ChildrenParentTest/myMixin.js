export default {
  mounted() {
    console.log(111);
  },

  methods: {
    giveMoney(money) {
      this.money -= money;
      // this.$parent可以拿到父组件对象，操作父组件对象的数据
      this.$parent.money += money;
    },
  },
};
