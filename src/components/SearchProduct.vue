<!-- import AddProduct from '@/components/SearchProduct.vue'; -->
<template>
  <div class="SearchProduct">
    <form>
      <div class="input">
        <h2>Search Products</h2>
        <div class="field">
          <!-- <label for="search">Search</label> -->
          <input
            type="search"
            name="search"
            id="search"
            v-model="this.search"
          />
        </div>
      </div>
      <!-- <div class="list">
        <header>
          <span>Name</span>
          <span>Price Per Pack</span>
          <span>Price Per Unit</span>
        </header>
        <div
          class="item"
          @click.prevent="toggleActive"
          v-for="(item, index) in Inventory"
          :key="index"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.pricePerPack }}</span>
          <span>{{ item.pricePerUnit }}</span>
        </div>
      </div> -->
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price per pack</th>
            <th>Price per unit</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="(item, index) in this.Inventory" :key="index">
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.pricePerPack }}</td>
            <td>{{ item.pricePerUnit }}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <div>
        <button @click.prevent="searchProduct" class="search">SEARCH</button>
        <button class="cancel" @click.prevent="closeComponent">CLOSE</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  border-radius: 0 10px 10px 0;
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 0 10px 10px 0;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.SearchProduct {
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
  max-width: 100vw;
  height: 50vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  // align-items: center;
}

input {
  display: flex;
  padding: 5px;
  border: none;
  border-radius: 10px;
  width: 100%;
}

.input h2 {
  border-radius: 10px 10px 0 0;
  background-color: #e2f817;
  margin: 0;
  padding: 15px;
}

.field {
  // width: 100%;
  padding: 10px;
  // display: inline-block;
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

.search {
  background-color: #e2f817;
  // color: white;
  font-weight: bold;
}

.cancel {
  color: white;
  font-weight: bold;
  background-color: rgb(255, 60, 60);
}
.active {
  background-color: #e2f817dd;
}
table {
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  height: 60%;
  overflow-y: scroll;
  header,
  .item {
    // display: flex;
    // flex-flow: row nowrap;
    // justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    border: 1px solid transparent;
    border-bottom-color: #000000;
  }
  .item {
    border-bottom-color: #00000033;
    margin: 2px;
    cursor: pointer;
    transition: background-color ease-in-out 0.2s;
    &:hover {
      background-color: #e2f81755;
    }
    &.active {
      background-color: #e2f817dd;
    }
  }
}
</style>

<script>
export default {
  name: "SearchProduct",
  data() {
    return {
      Inventory: [],
      searchField: "",
      found: [],
    };
  },
  methods: {
    toggleActive: function (event) {
      if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
      } else {
        event.target.classList.add("active");
      }
      // console.log(event.target);
    },
    searchProduct: function () {
      this.search;
    },
    closeComponent: function () {
      this.$emit("close"); // Emit a 'close' event to the parent
    },
    resetForm: function () {
      this.search = "";
    },
  },
  computed: {
    searchItem: function () {
      return "";
    },
  },
  // props: [this.Inventory],
  mounted() {
    const savedInventory = JSON.parse(localStorage.getItem("Inventory"));
    this.Inventory = savedInventory ? savedInventory : []; // Initialize as an empty array if null
  },
};
</script>
