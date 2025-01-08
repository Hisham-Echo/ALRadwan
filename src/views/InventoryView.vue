<template>
  <div class="inventory">
    <h1>INVENTORY</h1>
    <div class="functions">
      <button class="add" @click.prevent="toggleChildComponent">
        Add Product
      </button>
      <button class="edit" @click.prevent="toggleChildComponent">
        Edit Product
      </button>
      <button class="search" @click.prevent="toggleChildComponent">
        Search Product
      </button>

      <button class="load" @click.prevent="triggerFileInput">Load Data</button>
      <input
        type="file"
        ref="fileInput"
        @change="loadLocalStorageFromFile"
        accept=".json"
        style="display: none"
      />

      <button class="del" @click.prevent="toggleChildComponent">
        Delete Product
      </button>
    </div>
    <!-- Forms -->
    <AddProduct
      :Inventory="Inventory"
      v-if="isAddProductVisible"
      @update-inventory="updateInventory"
      @export-data="exportData"
      @close="toggleChildComponent"
    />
    <EditProduct
      :Inventory="Inventory"
      v-if="isEditProductVisible"
      @update-inventory="updateInventory"
      @export-data="exportData"
      @close="toggleChildComponent"
    />
    <SearchProduct
      :Inventory="Inventory"
      v-if="isSearchProductVisible"
      @close="toggleChildComponent"
    />
    <DeleteProduct
      :Inventory="Inventory"
      v-if="isDeleteProductVisible"
      @update-inventory="updateInventory"
      @export-data="exportData"
      @close="toggleChildComponent"
    />
    <!-- start display -->
    <div class="display">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price per pack</th>
            <th>Price per unit</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.Inventory" :key="index">
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.pricePerPack }}</td>
            <td>{{ item.pricePerUnit }}</td>
            <td>{{ item.vendor }}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
    <!-- end display -->
  </div>
</template>

<style lang="scss" scoped>
.form {
  padding: 10px;
}

button {
  font-weight: bold;
  padding: 10px;
  border: none;
  margin: 0 5px;
  width: 150px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
  border-radius: 5px;

  &:hover {
    opacity: 1;
  }

  &:first-of-type {
    background-color: #43fda9;
  }

  &:nth-of-type(2) {
    background-color: #29a8fc;
  }

  &:nth-of-type(3) {
    background-color: #e2f817;
  }

  &:nth-of-type(4) {
    background-color: #25e6e6;
  }

  &:last-of-type {
    background-color: #fd5656;
  }
}

header {
  font-weight: bold;
  text-transform: capitalize;
}

.display,
header {
  width: 100%;
}

table {
  width: 100%;
  border: 1px solid red;
  padding: 10px;
  border: none;
}

th {
  background-color: #17f893;
}

td {
  background-color: #17f89322;
}

td,
th {
  border: 1px solid transparent;
  padding: 10px 5px;
}

tr:hover td {
  background-color: #17f89355;
  transition: background-color 0.2s ease-in-out;
}
</style>

<script>
// @ is an alias to /src
import AddProduct from "@/components/AddProduct.vue";
import EditProduct from "@/components/EditProduct.vue";
import SearchProduct from "@/components/SearchProduct.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";

export default {
  name: "InventoryView",
  data() {
    return {
      isAddProductVisible: false,
      isEditProductVisible: false,
      isSearchProductVisible: false,
      isDeleteProductVisible: false,
      Inventory: [],
    };
  },
  components: {
    AddProduct,
    EditProduct,
    SearchProduct,
    DeleteProduct,
  },
  methods: {
    toggleChildComponent: function (event) {
      if (event == undefined) {
        // close opened component
        this.isAddProductVisible = false;
        this.isEditProductVisible = false;
        this.isSearchProductVisible = false;
        this.isDeleteProductVisible = false;
      } else if (event.target.classList.contains("add")) {
        this.isAddProductVisible = !this.isAddProductVisible; // Toggle add visibility
      } else if (event.target.classList.contains("edit")) {
        this.isEditProductVisible = !this.isEditProductVisible; // Toggle edit visibility
      } else if (event.target.classList.contains("search")) {
        this.isSearchProductVisible = !this.isSearchProductVisible; // Toggle search visibility
      } else if (event.target.classList.contains("del")) {
        this.isDeleteProductVisible = !this.isDeleteProductVisible; // Toggle delete visibility
      }
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
    // Trigger the hidden file input for uploading data
    triggerFileInput() {
      this.$refs.fileInput.click(); // Opens the file input dialog
    },
    // Load data into localStorage from a file
    async loadLocalStorageFromFile(event) {
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
      // Reset the input value to allow re-uploading the same file
      event.target.value = "";
    },
    updateInventory(newInventory) {
      this.Inventory = newInventory;
      localStorage.setItem("Inventory", JSON.stringify(this.Inventory));
    },
  },
  computed: {
    calcTotal: function (quantity, price) {
      return quantity * price;
    },
  },
  // props: ["Inventory"],
  // watch: [this.Inventory],
  mounted() {
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : []; // Initialize empty array if null
  },
};
</script>
