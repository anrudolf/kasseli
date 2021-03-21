<template>
  <div class="p-4 max-w-lg">
    <app-modal :visible="deleteModal" @close="deleteModal = false">
      <template v-slot:title>Wirklich löschen?</template>
      <div>
        <div>
          Zum Bestätigen bitte Widget Group ID eintippen und löschen klicken
        </div>
        <label class="block">
          <div class="text-gray-700">{{ entity.id }}</div>
          <input
            class="input"
            placeholder="Widget Group ID"
            v-model="deleteModalConfirmation"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="entity.id !== deleteModalConfirmation"
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

    <app-modal :visible="addModal" @close="addModal = false">
      <template v-slot:title>Produkt auswählen</template>
      <app-product-selector @selected="addProduct" />
    </app-modal>

    <div class="flex justify-between">
      <h1 v-if="editing">Widget Group editieren</h1>
      <h1 v-else>Widget Group erstellen</h1>
      <app-button-delete v-if="editing" @click="deleteModal = true" />
    </div>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input
        class="input"
        :class="{ disabled: editing }"
        v-model="entity.id"
        placeholder="Widget Group ID"
        :disabled="editing"
      />
    </label>

    <div
      v-if="!editing && exists"
      class="p-2 my-1 rounded bg-blue-100 flex items-center"
    >
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
      <span class="ml-2">Widget Group existiert bereits</span>
      <router-link
        :to="`/widget-groups/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="entity.data.label.de"
        placeholder="Widget Group Name"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="entity.data.hidden"
      />
      <span class="ml-2 text-gray-700">Verbergen</span>
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
    </label>
    <app-image-selector v-model="entity.data.imageRef" />

    <div class="block">
      <div class="text-gray-700">Widgets</div>
      <draggable
        v-model="entity.data.content"
        group="widgets"
        item-key="id"
        handle=".handle"
      >
        <div
          class="bg-gray-100 hover:bg-gray-200 m-1 p-3 rounded-md flex items-center"
          v-for="(widget, i) in entity.data.content"
          :key="`${widget.id}-${i}`"
        >
          <app-icon class="handle cursor-pointer" icon="menu" />
          <app-widget-item class="ml-2" :id="widget.id" :type="widget.type" />
          <app-button-delete
            color="gray"
            class="ml-auto"
            @click="removeProduct(i)"
          />
        </div>
      </draggable>
    </div>

    <div></div>

    <div>
      <button
        @click="addModal = true"
        class="rounded border border-blue-600 p-1"
      >
        ADD
      </button>
    </div>

    <app-button-confirm class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button-confirm
    >
    <div>{{ id }}</div>
    <div class="text-xs">
      <pre>{{ JSON.stringify(entity, null, "  ") }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, toRef, defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

import appIcon from "@/components/Icon.vue";
import appButtonConfirm from "../components/ButtonConfirm.vue";
import appModal from "../components/Modal.vue";
import appButtonDelete from "@/components/ButtonDelete.vue";
import appProductSelector from "../components/ProductSelector.vue";
import appImageSelector from "../components/ImageSelector.vue";
import appWidgetItem from "@/components/WidgetItem.vue";

import useWidgetGroupEdit from "../hooks/use-widgetGroupEdit.js";

export default defineComponent({
  props: ["editId", "newId", "editing"],
  components: {
    appIcon,
    appButtonConfirm,
    appModal,
    appButtonDelete,
    appProductSelector,
    appImageSelector,
    appWidgetItem,
    draggable: VueDraggableNext,
  },
  setup(props) {
    const editId = toRef(props, "editId");

    const addModal = ref(false);
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const {
      id,
      entity,
      exists,
      remove,
      save,
      saveDisabled,
    } = useWidgetGroupEdit(editId.value);

    const addProduct = (id) => {
      entity.data.content.push({ id: id, type: "product" });
      addModal.value = false;
    };

    const removeProduct = (idx) => {
      entity.data.content.splice(idx, 1);
    };

    return {
      // modal
      addModal,
      deleteModal,
      deleteModalConfirmation,
      addProduct,
      removeProduct,
      // entity
      id,
      entity,
      exists,
      remove,
      save,
      saveDisabled,
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