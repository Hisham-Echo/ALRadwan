<!-- <template>
  <div class="pay overlay"></div>
</template> -->

<!-- <style scoped></style> -->
<!-- 
<script>
export default {
  name: "PayCom",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script> -->
<template>
  <div class="delAccount overlay">
    <form>
      <div class="input">
        <h2>Process Payment</h2>
        <div class="field">
          <label for="code">Code</label>
          <input type="text" name="code" id="code" v-model="formValues.code" />
        </div>
        <div class="field">
          <label for="amount">Amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            v-model="formValues.amount"
          />
        </div>
      </div>
      <div>
        <button @click.prevent="pay" class="pay">PAY</button>
        <button class="cancel" @click.prevent="closeComponent">CLOSE</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
form {
  border-radius: 10px;
  background-color: #80ccff;
  min-width: 450px;
  max-width: 50vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  // align-items: center;
}

input {
  display: flex;
  padding: 5px;
  border: none;
  border-radius: 10px;
}

.input h2 {
  border-radius: 10px 10px 0 0;
  background-color: #1423aa;
  color: white;
  margin: 0;
  padding: 15px;
}

.field {
  padding: 10px;
  display: inline-block;
}

.field label {
  line-height: 1.7;
}

button {
  align-self: flex-end;
  padding: 10px;
  margin: 20px;
  border: 1px solid #00000066;
  border-radius: 5px;
  justify-self: space-evenly;
}

.pay {
  background-color: #1423aa;
  color: white;
  font-weight: bold;
}

.cancel {
  color: #ff3c3c;
  font-weight: bold;
  background-color: white;
}
</style>

<script>
export default {
  name: "DeleteAccount",
  data() {
    return {
      Accounts: [],
      Inventory: [],
      formValues: {
        code: "",
        amount: "",
      },
    };
  },
  methods: {
    pay: function () {},
    closeComponent: function () {
      this.$emit("close"); // Emit a 'close' event to the parent
    },
    resetForm: function () {
      this.formValues = {
        code: "",
        amount: "",
      };
    },
  },
  mounted() {
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : []; // Initialize empty array if null
    const savedAccounts = JSON.parse(localStorage.getItem("Accounts"));
    this.Accounts = savedAccounts ? savedAccounts : []; // Initialize empty array if null
  },
};
</script>
