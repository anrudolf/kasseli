<template>
  <file-pond
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
  />
</template>

<script>
import { ref, watch, toRef } from "vue";
import vueFilePond from "vue-filepond";
import md5 from "md5";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import firebase from "../firebaseInit";
const db = firebase.firestore();

// Create component
const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);
export default {
  emits: ["update:modelValue"],
  components: {
    FilePond,
  },
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const modelValue = toRef(props, "modelValue");
    const internalHash = ref(null);
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
        internalHash.value = hash;
        emit("update:modelValue", hash);
      };
    };

    const onremovefile = (error, file) => {
      emit("update:modelValue", null);
    };

    watch(modelValue, (newVal) => {
      if (!newVal) {
        return;
      }

      if (modelValue.value !== internalHash.value) {
        db.collection("images")
          .doc(props.modelValue)
          .get()
          .then((doc) => {
            if (doc.exists) {
              fetch(doc.data().payload)
                .then((res) => res.blob())
                .then((b) => {
                  b.name = `${doc.id}.jpeg`;
                  files.value = [
                    {
                      source: b,
                      options: {
                        type: "local",
                      },
                    },
                  ];
                });
            }
          });
      }
    });

    return {
      onpreparefile,
      onremovefile,
      files,
    };
  },
};
</script>