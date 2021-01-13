<template>
  <div>
    <ul class="wrapper">
      <li>Banane</li>
      <li>Tomate</li>
      <li>Banane</li>
      <li>Tomate</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "KasseListe"
});
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
}
li:nth-child(odd) {
  color: #777;
  background: #eee;
}
li:nth-child(even) {
  color: #777;
  background: #fff;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
}
</style>


