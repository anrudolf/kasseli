<template>
  <div class="p-4">
    <h1 class="text-2xl">Neues Produkt</h1>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.id"
        placeholder="Produkt ID"
      />
    </label>

    <div v-if="exists">
      Produkt existiert bereits,
      <router-link :to="`/products/edit?id=${id}`">jetzt editieren</router-link>
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.data.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        type="number"
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
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

    <app-button class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div>{{ product }}</div>
    <div>{{ exists }}</div>
  </div>
</template>

<script>
import appButton from "../components/Button.vue";

import useProductEdit from "../hooks/use-productEdit";

export default {
  components: {
    appButton,
  },
  setup() {
    const {
      id,
      product,
      exists,
      save,
      saveDisabled,
      templateEnabled,
    } = useProductEdit();

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