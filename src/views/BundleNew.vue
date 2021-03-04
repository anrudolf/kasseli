<template>
  <div class="p-4 max-w-lg">
    <h1 class="text-2xl">Neues Bundle erstellen</h1>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input class="input" v-model="bundle.id" placeholder="Bundle ID" />
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
      <span class="ml-2">Bundle existiert bereits</span>
      <router-link
        :to="`/bundle/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="bundle.data.label.de"
        placeholder="Bundle Name"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="bundle.data.hidden"
      />
      <span class="ml-2 text-gray-700">Verbergen</span>
    </label>

    <app-button class="mt-4" @click="save" :disabled="saveDisabled || exists"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div>{{ bundle }}</div>
    <div>{{ exists }}</div>
  </div>
</template>

<script>
import appButton from "../components/Button.vue";

import useBundleEdit from "../hooks/use-bundleEdit";

export default {
  components: {
    appButton,
  },
  props: ["newId"],
  setup(props) {
    const { id, bundle, exists, save, saveDisabled } = useBundleEdit();

    if (props.newId) {
      bundle.id = `${props.newId}`;
    }

    return { id, bundle, exists, save, saveDisabled };
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