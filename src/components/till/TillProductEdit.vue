<template>
  <div class="p-3 max-w-lg">
    <app-modal v-model="addModal">
      <template #title>Produkt auswählen</template>
      <app-product-selector @selected="setProduct" />
    </app-modal>

    <app-modal v-model="deleteModal">
      <template #title>Produkt Favorit wirklich entfernen?</template>
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

    <h3 class="mt-1">Produkt</h3>

    <div v-if="product" class="py-2">{{ product.label.de }}</div>
    <div v-else class="text-secondary py-2">Noch kein Produkt gewählt</div>
    <div class="flex justify-end">
      <button class="btn btn-green" @click="addModal = true">
        <span v-if="product">Produkt ändern</span>
        <span v-else>Produkt wählen</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineEmits, computed } from "vue";

import { TillProduct } from "@/types";

import appIcon from "@/components/ui/Icon.vue";
import appModal from "@/components/ui/Modal.vue";
import appButtonDelete from "@/components/ui/ButtonDelete.vue";
import appProductSelector from "@/components/product/ProductSelector.vue";

import useProductStore from "@/store/products";
import { Product } from "@/types";

const props = defineProps({
  entity: {
    type: Object as PropType<TillProduct>,
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
});

const emit = defineEmits<{
  (e: "remove", v: void);
  (e: "move", v: string);
}>();

const addModal = ref(false);
const deleteModal = ref(false);
const deleteModalConfirmation = ref("");

const setProduct = (id) => {
  props.entity.id = id;
  addModal.value = false;
};

const remove = () => {
  deleteModal.value = false;
  deleteModalConfirmation.value = "";
  emit("remove");
};

const store = useProductStore();

const product = computed(() => {
  const found = store.item(props.entity.id);
  if (found) {
    return found as Product;
  }
  return null;
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
