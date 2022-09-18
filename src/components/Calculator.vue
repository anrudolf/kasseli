<template>
  <div class="w-32">
    <input v-model="line" class="input" />
    {{ total }}
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
    <button class="btn btn-blue" style="grid-area: del" @click="del">
      DEL
    </button>

    <button class="btn btn-blue" style="grid-area: equal" @click="equal">
      =
    </button>

    <button class="btn btn-blue" style="grid-area: clear" @click="clear">
      CLEAR
    </button>
    <button class="btn btn-blue" style="grid-area: pay">BEZAHLEN</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import mexp from "math-expression-evaluator";

const total = ref(0);
const line = ref("");

const append = (c: string) => {
  line.value += c;
};

const clear = () => {
  total.value = 0;
  line.value = "";
};

const del = () => {
  line.value = line.value.substring(0, line.value.length - 1);
};

const equal = () => {
  try {
    const result = mexp.eval(line.value);
    line.value = result;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 4.5rem);
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
</style>
