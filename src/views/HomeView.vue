<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Al-Radwan" />
    <button class="load" @click.prevent="triggerFileInput">Load Data</button>
    <input
      type="file"
      ref="fileInput"
      @change="loadLocalStorageFromFile"
      accept=".json"
      style="display: none"
    />
  </div>
</template>

<style lang="scss" scoped>
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
  color: white;
  background-color: #1423aa;
  &:hover {
    opacity: 1;
  }
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
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
  },
};
</script>
