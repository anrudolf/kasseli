<template>
  <div class="p-4">
    <h1 class="text-2xl">Menu cards</h1>
    <ul>
      <li
        v-for="menucard in menucards"
        :key="menucard.id"
        class="border my-2 p-2"
      >
        <h3>{{ menucard.label.de }}</h3>
        <div>{{ menucard }}</div>
        <img v-if="menucard.image" :src="menucard.image" />
        <router-link :to="`/menucards/edit?id=${menucard.id}`"
          >Edit</router-link
        >
      </li>
      <router-link class="border rounded p-2" to="/menucards/new"
        >ADD</router-link
      >
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  setup() {
    const menucards = ref([]);

    useFirestoreCollectionSnapshot("menucards", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      menucards.value = [];
      menucards.value.push(...tmp);
    });

    return { menucards };
  },
};
</script>