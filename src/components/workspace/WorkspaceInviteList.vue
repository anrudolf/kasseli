<template>
  <div>
    <div class="flex items-center">
      <h2 class="mr-auto leading-3">
        Invites
        <div class="mt-2 text-xs text-secondary">Lade deine Freunde ein</div>
      </h2>

      <router-link
        class="btn btn-blue"
        :to="{ name: 'workspaces-invite-new', params: { wid } }"
        >ADD</router-link
      >
    </div>
    <ul>
      <li
        v-for="invite in props.modelValue"
        :key="invite.id"
        class="my-2 border flex justify-between items-center"
      >
        <router-link
          class="p-2 w-full"
          :to="{
            name: 'workspaces-invite',
            params: { wid: invite.workspace, id: invite.id },
          }"
        >
          <div>
            <div>
              <span>{{ getLocaleDateString(invite.created) }}</span>
              <span class="ml-2 text-secondary">{{
                getLocaleTimeString(invite.created)
              }}</span>
            </div>
            <small> {{ getRole(invite) }} &bull; {{ getUsage(invite) }}</small>
          </div>
        </router-link>

        <button
          class="mx-1 btn btn-white border-none"
          @click="copyLink(invite)"
        >
          <duplicate-icon class="w-5 h-5"></duplicate-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { useClipboard } from "@vueuse/core";
import { DuplicateIcon } from "@heroicons/vue/outline";

import { getRole, getUsage, getLink } from "@/utils/workspace";

import { WorkspaceInvite } from "@/types";

import { getLocaleDateString, getLocaleTimeString } from "@/utils/date";

const props = defineProps<{ modelValue: WorkspaceInvite[]; wid: string }>();

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });

const copyLink = (invite: WorkspaceInvite) => {
  source.value = getLink(invite);
  copy();
};
</script>
