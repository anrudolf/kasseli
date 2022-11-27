<template>
  <div class="p-4 max-w-lg">
    <app-button-back class="mb-3">Zurück</app-button-back>
    <app-modal v-model="deleteModal">
      <template #title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Kasse ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ till.id }}</div>
          <input
            v-model="deleteModalConfirmation"
            class="input"
            placeholder="Kasse ID"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="till.id !== deleteModalConfirmation"
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

    <div class="flex justify-between">
      <h1 v-if="editing">Kasse editieren</h1>
      <h1 v-else>Kasse erstellen</h1>
      <app-button-delete
        v-if="editing && removable"
        @click="deleteModal = true"
      />
    </div>

    <label class="block">
      <div class="text-gray-700">ID</div>
      <input
        v-model="till.id"
        class="input"
        :class="{ disabled: idDisabled }"
        placeholder="Kasse ID"
        :disabled="idDisabled"
      />
    </label>

    <div
      v-if="!editing && exists"
      class="p-2 my-1 rounded bg-blue-100 flex items-center"
    >
      <app-icon icon="info" color="gray" />
      <span class="ml-2">Kasse existiert bereits</span>
      <router-link
        :to="`/tills/edit?id=${till.id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input v-model="till.label.de" class="input" placeholder="Kasse Name" />
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
    </label>
    <app-image-selector v-model="till.imageRef" />

    <section class="mt-4">
      <h2 class="flex justify-between items-center text-gray-700 text-lg">
        Favoriten
        <div>
          <button
            class="btn btn-blue inline-flex items-center mr-1 text-base"
            @click="addCatalog"
          >
            <app-icon icon="plus" class="w-5 h-5 mr-1" />
            Katalog
          </button>
          <button
            class="btn btn-blue inline-flex items-center mr-1 text-base"
            @click="addProduct"
          >
            <app-icon icon="plus" class="w-5 h-5 mr-1" />
            Produkt
          </button>
        </div>
      </h2>

      <div
        v-for="(favorite, idx) in till.favorites"
        :id="`${favorite.kind}-${favorite.id}`"
        :key="idx"
      >
        <component
          :is="getComponent(favorite.kind)"
          :entity="favorite"
          :idx="idx"
          :size="till.favorites.length"
          class="my-4 border-4"
          @remove="till.favorites.splice(idx, 1)"
          @move="(pos: string) => moveFavorite(idx, pos)"
          @create-product="initiateProductCreation"
        />
      </div>
    </section>

    <app-button-confirm class="mt-4" :disabled="saveDisabled" @click="save"
      >Speichern</app-button-confirm
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, PropType, watch } from "vue";

import appButtonDelete from "@/components/ui/ButtonDelete.vue";
import appButtonConfirm from "@/components/ui/ButtonConfirm.vue";
import appModal from "@/components/ui/Modal.vue";
import appIcon from "@/components/ui/Icon.vue";
import appTillCatalogEdit from "@/components/till/TillCatalogEdit.vue";
import appTillProductEdit from "@/components/till/TillProductEdit.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import appImageSelector from "@/components/image/ImageSelector.vue";

import useTillEdit from "@/hooks/use-till-edit";

import arrayUtil from "@/utils/array";

import useTillStore from "@/store/till";

import { TillClipboard } from "@/types";

const props = defineProps({
  id: { type: String, default: "" },
  editing: Boolean,
  removable: Boolean,
  clipboard: {
    type: Object as PropType<TillClipboard | null>,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "initiate-product-creation", v: TillClipboard): void;
  (e: "loaded"): void;
}>();

const deleteModal = ref(false);
const deleteModalConfirmation = ref("");

const options = {
  editing: props.editing,
  id: props.id,
  clipboard: props.clipboard,
};

const {
  entity: till,
  exists,
  remove,
  save,
  saveDisabled,
  idDisabled,
  addCatalog,
  addProduct,
} = useTillEdit(options);

const isLoaded = ref(false);

watch(
  till,
  (val, oldVal) => {
    if (!isLoaded.value) {
      isLoaded.value = true;
      emit("loaded");
    }
  },
  { immediate: true }
);

const store = useTillStore();
if (store.clipboard) {
  Object.assign(till, { ...till, ...store.clipboard.till });
  store.clipboard = null;
}

const getComponent = (kind: string) => {
  if (kind === "catalog") {
    return appTillCatalogEdit;
  }

  if (kind === "product") {
    return appTillProductEdit;
  }

  return null;
};

const moveFavorite = (idx: number, pos: string) => {
  switch (pos) {
    case "up":
      arrayUtil.moveDown(till.favorites, idx);
      break;
    case "top":
      arrayUtil.moveBottom(till.favorites, idx);
      break;
    case "down":
      arrayUtil.moveUp(till.favorites, idx);
      break;
    case "bottom":
      arrayUtil.moveTop(till.favorites, idx);
      break;
    default:
      break;
  }
};

const initiateProductCreation = (v: { idx: number; kind: string }) => {
  emit("initiate-product-creation", {
    till,
    favorite: { idx: v.idx, kind: v.kind },
  });
};
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
