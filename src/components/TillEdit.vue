<template>
  <div class="p-4 max-w-lg">
    <app-modal v-model="deleteModal">
      <template #title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Kasse ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ entity.id }}</div>
          <input
            v-model="deleteModalConfirmation"
            class="input"
            placeholder="Kasse ID"
          />
        </label>
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
        v-model="entity.id"
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
        :to="`/tills/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input v-model="entity.label.de" class="input" placeholder="Kasse Name" />
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
    </label>
    <app-image-selector v-model="entity.imageRef" />

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

      <div v-for="(favorite, idx) in entity.favorites" :key="idx">
        <component
          :is="`app-till-${favorite.kind}-edit`"
          :entity="favorite"
          :idx="idx"
          :size="entity.favorites.length"
          class="my-4 border-4"
          @remove="entity.favorites.splice(idx, 1)"
          @move="(pos) => moveFavorite(idx, pos)"
        />
      </div>
    </section>

    <app-button-confirm class="mt-4" :disabled="saveDisabled" @click="save"
      >Speichern</app-button-confirm
    >
  </div>
</template>

<script lang="ts">
import { ref, toRef, defineComponent } from "vue";

import appButtonDelete from "@/components/ButtonDelete.vue";
import appButtonConfirm from "../components/ButtonConfirm.vue";
import appModal from "../components/Modal.vue";
import appIcon from "@/components/Icon.vue";
import appTillCatalogEdit from "@/components/TillCatalogEdit.vue";
import appTillProductEdit from "@/components/TillProductEdit.vue";

import appImageSelector from "../components/ImageSelector.vue";

import useTillEdit from "../hooks/use-tillEdit";

import utils from "@/utils";
import arrayUtil from "@/utils/array";

export default defineComponent({
  components: {
    appButtonDelete,
    appButtonConfirm,
    appModal,
    appIcon,
    appTillCatalogEdit,
    appTillProductEdit,
    appImageSelector,
  },
  props: ["editId", "newId", "editing", "removable"],
  setup(props) {
    const editId = toRef(props, "editId");
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const options = { editing: props.editing, initialId: editId.value };

    const {
      id,
      entity,
      exists,
      remove,
      save,
      saveDisabled,
      idDisabled,
      addCatalog,
      addProduct,
    } = useTillEdit(options);

    if (props.newId) {
      entity.id = `${props.newId}`;
    }

    const moveFavorite = (idx, pos) => {
      switch (pos) {
        case "up":
          arrayUtil.moveDown(entity.favorites, idx);
          break;
        case "top":
          arrayUtil.moveBottom(entity.favorites, idx);
          break;
        case "down":
          arrayUtil.moveUp(entity.favorites, idx);
          break;
        case "bottom":
          arrayUtil.moveTop(entity.favorites, idx);
          break;
        default:
          break;
      }
    };

    return {
      // modal
      deleteModal,
      deleteModalConfirmation,
      // till edit
      id,
      entity,
      exists,
      remove,
      save,
      saveDisabled,
      idDisabled,
      // utils
      toNumber: utils.toNumber,
      // special functions
      addCatalog,
      addProduct,
      moveFavorite,
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
