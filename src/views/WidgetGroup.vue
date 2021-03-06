<template>
  <div class="p-4" v-if="entity">
    <h1>Widget Group: {{ entity.label.de }}</h1>
    <ul>
      <li v-for="(widget, i) in entity.content" :key="i">
        <app-produkt-button :label="widget" @click="(ev) => add(widget)" />
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
    const entity = ref(null);

    const documentPath = `/widget-groups/${id.value}`;

    db.doc(documentPath)
      .get()
      .then((doc) => {
        entity.value = doc.data();
      })
      .catch((e) => console.log(e));

    const add = (code) => {
      store.dispatch("kasse/add", code);
      router.push("/");
    };

    return { entity, add };
  },
};
</script>