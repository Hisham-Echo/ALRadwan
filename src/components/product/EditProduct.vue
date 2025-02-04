<template>
  <div class="EditProduct overlay">
    <form>
      <div class="input">
        <h2>Edit Product</h2>
        <div class="field">
          <label for="code">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            v-model="formValues.code"
            readonly
          />
        </div>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" v-model="formValues.name" />
        </div>
        <div class="field">
          <label for="category">Category</label>
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
          <label for="ppp">Price per Pack</label>
          <input
            type="text"
            name="ppp"
            id="ppp"
            v-model="formValues.pricePerPack"
          />
        </div>
        <div class="field">
          <label for="ppu">Price per Unit</label>
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
      </div>
      <button @click.prevent="editProduct" class="edit">SAVE</button>
      <button class="cancel" @click.prevent="closeComponent">CLOSE</button>
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
  background-color: #0077d8;
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

.edit {
  background-color: #0077d8;
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
  name: "EditProduct",
  props: {
    selectedProduct: {
      type: Object,
      required: true,
    },
  },
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
    editProduct() {
      // Validate form inputs
      if (
        !this.formValues.code ||
        !this.formValues.name ||
        !this.formValues.category ||
        !this.formValues.quantity ||
        !this.formValues.pricePerPack ||
        !this.formValues.pricePerUnit ||
        !this.formValues.vendor
      ) {
        alert("Code, Name, and Quantity are required fields.");
        return;
      }

      // Find and update the product in the inventory
      const index = this.Inventory.findIndex(
        (product) => product.code === this.formValues.code
      );

      const check = confirm("Confirm editing the product");

      if (index > -1 && check) {
        this.Inventory[index] = { ...this.formValues };
        localStorage.setItem("Inventory", JSON.stringify(this.Inventory));

        // Emit the updated inventory to the parent component
        this.$emit("update-inventory", this.Inventory);
        this.$emit("export-data", this.Inventory);
        this.closeComponent();
      } else {
        alert("Product not found.\nOperation canceled");
      }
    },
    closeComponent() {
      this.$emit("close"); // Notify the parent to close the component
    },
    resetForm() {
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
    // Load the inventory from local storage
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : [];

    // Pre-fill the form with the selected product data
    if (this.selectedProduct) {
      this.formValues = { ...this.selectedProduct };
    }
  },
};
</script>
