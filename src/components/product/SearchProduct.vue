<template>
  <div class="SearchProduct overlay">
    <form>
      <div class="input">
        <h2>Search Products</h2>
        <div class="field">
          <!-- <label for="search">Search</label> -->
          <input
            type="search"
            name="search"
            id="search"
            v-model="this.searchField"
          />
        </div>
      </div>
      <div class="display">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              @click.prevent="toggleActive"
              v-for="(item, index) in this.Inventory"
              :key="index"
              :id="item.code"
            >
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div>
        <button @click.prevent="searchProduct" class="search">SELECT</button>
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
  color: #ff3c3c;
  font-weight: bold;
  background-color: white;
}
.active {
  background-color: #e2f817dd;
}
// table
.display {
  width: calc(100% - 20px);
  overflow-y: scroll;
  padding: 0 0 0 10px;
}

table {
  width: 100%;
  border: 1px solid red;
  border: none;
  border-radius: 10px;
  height: 60%;
  overflow-y: scroll;
}

th {
  background-color: #17f893;
}

td {
  background-color: transparent;
}

td,
th {
  border: 1px solid transparent;
  padding: 10px 5px;
}

tr {
  background-color: white;
}

tr:hover {
  cursor: pointer;
  background-color: #a9f817aa;
  transition: background-color 0.2s ease-in-out;
  &.active {
    background-color: #e2f817dd;
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
      selected: [],
    };
  },
  methods: {
    toggleActive: function (event) {
      let parent = event.target.parentElement;
      console.log(parent);
      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
      } else {
        parent.classList.add("active");
      }
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
