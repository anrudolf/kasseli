<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-30"
            leave="duration-200 ease-in"
            leave-from="opacity-30"
            leave-to="opacity-0"
            entered="opacity-30"
          >
            <DialogOverlay class="fixed inset-0 bg-black" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-lg
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 mb-2"
              >
                <slot name="title">{{ title }}</slot>
              </DialogTitle>
              <div>
                <slot></slot>
              </div>

              <div v-if="showCancel || showConfirm" class="mt-4 flex">
                <button
                  v-if="showCancel"
                  type="button"
                  class="btn btn-dialog mr-auto"
                  @click="cancel"
                >
                  {{ labelCancel }}
                </button>
                <button
                  v-if="showConfirm"
                  type="button"
                  class="btn btn-dialog ml-auto"
                  @click="confirm"
                >
                  {{ labelConfirm }}
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  },
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: "",
    },
    showConfirm: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    labelConfirm: {
      type: String,
      default: "OK",
    },
    labelCancel: {
      type: String,
      default: "Cancel",
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("update:modelValue", false);
    };

    const confirm = () => {
      emit("confirm");
      closeModal();
    };

    const cancel = () => {
      emit("cancel");
      closeModal();
    };

    return {
      closeModal,
      confirm,
      cancel,
    };
  },
});
</script>

<style scoped>
.btn-dialog {
  @apply inline-flex
    justify-center
    px-4
    py-2
    text-sm
    font-medium
    text-white
    bg-blue-500
    border border-transparent
    rounded-md
    hover:bg-blue-700
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-blue-700;
}
</style>
