<template>
  <div>
    <form>
      <input type="text" name="name" id="name" />
      <select name="status" id="status">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ref(["Dead", "Alive", "unknown"]);
</script>

<style lang="css" scoped>

</style>
