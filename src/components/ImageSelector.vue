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
    imageTransformOutputQuality="4"
    :files="initialFiles"
  />
  <img v-if="pondImage" :src="pondImage" />
</template>

<script>
import { ref } from "vue";
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

    fetch(SAMPLE_IMAGE)
      .then((res) => res.blob())
      .then((b) => {
        b.name = "Hello.jpeg";
        initialFiles.value = [b];
      });

    // add onaddfile callback
    const onpreparefile = (fileItem, output) => {
      console.log("onpreparefile...");
      const reader = new FileReader();
      reader.readAsDataURL(output);
      reader.onloadend = function () {
        console.log("reader.result", reader.result);
        const hash = md5(reader.result);
        console.log("hash", hash);
        pondImage.value = reader.result;
        emit("selected", reader.result);
      };
      console.log("output", output);
    };

    const onremovefile = (error, file) => {
      console.log("file has been removed");
      pondImage.value = "";
      emit("cleared");
    };

    const oninitfile = (file) => {
      console.log("oninitfile...");
    };

    const onaddfile = (error, file) => {
      console.log("onaddfile...");
    };

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