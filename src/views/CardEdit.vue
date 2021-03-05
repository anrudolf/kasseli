<template>
  <div class="p-4 max-w-lg">
    <app-modal :visible="deleteModal" @close="deleteModal = false">
      <template v-slot:title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Karte ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ card.id }}</div>
          <input
            class="input"
            placeholder="Karte ID"
            v-model="deleteModalConfirmation"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="card.id !== deleteModalConfirmation"
            class="disabled:opacity-50 bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            @click="remove"
          >
            Löschen
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            @click="
              deleteModalConfirmation = '';
              deleteModal = false;
            "
          >
            Abbrechen
          </button>
        </div>
      </div>
    </app-modal>

    <div class="flex justify-between">
      <h1 class="text-2xl">Karte editieren</h1>
      <button @click="deleteModal = true" class="text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input
        class="input disabled"
        v-model="card.id"
        placeholder="Karte ID"
        disabled
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="card.data.label.de"
        placeholder="Karte Name"
      />
    </label>

    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox" v-model="card.data.hidden" />
      <span class="ml-2 text-gray-700">Verbergen</span>
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
      <a :href="card.data.image" v-if="card.data.image" target="_blank">
        <img
          class="object-contain h-32 w-full mb-1 border rounded"
          :src="card.data.image"
          crossorigin="anonymous"
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

    <app-button class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div class="text-xs">
      <pre>{{ JSON.stringify(card, null, "  ") }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, toRef, defineComponent } from "vue";
import appButton from "../components/Button.vue";
import appModal from "../components/Modal.vue";

import useCardEdit from "../hooks/use-cardEdit.js";

export default defineComponent({
  props: ["editId"],
  components: {
    appButton,
    appModal,
  },
  setup(props) {
    const editId = toRef(props, "editId");
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const {
      id,
      card,
      exists,
      remove,
      save,
      saveDisabled,
      uploadImage,
    } = useCardEdit(editId.value);

    return {
      // modal
      deleteModal,
      deleteModalConfirmation,
      // card edit
      id,
      card,
      exists,
      remove,
      save,
      saveDisabled,
      uploadImage,
    };
  },
});
</script>

<style scoped>
label {
  display: block;
  margin-top: 12px;
  font-size: 1.125rem;
}

input.disabled {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="grey"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>');
  background-position: calc(100% - 0.4rem) calc(50%);
  background-size: 1.25rem;
  background-repeat: no-repeat;
}
</style>