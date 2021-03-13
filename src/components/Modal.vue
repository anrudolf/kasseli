<template>
  <!-- The Modal -->
  <div
    id="myModal"
    ref="myModal"
    class="modal"
    :style="{ display: visible ? 'block' : 'none' }"
  >
    <!-- Modal content -->
    <div class="modal-content">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">
          <slot name="title">{{ title }}</slot>
        </h1>
        <span class="close" @click="$emit('close')">&times;</span>
      </div>
      <slot>Modal content</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: "Modal Title",
    },
  },
  methods: {
    onClick(ev) {
      if (ev.target === this.$refs.myModal) {
        this.$emit("close");
      }
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        document.addEventListener("click", this.onClick);
      } else {
        document.removeEventListener("click", this.onClick);
      }
    },
  },
};
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
