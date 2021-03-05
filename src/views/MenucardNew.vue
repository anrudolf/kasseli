<template>
  <div class="p-4 max-w-lg">
    <h1 class="text-2xl">Neue Menukarte erstellen</h1>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input class="input" v-model="menucard.id" placeholder="Menukarte ID" />
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
      <span class="ml-2">Menukarte existiert bereits</span>
      <router-link
        :to="`/menucards/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="menucard.data.label.de"
        placeholder="Menukarte Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
      <a :href="menucard.data.image" v-if="menucard.data.image" target="_blank">
        <img
          class="object-contain h-32 w-full mb-1 border rounded"
          :src="menucard.data.image"
        />
      </a>
      <input
        type="file"
        class="input"
        accept="image/*"
        capture="environment"
        @input="(ev) => uploadImage(ev.target.files[0])"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="menucard.data.hidden"
      />
      <span class="ml-2 text-gray-700">Verbergen</span>
    </label>

    <app-button class="mt-4" @click="save" :disabled="saveDisabled || exists"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div>{{ menucard }}</div>
    <div>{{ exists }}</div>
  </div>
</template>

<script>
import appButton from "../components/Button.vue";

import useMenucardEdit from "../hooks/use-menucardEdit";

export default {
  components: {
    appButton,
  },
  props: ["newId"],
  setup(props) {
    const {
      id,
      menucard,
      exists,
      save,
      saveDisabled,
      uploadImage,
    } = useMenucardEdit();

    if (props.newId) {
      menucard.id = `${props.newId}`;
    }

    return { id, menucard, exists, save, saveDisabled, uploadImage };
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