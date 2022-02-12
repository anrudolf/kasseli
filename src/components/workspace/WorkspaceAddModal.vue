<template>
  <app-modal
    title="Neue Einladung"
    :model-value="props.modelValue"
    @update:model-value="(ev) => emit('update:modelValue', ev)"
  >
    <div v-if="!invite">
      <p class="my-2">Lade deine Freunde zu diesem Workspace ein.</p>
      <label>
        <div>Wähle eine Rolle</div>
        <app-select v-model.number="roleToAdd" :items="items" />
      </label>
    </div>

    <div v-else>
      <div class="flex items-center p-2 rounded bg-green-100 text-green-700">
        <check-icon class="w-5 h-5 mr-2"></check-icon>
        Einladung wurde erstellt
      </div>
      <p class="py-2">Sende deinen Freunden den folgenden Link</p>
      <div class="flex">
        <input class="input" type="text" :value="getLink(invite)" readonly />
        <button
          v-if="isSupported"
          class="border rounded"
          @click="copyLink(invite)"
        >
          <duplicate-icon v-if="!copied" class="w-5 h-5 mx-3"></duplicate-icon>
          <check-icon v-else class="w-5 h-5 mx-3"></check-icon>
        </button>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <button
        v-if="!invite"
        class="btn btn-white"
        @click="emit('update:modelValue', false)"
      >
        Abbrechen
      </button>
      <button v-if="!invite" class="ml-auto btn btn-blue" @click="create">
        Erstellen
      </button>
      <button
        v-else
        class="ml-auto btn btn-blue"
        @click="emit('update:modelValue', false)"
      >
        Schliessen
      </button>
    </div>
  </app-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import appModal from "@/components/ui/Modal.vue";

import { DuplicateIcon, CheckIcon } from "@heroicons/vue/outline";
import { useClipboard } from "@vueuse/core";

import appSelect from "@/components/ui/Select.vue";

import { WorkspaceInvite, WorkspaceRole } from "@/types";

import { items, getRole, getLink } from "@/utils/workspace";

import useWorkspaceInvite from "@/hooks/use-workspace-invite";

const roleToAdd = ref(WorkspaceRole.Admin);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  wid: {
    type: String,
    default: "",
  },
  uid: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();

const invite = ref<WorkspaceInvite | null>(null);

const create = () => {
  invite.value = addInvite(roleToAdd.value);
};

const { addInvite } = useWorkspaceInvite({
  wid: props.wid,
  uid: props.uid,
});

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });

const copyLink = (invite: WorkspaceInvite | null) => {
  if (!invite) {
    return;
  }
  source.value = getLink(invite);
  copy();
};

watch(props, (newProps) => {
  if (!newProps.modelValue) {
    invite.value = null;
  }
});
</script>
