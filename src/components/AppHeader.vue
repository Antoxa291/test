<template>
  <header class="app-header">
    <PlayerStatistic
      :player="true"
      :statisticItems="{
        Total: `${leftSideEnergy} kg*m`,
        Current: `${currentLeftWeight} kg`,
      }"
    />
    <div class="center">
      <AppButton
        class="secondary"
        :label="isPaused ? 'Play' : 'Pause'"
        @click="togglePause"
      />
      <AppButton class="secondary" label="Reset" @click="resetGame" />
      <AppButton
        class="secondary"
        label="Auto"
        @click="autoGame"
        :isSelected="isAuto"
      />
    </div>
    <PlayerStatistic
      :statisticItems="{
        Total: `${rightSideEnergy} kg*m`,
        Current: `${currentRightWeight} kg`,
      }"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import AppButton from "@/components/elements/AppButton.vue";
import PlayerStatistic from "@/components/elements/PlayerStatistic.vue";
import { ILeftFigure } from "@/types";

export default defineComponent({
  name: "AppHeader",
  components: {
    AppButton,
    PlayerStatistic,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "isAuto",
      "isPaused",
      "playersFigure",
      "computersFigure",
      "leftSideEnergy",
      "leftSideFigures",
      "rightSideEnergy",
      "rightSideFigures",
    ]),
    currentLeftWeight(): number {
      return this.playersFigure?.[0]?.weight;
    },
    currentRightWeight(): number {
      return this.computersFigure?.[0]?.weight;
    },
    totalLeftSideFiguresWeight(): number {
      return this.getTotalWeight(this.leftSideFigures);
    },

    totalRightSideFiguresWeight(): number {
      return this.getTotalWeight(this.rightSideFigures);
    },
  },
  methods: {
    ...mapActions([
      "autoGame",
      "pauseGameTime",
      "resetGame",
      "startGameTime",
      "togglePause",
    ]),
    getTotalWeight(figures: ILeftFigure[] = []): number {
      return figures.reduce((total, current) => (total += current.weight), 0);
    },
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  width: 95%;
  font-size: 20px;
  .center {
    display: flex;
    justify-content: space-between;
    min-width: 360px;
  }

  @media screen and (max-width: 667px) {
    padding-top: 40px;
    width: 100%;
    font-size: 16px;
    .center {
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      min-width: 300px;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      .app-btn {
        min-width: 60px;
        font-size: 12px;
      }
    }
  }
}
</style>
