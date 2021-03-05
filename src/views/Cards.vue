<template>
  <div class="p-4">
    <h1 class="text-2xl">Cards</h1>
    <ul>
      <li v-for="card in cards" :key="card.id" class="border my-2 p-2">
        <h3>{{ card.label.de }}</h3>
        <div>{{ card }}</div>
        <img v-if="card.image" :src="card.image" />
        <router-link :to="`/cards/edit?id=${card.id}`">Edit</router-link>
      </li>
      <router-link class="border rounded p-2" to="/cards/new">ADD</router-link>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default {
  setup() {
    const cards = ref([]);

    useFirestoreCollectionSnapshot("cards", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      cards.value = [];
      cards.value.push(...tmp);
    });

    return { cards };
  },
};
</script>