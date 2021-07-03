<template>
  <div class="relative overflow-y-auto">
    <div class="my-wrapper absolute w-full">
      <template
        v-for="(favorite, idx) in entities"
        :key="`${idx}-${favorite.id}`"
      >
        <app-card
          v-if="!favorite.hidden"
          :label="getLabel(favorite)"
          :imageRef="getImageRef(favorite)"
          @click="(ev) => clicked(favorite)"
          responsive
          :contain="favorite.kind === 'product'"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appCard from "@/components/Card.vue";

import { TillCatalog, TillProduct } from "@/types";

import useKasseStore from "@/store/kasse";
import useProductStore from "@/store/products";

export default defineComponent({
  name: "KasseCatalogs",
  components: {
    appCard,
  },
  props: {
    entities: {
      type: Array,
    },
  },
  setup() {
    const router = useRouter();

    const kasseStore = useKasseStore();
    const productStore = useProductStore();

    const getLabel = (fav: TillCatalog | TillProduct) => {
      switch (fav.kind) {
        case "catalog":
          return fav.label.de;
        case "product": {
          const product = productStore.item(fav.id);
          if (product) {
            return product.label.de;
          }
          return "???";
        }
        default:
          return "???";
      }
    };

    const getImageRef = (fav: TillCatalog | TillProduct) => {
      switch (fav.kind) {
        case "catalog":
          return fav.imageRef;
        case "product": {
          const product = productStore.item(fav.id);
          if (product) {
            return product.imageRef;
          }
          return null;
        }
        default:
          return null;
      }
    };

    const clicked = (fav: TillCatalog | TillProduct) => {
      switch (fav.kind) {
        case "catalog":
          router.push(`/till-catalog?id=${fav.id}`);
          break;
        case "product":
          kasseStore.add(fav.id);
          break;
        default:
          console.log(`unknown favorite kind`);
      }
    };

    return { router, getImageRef, getLabel, clicked };
  },
});
</script>

<style scoped>
.my-wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  grid-auto-rows: min-content;
}

@media (min-width: 640px) {
  .my-wrapper {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
}
</style>>


