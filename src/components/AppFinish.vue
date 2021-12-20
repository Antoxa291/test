<template>
  <div class="game-over">
    <header class="pen-intro">
      <h1>Your score:</h1>
      <h2>{{ leftSideEnergy }}</h2>
    </header>
    <AppButton class="secondary" label="Try again" @click="resetGame" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import AppButton from "@/components/elements/AppButton.vue";

export default defineComponent({
  name: "GameOver",
  components: {
    AppButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["leftSideEnergy"]),
  },
  methods: {
    ...mapActions(["resetGame"]),
  },
});
</script>

<style>
#app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.game-over {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Press Start 2P";
  background-image: linear-gradient(
    68.3deg,
    rgba(245, 177, 97, 0.5) 0.4%,
    rgba(236, 54, 110, 1) 100.2%
  );
}
</style>
