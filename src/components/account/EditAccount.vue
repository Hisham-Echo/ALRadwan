<template>
  <div class="EditAccount overlay">
    <form>
      <div class="input">
        <h2>Edit Accounts</h2>
        <div class="field">
          <label for="code">Code</label>
          <input type="text" name="code" id="code" v-model="formValues.code" />
        </div>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" v-model="formValues.name" />
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            v-model="formValues.phone"
          />
        </div>
        <div class="field">
          <label for="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            v-model="formValues.address"
          />
        </div>
        <div class="field">
          <label for="due">Due</label>
          <input type="text" name="due" id="due" v-model="formValues.due" />
        </div>
      </div>
      <button @click.prevent="editAccount" class="edit">EDIT</button>
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
  name: "EditAccount",
  data() {
    return {
      Accounts: [],
      Inventory: [],
      formValues: {
        code: "",
        name: "",
        phone: "",
        address: "",
        due: "",
      },
    };
  },
  methods: {
    editAccount: function () {
      // TODO: validate form inputs
      // this.$emit("update-inventory", this.Inventory); // Emit a 'update-inventory' event to the parent
      // localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
      // this.$emit("export-data", this.Inventory);
      // this.resetForm();
    },
    closeComponent: function () {
      this.$emit("close"); // Emit a 'close' event to the parent
    },
    resetForm: function () {
      this.formValues = {
        code: "",
        name: "",
        phone: "",
        address: "",
        due: "",
      };
    },
  },
  // props: [this.Inventory],
  mounted() {
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : []; // Initialize as an empty array if null
    const savedAccounts = JSON.parse(localStorage.getItem("Accounts"));
    this.Accounts = savedAccounts ? savedAccounts : []; // Initialize empty array if null
  },
};
</script>
