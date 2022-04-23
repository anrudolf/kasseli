<template>
  <div class="relative overflow-y-auto">
    <div class="my-wrapper absolute w-full justify-items-center">
      <template
        v-for="(favorite, idx) in props.entities"
        :key="`${idx}-${favorite.id}`"
      >
        <app-card
          v-if="!favorite.hidden"
          :label="getLabel(favorite)"
          :image-ref="getImageRef(favorite)"
          responsive
          :contain="favorite.kind === 'product'"
          @click="(ev) => clicked(favorite)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";

import appCard from "@/components/ui/Card.vue";

import { TillCatalog, TillProduct } from "@/types";

import useKasseStore from "@/store/kasse";
import useProductStore from "@/store/products";

const props = defineProps({
  entities: {
    type: Array as PropType<Array<TillCatalog | TillProduct>>,
    required: true,
  },
});

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
      router.push(`/tills/catalog?id=${fav.id}`);
      break;
    case "product":
      kasseStore.add(fav.id);
      break;
    default:
      console.log(`unknown favorite kind`);
  }
};
</script>

<style scoped>
.my-wrapper {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-auto-rows: min-content;
}

@media (min-width: 640px) {
  .my-wrapper {
    /*
    Also see:
    https://developer.mozilla.org/en-US/docs/Web/CSS/max
    https://web.dev/patterns/layout/repeat-auto-minmax/
    */
    grid-template-columns: repeat(
      auto-fit,
      minmax(clamp(6rem, 20vh, 10rem), 1fr)
    );
  }
}
</style>
