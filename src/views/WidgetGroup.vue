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

<script lang="ts">
import firebase from "firebase/app";

import { defineComponent, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

import appWidget from "@/components/Widget.vue";
import appButtonBack from "@/components/ButtonBack.vue";

import useKasseStore from "@/pinia/kasse";

import fb from "../firebaseInit";
const db = fb.firestore();

export default defineComponent({
  components: {
    appWidget,
    appButtonBack,
  },
  props: {
    id: String,
  },
  setup(props) {
    const store = useKasseStore();
    const router = useRouter();

    const { id } = toRefs(props);
    const entity = ref<firebase.firestore.DocumentData | null>(null);

    const documentPath = `/widget-groups/${id?.value}`;

    db.doc(documentPath)
      .get()
      .then((doc) => {
        entity.value = doc.data() as firebase.firestore.DocumentData;
      })
      .catch((e) => console.log(e));

    const add = (code) => {
      store.add(code);
      router.push("/");
    };

    return { entity, add, back: () => router.push("/") };
  },
});
</script>