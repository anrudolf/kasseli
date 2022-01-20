<template>
  <h1>Profile</h1>
  <div v-if="store.user != null">
    Signed in
    <div>{{ store.user.uid }} -- {{ store.user.email }}</div>
  </div>
  <button class="btn btn-blue" @click="signOut">Sign out</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

import useAuthStore from "@/store/auth";

export default defineComponent({
  setup() {
    const router = useRouter();

    const store = useAuthStore();

    const signOut = () => {
      getAuth().signOut();
      router.push("/signin");
    };

    return { signOut, store };
  },
});
</script>
