<template>
  <div class="cashier">
    <h1>CASHIER</h1>
    <form>
      <div class="display">
        <header>
          <label for="c_code">Customer Code : </label>
          <input type="text" name="c_code" id="c_code" v-model="customerCode" />
          <div class="customer">name</div>
        </header>
        <!-- cart -->
        <main>
          <div class="cart"></div>
        </main>
        <!-- total - sell - payment method[cash or 2agel] - gomla or 2ta3y -->
        <footer></footer>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#c_code {
  width: 50px;
}
</style>

<script>
export default {
  name: "CashierView",
  data() {
    return {
      Accounts: [],
      Inventory: [],
      // default customer code
      customerCode: "0",
      cart: [],
      total: "",
    };
  },
  methods: {
    addToCart: function () {},
    updateInventory(newInventory) {
      this.Inventory = newInventory;
      localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
    },
    updateAccounts(newAccounts) {
      this.Accounts = newAccounts;
      localStorage.setItem("Accounts", JSON.stringify(this.Accounts));
    },
    // Save localStorage to a file
    exportData() {
      const localStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
      }

      const blob = new Blob([JSON.stringify(localStorageData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      const date = new Date();
      a.download = `DATA@${date.toISOString()}.json`; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
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
