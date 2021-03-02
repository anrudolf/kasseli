<template>
  <select
    class="border rounded"
    :value="modelValue"
    @input="(ev) => $emit('update:modelValue', ev.target.value)"
  >
    <option
      v-for="item in items"
      :key="item.value || item"
      :value="item.value || item"
    >
      {{ item.text || item }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["modelValue", "items"],
};
</script>

<style scoped>
select {
  /* styling */
  background-color: white;
  display: inline-block;
  font: inherit;
  line-height: 1.5rem;
  padding: 0.5rem 3rem 0.5rem 1rem;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select {
  /*
    Note: stroke="gray" works, however stroke="#A3A3A3" does not...
    This is because # inside the data url needs to be escaped as %23
    => stroke="%23A3A3A3" works for #A3A3A3
  */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23A3A3A3"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>');
  background-position: calc(100% - 0.25rem) calc(50%);
  background-size: 1.25rem;
  background-repeat: no-repeat;
}

select:focus {
  outline-color: #3b82f680;
}
</style>