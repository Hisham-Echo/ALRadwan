import AddProduct from '@/components/AddProduct.vue';
<template>
  <div class="AddProduct">
    <form>
      <div class="input">
        <h2>Add Products</h2>
        <div class="field">
          <label for="code">Code</label>
          <input type="text" name="code" id="code" v-model="formValues.code" />
        </div>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" v-model="formValues.name" />
        </div>
        <div class="field">
          <label for="name">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            v-model="formValues.category"
          />
        </div>
        <div class="field">
          <label for="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            v-model="formValues.quantity"
          />
        </div>
        <div class="field">
          <label for="ppp">Price per pack</label>
          <input
            type="text"
            name="ppp"
            id="ppp"
            v-model="formValues.pricePerPack"
          />
        </div>
        <div class="field">
          <label for="ppu">Price per unit</label>
          <input
            type="text"
            name="ppu"
            id="ppu"
            v-model="formValues.pricePerUnit"
          />
        </div>
        <div class="field">
          <label for="vendor">Vendor</label>
          <input
            type="text"
            name="vendor"
            id="vendor"
            v-model="formValues.vendor"
          />
        </div>
        <!-- <div class="errors">{{ validate }}</div> -->
      </div>
      <button @click.prevent="addProduct" class="add">ADD</button>
      <button class="cancel" @click.prevent="closeComponent">CLOSE</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.AddProduct {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #00000077;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-content: center;
  align-content: center;
}

form {
  border-radius: 10px;
  background-color: #80ccff;
  min-width: 450px;
  max-width: 50vw;
  display: flex;
  flex-flow: row wrap;
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
  background-color: #43fda9;
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

.add {
  background-color: #1e9f4c;
  color: white;
  font-weight: bold;
}

.cancel {
  color: white;
  font-weight: bold;
  background-color: #ff3c3c;
}

.errors {
  background-color: #ff000022;
  margin: 0 50px;
  color: #f30;
  padding: 10px 0;
}
</style>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      Inventory: [],
      formValues: {
        code: "",
        name: "",
        category: "",
        quantity: "",
        pricePerPack: "",
        pricePerUnit: "",
        vendor: "",
      },
    };
  },
  methods: {
    addProduct: function () {
      this.Inventory.push({ ...this.formValues });
      this.$emit("update-inventory", this.Inventory); // Emit a 'update-inventory' event to the parent
      localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
      this.exportData(); // Save the inventory to a local file
      this.resetForm();
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
      a.download = "localStorage.json"; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    },
    // Load data into localStorage from a file
    async importData(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);

          // Populate localStorage with the data
          Object.keys(data).forEach((key) => {
            localStorage.setItem(key, data[key]);
          });

          // Reload inventory data from localStorage if necessary
          this.Inventory = JSON.parse(localStorage.getItem("Inventory")) || [];
          alert("Data successfully loaded into localStorage!");
        } catch (error) {
          alert("Invalid file format. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    },
    closeComponent: function () {
      this.$emit("close"); // Emit a 'close' event to the parent
    },
    resetForm: function () {
      this.formValues = {
        code: "",
        name: "",
        category: "",
        quantity: "",
        pricePerPack: "",
        pricePerUnit: "",
        vendor: "",
      };
    },
  },
  mounted() {
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : []; // Initialize as an empty array if null
  },
};
</script>
