<template>
  <!-- The overlay -->
  <div id="myNav" class="overlay">
    <!-- Button to close the overlay navigation -->
    <a
      href="javascript:void(0)"
      :tabindex="tabindex"
      class="closebtn"
      @click="closeMenu()"
      >&times;</a
    >

    <!-- Overlay content -->
    <div class="overlay-content uppercase" @click="closeMenu">
      <router-link to="/" :tabindex="tabindex">Home</router-link>
      <router-link to="/products" :tabindex="tabindex">Products</router-link>
      <router-link to="/tills" :tabindex="tabindex">Tills</router-link>
      <router-link to="/widget-groups" :tabindex="tabindex"
        >Widgets</router-link
      >
      <router-link to="/about" :tabindex="tabindex">About</router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const menu = computed(() => store.getters["ui/menu"]);
    const tabindex = computed(() => {
      if (menu.value) {
        return 0;
      }

      return -1;
    });

    return {
      closeMenu: () => store.dispatch("ui/closeMenu"),
      openMenu: () => store.dispatch("ui/openMenu"),
      log: (s) => console.log(s),
      tabindex,
    };
  },
};
</script>

<style scoped>
/* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  right: 0;
  top: 0;
  /*background-color: rgb(255, 102, 0);*/ /* Black fallback color */
  /*background-color: rgba(255, 102, 0, 0.9);*/ /* Black w/opacity */
  background-color: rgb(255, 255, 255); /* White fallback color */
  /*background-color: rgba(255, 255, 255, 0.9);*/ /* White w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 300;
  /*color: #818181;*/
  color: rgba(51, 51, 51);
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover,
.overlay a:focus {
  /*color: #f1f1f1;*/
  color: rgba(255, 102, 0);
}

/* Position the close button (top right corner) */
.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 20px;
  }
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
</style>