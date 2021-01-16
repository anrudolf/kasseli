<template>
  <div class="p-4">
    <h1 class="text-2xl">Neues Produkt</h1>

    <label class="block">
      <div class="text-gray-700">ID oder Strichcode</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.id"
        placeholder="Produkt ID"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Label</div>
      <input
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
        v-model="product.data.label.de"
        placeholder="Produkt Name"
      />
    </label>

    <label class="block">
      <div class="text-gray-700">Preis</div>
      <input
        type="number"
        class="border rounded py-2 px-3 text-gray-700 focus:shadow-outline"
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

    <app-button class="mt-4" @click="save" :disabled="saveDisabled"
      >Speichern</app-button
    >
    <div>{{ productId }}</div>
    <div>{{ product }}</div>
  </div>
</template>

<script>
import { reactive, computed, watch, toRef, toRefs } from "vue";
import { useRouter } from "vue-router";
import appButton from "../components/Button.vue";

import firebase from "../firebaseInit";

import utils from "../utils";

const db = firebase.firestore();

export default {
  components: {
    appButton,
  },
  setup() {
    const router = useRouter();

    const product = reactive({
      id: null,
      data: {
        label: {
          de: null,
          en: null,
        },
        price: null,
        noBarcode: false,
        template: false,
      },
    });

    const { id: rawProductId } = toRefs(product);
    const productId = computed(() => {
      if (product.data.template) {
        return utils.createTemplate(rawProductId.value);
      }

      return rawProductId.value;
    });

    const save = () => {
      db.collection("products")
        .doc(product.id)
        .set(product.data)
        .then(() => {
          console.log("document set, pushing route /products");
          router.push("/products");
        })
        .catch((error) => console.log(error));
    };

    const saveDisabled = computed(() => {
      return (
        !product.id ||
        !product.data.label.de ||
        typeof product.data.price !== "number"
      );
    });

    const templateEnabled = computed(() => {
      return (
        !product.data.noBarcode &&
        product.id &&
        utils.isNumeric(product.id) &&
        product.id.length === 13
      );
    });

    watch(product, (p) => {
      if (!p.id || p.id.length < 13 || p.data.noBarcode) {
        product.data.template = false;
      }
    });

    watch(productId, (v, old) => {
      if (v && v !== old) {
        db.collection("products")
          .doc(v)
          .get()
          .then((doc) => {
            if (doc.exists) {
              product.id = doc.id;
              product.data = doc.data();
            }
          });
      }
    });

    return { productId, product, save, saveDisabled, templateEnabled };
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 12px;
  font-size: 1.125rem;
}
</style>