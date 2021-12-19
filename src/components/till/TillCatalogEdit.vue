<template>
  <div class="p-3 max-w-lg">
    <app-modal v-model="addModal">
      <template #title>Produkt auswählen</template>
      <app-product-selector @selected="addProduct" />
    </app-modal>

    <app-modal v-model="deleteModal">
      <template #title>Katalog wirklich löschen?</template>
      <div>
        <div v-if="entity.id">
          <div>Zum Bestätigen bitte ID eintippen und löschen klicken</div>
          <label class="block">
            <div class="text-gray-700">{{ entity.id }}</div>
            <input
              v-model="deleteModalConfirmation"
              class="input"
              :placeholder="entity.id"
            />
          </label>
        </div>

        <div class="mt-3 flex justify-between">
          <button
            :disabled="entity.id !== deleteModalConfirmation"
            class="
              disabled:opacity-50
              bg-red-500
              hover:bg-red-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
            @click="remove"
          >
            Löschen
          </button>
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
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

    <div class="flex p-2 justify-between items-center">
      <button
        :disabled="idx === 0"
        class="disabled:opacity-50"
        @click="emit('move', 'up')"
      >
        <app-icon icon="chevron-up" />
      </button>
      <button
        :disabled="idx === 0"
        class="disabled:opacity-50"
        @click="emit('move', 'top')"
      >
        <app-icon icon="chevron-double-up" />
      </button>
      <button
        :disabled="idx === size - 1"
        class="disabled:opacity-50"
        @click="emit('move', 'bottom')"
      >
        <app-icon icon="chevron-double-down" />
      </button>
      <button
        :disabled="idx === size - 1"
        class="disabled:opacity-50"
        @click="emit('move', 'down')"
      >
        <app-icon icon="chevron-down" />
      </button>
      <app-button-delete @click="deleteModal = true" />
    </div>

    <h3 class="mt-1">Katalog</h3>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input v-model="entity.id" class="input" placeholder="ID" />
    </label>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input v-model="entity.label.de" class="input" placeholder="Label" />
    </label>

    <label class="flex items-center">
      <input v-model="entity.hidden" type="checkbox" class="form-checkbox" />
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
          class="btn btn-green inline-flex items-center mr-1"
          @click="addModal = true"
        >
          <app-icon icon="plus" class="w-5 h-5 mr-1" />
          Produkt
        </button>
      </div>

      <draggable
        v-if="entity.content.length > 0"
        v-model="entity.content"
        group="items"
        item-key="id"
        handle=".handle"
      >
        <div
          v-for="(item, i) in entity.content"
          :key="`${item.id}-${i}`"
          class="
            bg-gray-100
            hover:bg-gray-200
            m-1
            p-3
            rounded-md
            flex
            items-center
          "
        >
          <app-icon class="handle cursor-pointer" icon="menu" />
          <app-catalog-list-item :id="item.id" class="ml-2" :kind="item.kind" />
          <app-button-delete
            class="ml-auto"
            color="gray"
            @click="removeProduct(i)"
          />
        </div>
      </draggable>
      <div v-else class="text-secondary">Noch keine Produkte</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

import { TillCatalog } from "@/types";

import appIcon from "@/components/ui/Icon.vue";
import appModal from "@/components/Modal.vue";
import appButtonDelete from "@/components/ui/ButtonDelete.vue";
import appProductSelector from "@/components/product/ProductSelector.vue";
import appImageSelector from "@/components/ImageSelector.vue";
import appCatalogListItem from "@/components/CatalogListItem.vue";

export default defineComponent({
  props: {
    entity: {
      type: Object as PropType<TillCatalog>,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
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
      props.entity.content.push({ id, kind: "product" });
      addModal.value = false;
    };

    const removeProduct = (idx) => {
      props.entity.content.splice(idx, 1);
    };

    const remove = () => {
      deleteModal.value = false;
      deleteModalConfirmation.value = "";
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
      // emit
      emit,
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
