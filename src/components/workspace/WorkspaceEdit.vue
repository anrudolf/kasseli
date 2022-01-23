<template>
  <div class="p-4 max-w-lg">
    <app-modal v-model="deleteModal">
      <template #title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Produkt ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ entity.id }}</div>
          <input
            v-model="deleteModalConfirmation"
            class="input"
            placeholder="Produkt ID"
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
      <h1 v-if="editing">Workspace editieren</h1>
      <h1 v-else>Workspace erstellen</h1>
      <app-button-delete v-if="editing" @click="deleteModal = true" />
    </div>

    <label class="block">
      <div class="text-gray-700">Name</div>
      <input v-model="entity.name" class="input" placeholder="Workspace Name" />
    </label>

    <app-button-confirm class="mt-4" :disabled="saveDisabled" @click="save"
      >Speichern</app-button-confirm
    >
    <div class="text-xs">
      <pre>{{ JSON.stringify(entity, null, "  ") }}</pre>
    </div>
    <div v-if="false">editing {{ editing }}</div>
  </div>
</template>

<script>
import { ref, toRef, defineComponent } from "vue";

import appButtonDelete from "@/components/ui/ButtonDelete.vue";
import appButtonConfirm from "@components/ui/ButtonConfirm.vue";
import appModal from "@/components/ui/Modal.vue";

import useWorkspaceEdit from "@/hooks/use-workspaceEdit";

import utils from "@/utils";

export default defineComponent({
  components: {
    appButtonDelete,
    appButtonConfirm,
    appModal,
  },
  props: ["editId", "newId", "editing"],
  setup(props) {
    const editId = toRef(props, "editId");
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const options = { editing: props.editing, initialId: editId.value };

    const {
      entity,
      exists,
      remove,
      save,
      saveDisabled,
      idDisabled,
      templateEnabled,
      uploadImage,
    } = useWorkspaceEdit(options);

    if (props.newId) {
      entity.id = `${props.newId}`;
    }

    return {
      // modal
      deleteModal,
      deleteModalConfirmation,
      // entity edit
      entity,
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
</style>
