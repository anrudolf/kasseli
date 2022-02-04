<template>
  <div class="p-4 max-w-lg">
    <div v-if="!id">
      <h1>Bezahlen</h1>
      <h2 v-if="!scanning">Code eingeben</h2>
      <div v-if="!scanning" class="flex items-center my-2">
        <input v-model="code" class="input" type="number" />
        <button
          class="btn btn-blue ml-2"
          @click="router.push(`/pay?id=${code}`)"
        >
          OK
        </button>
      </div>

      <div v-if="scanning" class="mt-8 h-64 w-full">
        <qrcode-stream v-if="scanning" @decode="onScan" />
      </div>

      <button
        class="
          mt-4
          w-full
          text-xl
          btn btn-blue
          flex
          justify-center
          items-center
        "
        @click="scanning = !scanning"
      >
        <qrcode-icon class="w-8 h-8 mr-2" />
        SCAN
      </button>
    </div>
    <div v-else>
      <h1 class="my-2">Zahlung #{{ id }}</h1>
      <div v-if="error">
        <h2>Keine Zahlung gefunden</h2>
        <button class="my-2 w-full btn btn-blue" @click="router.push('/pay')">
          Neue Zahlung
        </button>
      </div>
      <div v-if="entity">
        <div v-if="entity.status == 'paid'">
          <h2>Zahlung erhalten</h2>
          <button class="my-2 w-full btn btn-blue" @click="router.push('/pay')">
            Neue Zahlung
          </button>
        </div>
        <div v-else-if="entity.status == 'rejected'">
          <h2>Zahlung abgelehnt</h2>
          <button class="my-2 w-full btn btn-blue" @click="router.push('/pay')">
            Neue Zahlung
          </button>
        </div>
        <div v-else>
          <h2>Bitte bestätigen Sie die Zahlung von</h2>
          <div class="my-4 p-4 text-center text-3xl bg-gray-200 rounded">
            {{ entity.amount.toFixed(2) }} CHF
          </div>
          <button
            class="
              my-2
              w-full
              btn btn-red
              text-xl
              flex
              justify-center
              items-center
            "
            :disabled="entity.status !== 'open'"
            @click="() => setStatus(id, 'reject')"
          >
            <x-circle-icon
              class="w-8 h-8 inline mr-2"
              :class="{ 'animate-spin': entity.status === 'reject' }"
            />
            <span>Ablehnen</span>
          </button>
          <button
            class="w-full btn btn-blue text-xl flex justify-center items-center"
            :disabled="entity.status !== 'open'"
            @click="() => setStatus(id, 'pay')"
          >
            <check-circle-icon
              class="w-8 h-8 inline mr-2"
              :class="{ 'animate-spin': entity.status === 'pay' }"
            />
            <span>Bestätigen</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import {
  XCircleIcon,
  CheckCircleIcon,
  QrcodeIcon,
} from "@heroicons/vue/outline";

import { QrcodeStream } from "vue3-qrcode-reader";

import useAppPayment from "@/hooks/use-app-payment";

export default defineComponent({
  components: {
    QrcodeStream,
    XCircleIcon,
    CheckCircleIcon,
    QrcodeIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();

    const code = ref("");

    const scanning = ref(false);
    const onScan = (decodedString) => {
      scanning.value = false;

      const splits = decodedString.split("id=");
      if (splits.length == 2) {
        code.value = splits[1];
        router.push(`/pay?id=${code.value}`);
      }
    };

    const { entity, setStatus, error, listenForChanges } = useAppPayment(
      props.id
    );

    if (props.id) {
      listenForChanges(props.id);
    }

    return {
      scanning,
      onScan,
      router,
      code,
      location: window.location.origin,
      entity,
      setStatus,
      error,
    };
  },
});
</script>
<style scoped></style>
