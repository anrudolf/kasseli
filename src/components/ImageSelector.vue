<template>
  <file-pond
    label-idle="Drag & Drop oder <span class='filepond--label-action'>Datei wählen</span>"
    :allow-multiple="false"
    accepted-file-types="image/png, image/jpeg"
    @addfile="onaddfile"
    @preparefile="onpreparefile"
    @removefile="onremovefile"
    @initfile="oninitfile"
    allowImageResize="true"
    imageResizeTargetWidth="200"
    imageResizeTargetHeight="200"
    imageResizeMode="contain"
    imageResizeUpscale="false"
    imageTransformOutputMimeType="image/jpeg"
    imageTransformOutputQuality="90"
    :files="initialFiles"
  />
  <img v-if="pondImage" :src="pondImage" />
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import vueFilePond from "vue-filepond";
import md5 from "md5";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import SAMPLE_IMAGE from "../utils/sampleImage";

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
  emits: ["cleared", "selected"],
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
    const pondImage = ref("");
    /*
    const initialFiles = ref([
      {
        source: INITIAL_FILE,
        options: {
          type: "local",
          filename: "hello",
          fileName: "hello",
        },
      },
    ]);
    */

    const initialFiles = ref([]);

    /*
    fetch(SAMPLE_IMAGE)
      .then((res) => res.blob())
      .then((b) => {
        b.name = "Hello.jpeg";
        initialFiles.value = [b];
      });
      */

    // add onaddfile callback
    const onpreparefile = (fileItem, output) => {
      console.log("onpreparefile...", fileItem);

      if (props.modelValue) {
        console.log("modelValue is set, returning early");
        //return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(output);
      reader.onloadend = function () {
        const hash = md5(reader.result);
        console.log("hash", hash);
        // pondImage.value = reader.result;
        console.log("emitting update:modelValue", hash);
        db.collection("images").doc(hash).set({
          id: hash,
          type: "DATA_URL",
          mediaType: "image/jpeg",
          payload: reader.result,
        });
        emit("update:modelValue", hash);
      };
      console.log("output", output);
    };

    const onremovefile = (error, file) => {
      console.log("file has been removed");
      pondImage.value = "";
      emit("cleared");
      emit("update:modelValue", null);
    };

    const oninitfile = (file) => {
      console.log("oninitfile...");
    };

    const onaddfile = (error, file) => {
      console.log("onaddfile...");
    };

    watch(props.modelValue, (newVal) => {
      console.log("props.modelValue has changed", newVal);
    });

    watchEffect(() => {
      console.log("watchEffect", props.modelValue);
      if (props.modelValue) {
        console.log("trying to get doc", props.modelValue);
        db.collection("images")
          .doc(props.modelValue)
          .get()
          .then((doc) => {
            console.log("... received!");
            if (doc.exists) {
              console.log("... doc exists! setting payload");
              pondImage.value = doc.data().payload;
            }
          });
      }
    });

    return {
      onpreparefile,
      onremovefile,
      pondImage,
      initialFiles,
      oninitfile,
      onaddfile,
    };
  },
};
</script>