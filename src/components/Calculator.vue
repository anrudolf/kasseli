<template>
  <div class="w-32">
    <input v-model="line" class="input" />
    Total {{ props.price.toFixed(2) }}<br />
    Bezahlt {{ paid.toFixed(2) }}<br />
    Remaining {{ remainder.toFixed(2) }}
  </div>
  <div class="wrapper">
    <button class="btn btn-gray" style="grid-area: seven" @click="append('7')">
      7
    </button>
    <button class="btn btn-gray" style="grid-area: eight" @click="append('8')">
      8
    </button>
    <button class="btn btn-gray" style="grid-area: nine" @click="append('9')">
      9
    </button>

    <button class="btn btn-gray" style="grid-area: four" @click="append('4')">
      4
    </button>
    <button class="btn btn-gray" style="grid-area: five" @click="append('5')">
      5
    </button>
    <button class="btn btn-gray" style="grid-area: six" @click="append('6')">
      6
    </button>

    <button class="btn btn-gray" style="grid-area: one" @click="append('1')">
      1
    </button>
    <button class="btn btn-gray" style="grid-area: two" @click="append('2')">
      2
    </button>
    <button class="btn btn-gray" style="grid-area: three" @click="append('3')">
      3
    </button>

    <button class="btn btn-gray" style="grid-area: zero" @click="append('0')">
      0
    </button>
    <button class="btn btn-gray" style="grid-area: dot" @click="append('.')">
      .
    </button>

    <button class="btn btn-blue" style="grid-area: minus" @click="append('-')">
      -
    </button>
    <button class="btn btn-blue" style="grid-area: plus" @click="append('+')">
      +
    </button>
    <button class="btn btn-blue" style="grid-area: mul" @click="append('*')">
      *
    </button>
    <button class="btn btn-blue" style="grid-area: div" @click="append('/')">
      /
    </button>
    <button class="btn btn-red" style="grid-area: del" @click="del">
      <arrow-left-icon class="btn-icon"></arrow-left-icon>
    </button>

    <button
      class="btn btn-blue text-3xl"
      style="grid-area: equal"
      @click="equal"
    >
      ↵
    </button>

    <button class="btn btn-blue" style="grid-area: clear" @click="clear">
      CLEAR
    </button>
    <button
      class="btn btn-green"
      style="grid-area: pay"
      :disabled="!payable"
      @click="pay"
    >
      BEZAHLEN
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import mexp from "math-expression-evaluator";
import { ArrowLeftIcon } from "@heroicons/vue/solid";

const props = defineProps({
  price: {
    type: Number,
    default: 0,
  },
  paid: {
    type: Number,
    default: 0,
  },
  remainder: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits<{
  (e: "update:paid", v: number): void;
}>();

const line = ref("0");
const payable = ref(false);

const remainder = computed(() => {
  const ret = props.price - props.paid;
  if (ret < 0.05 / 10) {
    return 0;
  }
  return ret;
});

const append = (c: string) => {
  payable.value = false;
  if (line.value == "0") {
    line.value = c;
    return;
  }
  line.value += c;
};

const clear = () => {
  emits("update:paid", 0);
  line.value = "";
  payable.value = false;
};

const del = () => {
  const oldVal = line.value;
  const newVal = oldVal.substring(0, oldVal.length - 1);
  line.value = newVal;
  payable.value = false;
};

const equal = () => {
  const val = line.value.toString();

  try {
    const result = mexp.eval(val);
    line.value = Number(result).toFixed(2).toString();
    payable.value = true;
  } catch (error) {
    console.log(error);
  }
};

const pay = () => {
  //paid.value += Number(line.value);
  emits("update:paid", props.paid + Number(line.value));
  line.value = "";
  payable.value = false;
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 4.5rem) 5.5rem;
  grid-template-rows: repeat(6, 4.5rem);
  grid-gap: 0.25rem;
  grid-template-areas:
    "del div mul minus"
    "seven eight nine plus"
    "four five six plus"
    "one two three equal"
    "zero zero dot equal"
    "clear pay pay pay";
}

.btn-icon {
  @apply w-6 h-6 m-auto;
}
</style>
