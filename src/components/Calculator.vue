<template>
  <div class="wrapper">
    <input
      v-model="reg"
      class="input font-bold text-2xl text-right font-mono"
      style="grid-area: reg; border-width: 4px"
      @keyup.enter="enterKeyboard"
    />

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

    <button
      class="btn btn-blue text-3xl"
      style="grid-area: minus"
      @click="append('-')"
    >
      −
    </button>
    <button
      class="btn btn-blue text-3xl"
      style="grid-area: plus"
      @click="append('+')"
    >
      +
    </button>
    <button
      class="btn btn-blue text-3xl"
      style="grid-area: mul"
      @click="append('*')"
    >
      ×
    </button>
    <button
      class="btn btn-blue text-2xl"
      style="grid-area: div"
      @click="append('/')"
    >
      ÷
    </button>
    <button class="btn btn-blue text-xl" style="grid-area: del" @click="del">
      ⌫
    </button>

    <button
      class="btn btn-blue text-3xl"
      style="grid-area: enter"
      @click="enter"
    >
      ↵
    </button>

    <button class="btn btn-red" style="grid-area: ac" @click="clear">AC</button>
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
import { ref, defineProps, defineEmits } from "vue";
import mexp from "math-expression-evaluator";

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

const reg = ref("");
const payable = ref(false);

const append = (c: string) => {
  payable.value = false;
  reg.value += c;
};

const clear = () => {
  emits("update:paid", 0);
  reg.value = "";
  payable.value = false;
};

const del = () => {
  const oldVal = reg.value;
  const newVal = oldVal.substring(0, oldVal.length - 1);
  reg.value = newVal;
  payable.value = false;
};

const enter = () => {
  const val = reg.value.toString();

  try {
    const result = mexp.eval(val);
    reg.value = Number(result).toFixed(2).toString();
    payable.value = true;
  } catch (error) {
    console.log(error);
  }
};

const enterKeyboard = () => {
  if (payable.value) {
    pay();
    return;
  }
  enter();
};

const pay = () => {
  emits("update:paid", props.paid + Number(reg.value));
  reg.value = "";
  payable.value = false;
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 4.5rem) 5.5rem;
  grid-template-rows: 3.5rem repeat(6, 4.5rem);
  grid-gap: 0.25rem;
  grid-template-areas:
    "reg reg reg reg"
    "del div mul minus"
    "seven eight nine plus"
    "four five six plus"
    "one two three enter"
    "zero zero dot enter"
    "ac pay pay pay";
}

.btn-icon {
  @apply w-6 h-6 m-auto;
}
</style>
