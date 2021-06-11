<template>
  <file-pond
    v-if="!modelValue"
    label-idle="Drag & Drop oder <span class='filepond--label-action'>Datei wählen</span>"
    :allow-multiple="false"
    accepted-file-types="image/png, image/jpeg"
    @preparefile="onpreparefile"
    @removefile="onremovefile"
    allowImageResize="true"
    imageResizeTargetWidth="200"
    imageResizeTargetHeight="200"
    imageResizeMode="contain"
    imageResizeUpscale="false"
    imageTransformOutputMimeType="image/jpeg"
    imageTransformOutputQuality="90"
    :files="files"
    credits="false"
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

<script lang="ts">
import { ref, defineComponent } from "vue";
import vueFilePond from "vue-filepond";
import md5 from "md5";

import appImageRef from "@/components/ImageRef.vue";
import appButtonDelete from "@/components/ButtonDelete.vue";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import firebase from "../firebaseInit";
const db = firebase.firestore();

// Create component
const FilePond: any = vueFilePond(
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);
export default defineComponent({
  emits: ["update:modelValue"],
  components: {
    appImageRef,
    appButtonDelete,
    FilePond,
  },
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const files = ref([]);

    const onpreparefile = (fileItem, output) => {
      if (props.modelValue) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(output);
      reader.onloadend = function () {
        const hash = md5(reader.result);
        db.collection("images").doc(hash).set({
          id: hash,
          type: "DATA_URL",
          mediaType: "image/jpeg",
          payload: reader.result,
        });
        emit("update:modelValue", hash);
      };
    };

    const onremovefile = (error, file) => {
      emit("update:modelValue", null);
    };

    return {
      onpreparefile,
      onremovefile,
      files,
    };
  },
});
</script>

<style scoped>
.image-wrapper {
  background: rgb(79, 79, 79);
}
</style>