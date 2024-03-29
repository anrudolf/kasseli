<template>
  <div class="p-4 max-w-lg">
    <app-modal :visible="deleteModal" @close="deleteModal = false">
      <template v-slot:title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Produkt ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ product.id }}</div>
          <input
            class="input"
            placeholder="Produkt ID"
            v-model="deleteModalConfirmation"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="product.id !== deleteModalConfirmation"
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
      <h1 v-if="editing">Produkt editieren</h1>
      <h1 v-else>Produkt erstellen</h1>
      <app-button-delete v-if="editing" @click="deleteModal = true" />
    </div>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input
        class="input"
        :class="{ disabled: idDisabled }"
        :value="product.id"
        @input="(ev) => (product.id = ev.target.value)"
        placeholder="Produkt ID"
        :disabled="idDisabled"
      />
    </label>

    <div
      v-if="!editing && exists"
      class="p-2 my-1 rounded bg-blue-100 flex items-center"
    >
      <app-icon icon="info" color="gray" />
      <span class="ml-2">Produkt existiert bereits</span>
      <router-link
        :to="`/products/edit?id=${product.id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="product.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        :type="product.template ? 'text' : 'number'"
        step="any"
        class="input"
        :class="{ disabled: product.template }"
        :value="product.template ? '' : product.price"
        @input="(ev) => (product.price = toNumber(ev.target.value))"
        :placeholder="product.template ? '(von Strichcode)' : '2.90'"
        :disabled="product.template"
      />
    </label>

    <label class="flex items-center" v-if="templateEnabled && !editing">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.template"
        :disabled="editing"
      />
      <span class="ml-2 text-gray-700">Preis aus Strichcode berechnen</span>
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
    </label>
    <app-image-selector v-model="product.imageRef" />

    <app-button-confirm class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button-confirm
    >
    <div class="text-xs">
      <pre>{{ JSON.stringify(product, null, "  ") }}</pre>
    </div>
    <div v-if="false">editing {{ editing }}</div>
  </div>
</template>

<script>
import { ref, toRef, defineComponent } from "vue";

import appButtonDelete from "@/components/ButtonDelete.vue";
import appButtonConfirm from "../components/ButtonConfirm.vue";
import appModal from "../components/Modal.vue";
import appImageSelector from "../components/ImageSelector.vue";
import appIcon from "@/components/Icon.vue";

import useProductEdit from "../hooks/use-productEdit.js";

import utils from "@/utils";

export default defineComponent({
  props: ["editId", "newId", "editing"],
  components: {
    appButtonDelete,
    appButtonConfirm,
    appModal,
    appImageSelector,
    appIcon,
  },
  setup(props) {
    const editId = toRef(props, "editId");
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const options = { editing: props.editing, initialId: editId.value };

    const {
      entity: product,
      exists,
      remove,
      save,
      saveDisabled,
      idDisabled,
      templateEnabled,
      uploadImage,
    } = useProductEdit(options);

    if (props.newId) {
      product.id = `${props.newId}`;
    }

    return {
      // modal
      deleteModal,
      deleteModalConfirmation,
      // product edit
      product,
      exists,
      remove,
      save,
      saveDisabled,
      idDisabled,
      templateEnabled,
      uploadImage,
      // utils
      toNumber: utils.toNumber,
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

/*
input:-moz-focusring {
  
}
*/
</style>