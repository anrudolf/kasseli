<template>
  <div class="p-4 max-w-lg">
    <h1 class="text-2xl">Neues Produkt erfassen</h1>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input class="input" v-model="product.id" placeholder="Produkt ID" />
    </label>

    <div v-if="exists" class="p-2 my-1 rounded bg-blue-100 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="ml-2">Produkt existiert bereits</span>
      <router-link
        :to="`/products/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="product.data.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        type="number"
        class="input"
        v-model.number="product.data.price"
        placeholder="2.90"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.data.noBarcode"
      />
      <span class="ml-2 text-gray-700">Produkt hat kein Strichcode</span>
    </label>

    <label class="flex items-center" v-if="templateEnabled">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.data.template"
      />
      <span class="ml-2 text-gray-700">Preis aus Strichcode berechnen</span>
    </label>

    <app-button class="mt-4" @click="save" :disabled="saveDisabled || exists"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div>{{ product }}</div>
    <div>{{ exists }}</div>
  </div>
</template>

<script>
import { toRef } from "vue";
import appButton from "../components/Button.vue";

import useProductEdit from "../hooks/use-productEdit";

export default {
  components: {
    appButton,
  },
  props: ["newId"],
  setup(props) {
    const {
      id,
      product,
      exists,
      save,
      saveDisabled,
      templateEnabled,
    } = useProductEdit();

    if (props.newId) {
      product.id = `${props.newId}`;
    }

    return { id, product, exists, save, saveDisabled, templateEnabled };
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 12px;
  font-size: 1.125rem;
}
</style>