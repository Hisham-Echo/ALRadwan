<!-- import AddProduct from '@/components/AddProduct.vue'; -->
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
  background-color: rgb(255, 60, 60);
}
</style>

<script>
export default {
  name: "EditProduct",
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
      // TODO: validate form inputs
      this.Inventory.push(this.formValues);
      localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
      this.resetForm();
      // this.$emit("add");
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
  // props: [this.Inventory],
  mounted() {
    this.Inventory = JSON.parse(localStorage.getItem("Inventory"));
  },
};
</script>
