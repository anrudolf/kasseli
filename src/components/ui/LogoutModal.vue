<template>
  <app-modal
    title="Wirklich ausloggen?"
    :model-value="props.modelValue"
    @update:model-value="(ev) => emit('update:modelValue', ev)"
  >
    <p>
      Du bist momentan eingeloggt als <strong>{{ authStore.email }}</strong>
    </p>
    <div v-if="hasPendingWrites" class="my-3">
      <div class="p-2 bg-red-500 rounded text-white flex items-center">
        <div>
          <exclamation-circle-icon
            class="w-6 h-6 mr-2"
          ></exclamation-circle-icon>
        </div>
        Lokale Daten sind nicht mit der Cloud synchronisiert! Bitte gehe online,
        um automatisch zu synchronisieren. Wenn du jetzt ausloggst, gehen alle
        lokalen Daten verloren!
      </div>
      <div class="py-3">
        <label>
          <input
            v-model="forceLogout"
            type="checkbox"
            class="form-checkbox mr-2"
          />
          Lokale Daten verwerfen & ausloggen (!!!)
        </label>
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <button
        class="btn btn-white"
        @click="(ev) => emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        class="btn"
        :class="[hasPendingWrites ? 'btn-red' : 'btn-blue']"
        :disabled="hasPendingWrites && !forceLogout"
        @click="
          () => {
            emit('confirm');
            emit('update:modelValue', false);
          }
        "
      >
        Logout
      </button>
    </div>
  </app-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { getFirestore, waitForPendingWrites } from "firebase/firestore";

import { ExclamationCircleIcon } from "@heroicons/vue/outline";

import appModal from "@/components/ui/Modal.vue";
import useAuthStore from "@/store/auth";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
}>();

const authStore = useAuthStore();

const hasPendingWrites = ref(true);
const forceLogout = ref(false);

const checkPendingWrites = async () => {
  hasPendingWrites.value = true;
  await waitForPendingWrites(getFirestore());
  hasPendingWrites.value = false;
};

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal) {
      checkPendingWrites();
    }
  }
);
</script>
