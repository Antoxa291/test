<template>
  <div class="controls">
    <AppButton class="primary" label="Left" @click="move(true)" />
    <AppButton class="primary" label="Right" @click="move(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import AppButton from "@/components/elements/AppButton.vue";
import { boardWidth } from "@/settings";

export default defineComponent({
  name: "AppMobileControls",
  components: {
    AppButton,
  },
  data() {
    return {
      figureBottomLimit: 0,
    };
  },
  computed: {
    ...mapState(["playersFigure", "computersFigure", "isPaused"]),
    ...mapGetters(["boardBendingAngle"]),
    fallingFigureEl(): HTMLElement | null {
      const { id } = this.playersFigure[0];

      return document.getElementById(`figureId-${id}`);
    },
  },
  methods: {
    ...mapMutations(["moveFigure"]),
    move(isLeft: boolean): void {
      if (this.isPaused) return;
      const figureWidth = this.fallingFigureEl?.getBoundingClientRect().width;
      const areaWidth = document
        ?.querySelector(`.falling-space`)
        ?.getBoundingClientRect().width;
      if (areaWidth && figureWidth) {
        this.moveFigure({
          isMoveLeft: isLeft,
          width: (figureWidth / areaWidth) * 100,
        });
      }
      this.$nextTick(this.getFigureBottomLimit);
    },
    getFigureBottomLimit(): void {
      const boardBounds = document
        ?.querySelector(`.teeter-totter__board`)
        ?.getBoundingClientRect();
      const panelBounds = document
        ?.querySelector(`.app-header`)
        ?.getBoundingClientRect();
      const figureBounds = this.fallingFigureEl?.getBoundingClientRect();

      if (boardBounds) {
        const totterCathet = boardBounds.bottom - boardBounds.top;
        const similarCathet =
          (this.playersFigure[0].left * totterCathet) / boardWidth;

        if (figureBounds && panelBounds) {
          this.figureBottomLimit =
            this.boardBendingAngle >= 0
              ? boardBounds.top +
                similarCathet -
                figureBounds.height -
                panelBounds.height
              : boardBounds.bottom -
                similarCathet -
                figureBounds.height -
                panelBounds.height;
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  position: absolute;
  bottom: 20px;
  font-size: 20px;
  left: 10px;
  display: none;

  @media screen and (max-width: 667px) {
    bottom: 20px;
    display: flex;
  }

  @media (min-width: 668px) and (max-width: 1024px) {
    bottom: 150px;
    height: 60px;
    display: flex;
  }
}
</style>
