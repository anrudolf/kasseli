<template>
  <div class="p-4" v-if="card">
    <h1>Karte: {{ card.label.de }}</h1>
    <ul>
      <li v-for="(product, i) in card.content" :key="i">
        <app-produkt-button :label="product" @click="(ev) => add(product)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import appProduktButton from "@/components/ProduktButton.vue";

import firebase from "../firebaseInit";
const db = firebase.firestore();

export default {
  components: {
    appProduktButton,
  },
  props: {
    id: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const { id } = toRefs(props);
    const card = ref(null);

    const documentPath = `/cards/${id.value}`;

    db.doc(documentPath)
      .get()
      .then((doc) => {
        card.value = doc.data();
      })
      .catch((e) => console.log(e));

    const add = (code) => {
      store.dispatch("kasse/add", code);
      router.push("/");
    };

    return { card, add };
  },
};
</script>