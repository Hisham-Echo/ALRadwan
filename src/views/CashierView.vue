<template>
  <div class="cashier">
    <h1>CASHIER</h1>
    <form>
      <div class="display">
        <header>
          <label for="c_code">Customer Code : </label>
          <input type="text" name="c_code" id="c_code" v-model="customerCode" />
          <div class="customer">{{ getCustomerName() }}</div>
          <div>
            <label for="p_code">Product Code : </label>
            <input
              type="text"
              name="p_code"
              id="p_code"
              v-model="productCode"
            />
            <button @click.prevent="addToCart">Add to Cart</button>
          </div>
        </header>

        <!-- Cart -->
        <main>
          <div class="cart">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price per pack</th>
                  <th>Price per unit</th>
                  <th>Total</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                  <td>{{ item.code }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.category }}</td>
                  <td>
                    <input
                      type="number"
                      v-model="item.q"
                      :min="1"
                      :max="item.quantity"
                    />
                  </td>
                  <td>{{ item.pricePerPack }}</td>
                  <td>{{ item.pricePerUnit }}</td>
                  <td>{{ (item.q * item.pricePerPack).toFixed(2) }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6">Total</td>
                  <td colspan="2">${{ calcTotalPrice.toFixed(2) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </main>

        <!-- Total and Payment -->
        <footer>
          <div class="total-section">
            <p>Total: ${{ calcTotalPrice.toFixed(2) }}</p>
            <label for="payment-method">Payment Method: </label>
            <select v-model="paymentMethod" id="payment-method">
              <option value="cash">Cash</option>
              <option value="2agel">2agel</option>
            </select>
            <br />
            <br />
            <div v-if="paymentMethod === 'cash'">
              <label for="amount-paid">Amount Paid: </label>
              <input
                type="number"
                v-model="amountPaid"
                placeholder="Enter amount"
              />
              <h4 v-if="amountPaid > 0">
                Change: ${{ (amountPaid - calcTotalPrice).toFixed(2) }}
              </h4>
            </div>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CashierView",
  data() {
    return {
      Accounts: [],
      Inventory: [],
      //
      customerCode: "0",
      customerName: "",
      productCode: "",
      //
      cart: [],
      totalPrice: 0,
      paymentMethod: "cash",
      amountPaid: 0,
    };
  },
  computed: {
    // Calculate the total price of the cart
    calcTotalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.pricePerPack * item.q;
      }, 0);
    },
  },
  methods: {
    addToCart() {
      if (!this.productCode) {
        alert("Please enter product code");
        return;
      }

      const product = this.Inventory.find(
        (item) => item.code === this.productCode
      );

      if (!product) {
        alert("Product not found in inventory");
        return;
      }

      const existingItem = this.cart.find((item) => item.code === product.code);

      if (existingItem) {
        // If item already in cart, just update quantity
        if (existingItem.q < existingItem.quantity) {
          existingItem.q++;
        } else {
          alert("Not enough stock");
        }
      } else {
        // Add new item to cart
        const newItem = { ...product, q: 1 }; // Initialize quantity to 1
        this.cart.push(newItem);
      }

      this.productCode = ""; // Reset product code input
    },

    getCustomerName() {
      const customer = this.Accounts.find(
        (account) => account.code === this.customerCode
      );
      return customer ? customer.name : "Customer not found";
    },

    updateInventory(newInventory) {
      this.Inventory = newInventory;
      localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
    },

    updateAccounts(newAccounts) {
      this.Accounts = newAccounts;
      localStorage.setItem("Accounts", JSON.stringify(this.Accounts));
    },

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
    this.Inventory = savedInventory ? savedInventory : [];
    const savedAccounts = JSON.parse(localStorage.getItem("Accounts"));
    this.Accounts = savedAccounts ? savedAccounts : [];
  },
};
</script>

<style lang="scss" scoped>
#c_code {
  width: 100px;
}

.customer {
  background-color: #17f89322;
  margin: 10px 15px 0;
  padding: 10px;
  font-weight: bold;
}

table {
  width: 100%;
  border: 1px solid red;
  padding: 10px;
  border: none;
  max-height: 65vh;
  overflow-x: auto;
}

th,
tfoot {
  background-color: #17f893;
  &:nth-of-type(1) {
    width: 12%;
  }
  &:nth-of-type(2) {
    width: 22%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4),
  &:nth-of-type(5),
  &:nth-of-type(6),
  &:nth-of-type(7),
  &:nth-of-type(8) {
    width: 8%;
  }
}

td {
  background-color: #17f89322;
  input {
    width: 50%;
    padding: 5px;
    border: none;
    outline: none;
  }
}

td,
th {
  border: 1px solid transparent;
  padding: 10px 5px;
}

footer {
  margin-top: 20px;
}

.total-section {
  padding: 10px;
  background-color: #17f893;
  border-radius: 5px;
}
</style>
