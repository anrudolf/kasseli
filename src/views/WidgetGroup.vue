<template>
  <div class="p-4" v-if="entity">
    <app-button-back @click="back">Zurück</app-button-back>
    <div class="mt-6 grid gap-y-4 grid-cols-2 md:grid-cols-4">
      <app-widget
        v-for="(widget, i) in entity.content"
        :key="i"
        :type="widget.type"
        :widget="widget"
        @click="(ev) => add(widget.id)"
        contain
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import appWidget from "@/components/Widget.vue";
import appButtonBack from "@/components/ButtonBack.vue";

import firebase from "../firebaseInit";
const db = firebase.firestore();

export default {
  components: {
    appWidget,
    appButtonBack,
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

    return { entity, add, back: () => router.push("/") };
  },
};
</script>