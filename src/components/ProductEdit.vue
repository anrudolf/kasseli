<template>
  <div class="p-4 max-w-lg">
    <app-modal :visible="deleteModal" @close="deleteModal = false">
      <template v-slot:title>Wirklich löschen?</template>
      <div>
        <div>Zum Bestätigen bitte Produkt ID eintippen und löschen klicken</div>
        <label class="block">
          <div class="text-gray-700">{{ product.id }}</div>
          <input
            class="input"
            placeholder="Produkt ID"
            v-model="deleteModalConfirmation"
          />
        </label>
        <div class="mt-3 flex justify-between">
          <button
            :disabled="product.id !== deleteModalConfirmation"
            class="disabled:opacity-50 bg-red-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            @click="remove"
          >
            Löschen
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
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
      <h1 v-if="editing" class="text-2xl">Produkt editieren</h1>
      <h1 v-else class="text-2xl">Produkt erstellen</h1>

      <button v-if="editing" @click="deleteModal = true" class="text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input
        class="input"
        :class="{ disabled: editing }"
        v-model="product.id"
        placeholder="Produkt ID"
        :disabled="editing"
      />
    </label>

    <div
      v-if="!editing && exists"
      class="p-2 my-1 rounded bg-blue-100 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="ml-2">Produkt existiert bereits</span>
      <router-link
        :to="`/products/edit?id=${id}`"
        class="ml-auto underline text-blue-500"
        >Editieren</router-link
      >
    </div>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="input"
        v-model="product.data.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        type="number"
        class="input"
        v-model.number="product.data.price"
        placeholder="2.90"
      />
    </label>

    <label class="flex items-center">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.data.noBarcode"
      />
      <span class="ml-2 text-gray-700">Produkt hat kein Strichcode</span>
    </label>

    <label class="flex items-center" v-if="templateEnabled">
      <input
        type="checkbox"
        class="form-checkbox"
        v-model="product.data.template"
      />
      <span class="ml-2 text-gray-700">Preis aus Strichcode berechnen</span>
    </label>

    <label class="block">
      <div class="text-gray-700">Bild</div>
      <a :href="product.data.image" v-if="product.data.image" target="_blank">
        <img
          class="object-contain h-32 w-full mb-1 border rounded"
          :src="product.data.image"
          crossorigin="anonymous"
        />
      </a>
      <input
        type="file"
        class="input"
        accept="image/*"
        capture="environment"
        @input="(ev) => saveImage(ev.target.files[0])"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Bild Filepond</div>
      <a :href="product.data.image" v-if="product.data.image" target="_blank">
        <img
          class="object-contain h-32 w-full mb-1 border rounded"
          :src="product.data.image"
        />
      </a>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        :allow-multiple="false"
        accepted-file-types="image/png, image/jpeg"
        :files="myFiles"
        @init="handleFilePondInit"
        @preparefile="onpreparefile"
        @removefile="onremovefile"
        allowImageResize="true"
        imageResizeTargetWidth="200"
        imageResizeTargetHeight="200"
        imageResizeMode="contain"
        imageResizeUpscale="false"
        imageTransformOutputMimeType="image/jpeg"
        imageTransformOutputQuality="90"
      />
      <img v-if="pondImage" :src="pondImage" />
    </label>

    <app-button class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button
    >
    <div>{{ id }}</div>
    <div class="text-xs">
      <pre>{{ JSON.stringify(product, null, "  ") }}</pre>
    </div>
    <div>editing {{ editing }}</div>
  </div>
</template>

<script>
import { ref, toRef, defineComponent, onMounted } from "vue";
import vueFilePond from "vue-filepond";
import md5 from "md5";

import "filepond/dist/filepond.min.css";

// Import image preview and file type validation plugins
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Create component
const FilePond = vueFilePond(
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);

import appButton from "../components/Button.vue";
import appModal from "../components/Modal.vue";

import useProductEdit from "../hooks/use-productEdit.js";

export default defineComponent({
  props: ["editId", "newId", "editing"],
  components: {
    appButton,
    appModal,
    FilePond,
  },
  setup(props) {
    const editId = toRef(props, "editId");
    const deleteModal = ref(false);
    const deleteModalConfirmation = ref("");

    const options = { editing: props.editing, initialId: editId.value };

    const {
      id,
      product,
      exists,
      remove,
      save,
      saveDisabled,
      templateEnabled,
      uploadImage,
      saveImage,
    } = useProductEdit(options);

    if (props.newId) {
      product.id = `${props.newId}`;
    }

    const pond = ref(null);
    const myFiles = ref([]);
    const pondImage = ref("");

    // add onaddfile callback
    const onpreparefile = (fileItem, output) => {
      const reader = new FileReader();
      reader.readAsDataURL(output);
      reader.onloadend = function () {
        console.log("reader.result", reader.result);
        const hash = md5(reader.result);
        console.log("hash", hash);
        pondImage.value = reader.result;
      };
      console.log("output", output);
    };

    const onremovefile = (error, file) => {
      console.log("file has been removed");
    };

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(pond.value); // <div>This is a root element</div>
    });

    const handleFilePondInit = () => {
      console.log("FilePond has initialized");

      // example of instance method call on pond reference
      // pond.value.getFiles();
    };

    return {
      // modal
      deleteModal,
      deleteModalConfirmation,
      // file pond
      pond,
      pondImage,
      handleFilePondInit,
      onpreparefile,
      onremovefile,
      myFiles,
      // product edit
      id,
      product,
      exists,
      remove,
      save,
      saveDisabled,
      templateEnabled,
      uploadImage,
      saveImage,
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

>>> .filepond--credits {
  display: none !important;
}
</style>