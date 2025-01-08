<template>
  <div class="cashier">
    <h1>This is a cashier page</h1>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: "CashierView",
  data() {
    return {
      customerCode: "",
      cart: [],
      total: "",
    };
  },
};
</script>
