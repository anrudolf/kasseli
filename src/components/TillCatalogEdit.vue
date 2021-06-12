<template>
  <div class="p-2 mt-1 max-w-lg border">
    <app-modal :visible="addModal" @close="addModal = false">
      <template v-slot:title>Produkt auswählen</template>
      <app-product-selector @selected="addProduct" />
    </app-modal>

    <app-modal :visible="deleteModal" @close="deleteModal = false">
      <template v-slot:title>Katalog wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Label eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ entity.label.de }}</div>
          <input
            class="input"
            :placeholder="entity.label.de"
            v-model="deleteModalConfirmation"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="entity.label.de !== deleteModalConfirmation"
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

    <div class="flex justify-end">
      <app-button-delete @click="deleteModal = true" />
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="entity.label.de"
        placeholder="Widget Group Name"
      />
    </label>

    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox" v-model="entity.hidden" />
      <span class="ml-2 text-gray-700">Verbergen</span>
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
    </label>
    <app-image-selector v-model="entity.imageRef" />

    <div class="block mt-4">
      <div class="flex justify-between items-center mb-3">
        <span class="text-gray-700 text-lg">Produkte</span>
        <button
          @click="addModal = true"
          class="btn btn-green inline-flex items-center mr-1"
        >
          <app-icon icon="plus" class="w-5 h-5 mr-1" />
          Product
        </button>
      </div>

      <draggable
        v-model="entity.content"
        group="items"
        item-key="id"
        handle=".handle"
      >
        <div
          class="bg-gray-100 hover:bg-gray-200 m-1 p-3 rounded-md flex items-center"
          v-for="(item, i) in entity.content"
          :key="`${item.id}-${i}`"
        >
          <app-icon class="handle cursor-pointer" icon="menu" />
          <app-catalog-list-item class="ml-2" :id="item.id" :type="item.type" />
          <app-button-delete
            class="ml-auto"
            color="gray"
            @click="removeProduct(i)"
          />
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

import { TillCatalog } from "@/types";

import appIcon from "@/components/Icon.vue";
import appModal from "../components/Modal.vue";
import appButtonDelete from "@/components/ButtonDelete.vue";
import appProductSelector from "../components/ProductSelector.vue";
import appImageSelector from "../components/ImageSelector.vue";
import appCatalogListItem from "@/components/CatalogListItem.vue";

export default defineComponent({
  props: {
    entity: {
      type: Object as PropType<TillCatalog>,
      required: true,
    },
  },
  components: {
    appIcon,
    appModal,
    appButtonDelete,
    appProductSelector,
    appImageSelector,
    appCatalogListItem,
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const addModal = ref(false);
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const addProduct = (id) => {
      props.entity.content.push({ id, type: "product" });
      addModal.value = false;
    };

    const removeProduct = (idx) => {
      props.entity.content.splice(idx, 1);
    };

    const remove = () => {
      emit("remove");
    };

    return {
      // modal
      addModal,
      deleteModal,
      deleteModalConfirmation,
      // product
      addProduct,
      removeProduct,
      // remove this catalog
      remove,
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