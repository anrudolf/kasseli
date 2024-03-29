<template>
  <file-pond
    v-if="!modelValue"
    label-idle="Drag & Drop oder <span class='filepond--label-action'>Datei wählen</span>"
    :allow-multiple="false"
    accepted-file-types="image/png, image/jpeg, image/webp"
    allow-image-resize="true"
    image-resize-target-width="200"
    image-resize-target-height="200"
    image-resize-mode="contain"
    image-resize-upscale="false"
    image-transform-output-mime-type="image/jpeg"
    image-transform-output-quality="90"
    :files="files"
    credits="false"
    @preparefile="onpreparefile"
    @removefile="onremovefile"
  />
  <div v-else class="flex justify-end border rounded bg-gray-100 h-24">
    <app-image-ref :id="modelValue" class="w-24 h-24 object-contain mx-auto" />
    <app-button-delete
      class="mt-2 mr-2 self-start"
      tabindex="-1"
      color="gray"
      @click="$emit('update:modelValue', null)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, defineProps, defineEmits } from "vue";
import vueFilePond from "vue-filepond";
import md5 from "md5";
import { setDoc, doc } from "firebase/firestore";

import appImageRef from "@/components/image/ImageRef.vue";
import appButtonDelete from "@/components/ui/ButtonDelete.vue";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import db from "@/services/db";

// Create component
const FilePond: any = vueFilePond(
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);

const props = defineProps({
  modelValue: { type: String as PropType<string | null>, default: "" },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string | null);
}>();

const files = ref([]);

const onpreparefile = (fileItem, output) => {
  if (props.modelValue) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(output);
  reader.onloadend = function () {
    const hash = md5(reader.result);
    setDoc(doc(db.images, hash), {
      id: hash,
      type: "DATA_URL",
      mediaType: "image/jpeg",
      payload: reader.result as string,
    });
    emit("update:modelValue", hash);
  };
};

const onremovefile = (error, file) => {
  emit("update:modelValue", null);
};
</script>

<style scoped>
.image-wrapper {
  background: rgb(79, 79, 79);
}
</style>
