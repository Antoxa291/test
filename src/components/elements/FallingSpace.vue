<template>
  <div class="falling-space">
    <FigureComponent
      v-for="figure in playersFigure"
      :key="figure.id"
      :figure="figure"
      :id="`figureId-${figure.id}`"
    />
    <FigureComponent
      v-for="figure in computersFigure"
      :key="figure.id"
      :figure="figure"
      :id="`figureId-${figure.id}`"
      :is-right-side="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import FigureComponent from "@/components/elements/FigureComponent.vue";
import { boardWidth, energyDifferenceLimit, initGameStatus } from "@/settings";

export default defineComponent({
  name: "FallingSpace",
  components: {
    FigureComponent,
  },
  data() {
    return {
      figureBottomLimit: 0,
      timerId: 0,
    };
  },
  computed: {
    ...mapGetters([
      "isAuto",
      "boardBendingAngle",
      "isBoardAngleWithinLimits",
      "leftSideEnergy",
      "rightSideEnergy",
      "sidesEnergyDifference",
    ]),
    ...mapState([
      "fallingInterval",
      "playersFigure",
      "computersFigure",
      "isPaused",
    ]),
    playersFigureEl(): HTMLElement | null {
      const { id } = this.playersFigure[0];

      return document.getElementById(`figureId-${id}`);
    },
    computersFigureEl(): HTMLElement | null {
      const { id } = this.computersFigure[0];

      return document.getElementById(`figureId-${id}`);
    },
  },
  mounted() {
    const boardEl = document.querySelector(`.teeter-totter__board`);
    boardEl?.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFallingFigure);
  },
  watch: {
    isAuto: {
      handler(newVal) {
        if (newVal) {
          window.removeEventListener("keydown", this.moveFallingFigure);
        } else {
          window.addEventListener("keydown", this.moveFallingFigure);
        }
      },
    },
    isPaused: {
      handler(newVal) {
        if (newVal) {
          clearInterval(this.timerId);
        } else {
          this.getFigureBottomLimit();
          this.animateFigure();
        }
      },
    },
    sidesEnergyDifference: {
      handler(newVal) {
        if (newVal > energyDifferenceLimit) {
          this.setGameStatus(initGameStatus);
          this.setFinish(true);
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      "addLeftSideFigures",
      "addRightSideFigures",
      "generateLeftFigure",
      "generateRightFigure",
      "moveFigure",
      "setFinish",
      "setGameStatus",
      "setGameStatus",
      "toggleModal",
      "updateFallingInterval",
    ]),
    animateFigure(): void {
      const speedPitch = 1;
      this.timerId = setInterval(() => {
        let playersFigure = this.playersFigure?.[0];
        let computersFigure = this.computersFigure?.[0];

        if (playersFigure) {
          if (playersFigure.top >= this.figureBottomLimit) {
            const leftSideFigure = this.playersFigure.shift();
            clearInterval(this.timerId);
            this.addLeftSideFigures(leftSideFigure);
            this.generateLeftFigure();
            this.animateFigure();
          } else {
            playersFigure.top = playersFigure.top + speedPitch;
            if (this.playersFigureEl)
              this.playersFigureEl.style.top = `${playersFigure.top}px`;
          }
        }

        if (computersFigure) {
          if (computersFigure.top >= this.figureBottomLimit) {
            const rightSideFigure = this.computersFigure.shift();
            clearInterval(this.timerId);
            this.addRightSideFigures(rightSideFigure);
            this.updateFallingInterval();
            this.generateRightFigure();
            this.animateFigure();
          } else {
            computersFigure.top = computersFigure.top + speedPitch;
            if (this.computersFigureEl) {
              this.computersFigureEl.style.top = `${computersFigure.top}px`;
              if (this.isAuto) {
                const key = {
                  keyCode:
                    this.leftSideEnergy - this.rightSideEnergy >= 0 ? 39 : 37,
                };
                console.log(key);
                this.moveFallingFigure(key);
              }
            }
          }
        }
      }, this.fallingInterval);
    },

    getFigureBottomLimit(): void {
      const boardBounds = document
        ?.querySelector(`.teeter-totter__board`)
        ?.getBoundingClientRect();
      const panelBounds = document
        ?.querySelector(`.app-header`)
        ?.getBoundingClientRect();
      if (this.playersFigureEl) {
        const figureBounds = this.playersFigureEl.getBoundingClientRect();

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
      }
    },

    handleBoardTransitionEnd(): void {
      if (this.isPaused) return;

      if (this.isBoardAngleWithinLimits) {
        this.getFigureBottomLimit();
      } else {
        this.setGameStatus(initGameStatus);
        this.setFinish(true);
      }
    },

    moveFallingFigure({ keyCode }: { keyCode: number }): void {
      const leftArrowKey = 37;
      const rightArrowKey = 39;
      const isArrowKeyPressed: boolean = [leftArrowKey, rightArrowKey].includes(
        keyCode
      );
      if (this.isPaused || !isArrowKeyPressed) return;
      const figureWidth = this.playersFigureEl?.getBoundingClientRect().width;
      const areaWidth = document
        ?.querySelector(`.falling-space`)
        ?.getBoundingClientRect().width;
      if (areaWidth && figureWidth) {
        this.moveFigure({
          isMoveLeft: keyCode === leftArrowKey,
          width: (figureWidth / areaWidth) * 100,
        });
      }
      this.$nextTick(this.getFigureBottomLimit);
    },
  },
  beforeDestroy() {
    const boardEl = document.querySelector(`.teeter-totter__board`);
    boardEl?.removeEventListener(
      "transitionend",
      this.handleBoardTransitionEnd
    );
    window.removeEventListener("keydown", this.moveFallingFigure);
  },
});
</script>

<style lang="scss" scoped>
.falling-space {
  position: relative;
  flex: 1;
  width: 100%;
  padding-top: 60px;

  .figure {
    z-index: 5;
  }
}
</style>
