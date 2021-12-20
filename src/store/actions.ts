import { Commit } from "vuex";
import { initGameStatus } from "@/settings";
import { State } from "@/store/state";

export function autoGame({
  commit,
  state,
}: {
  commit: Commit;
  state: State;
}): void {
  commit("setAuto", !state.isAuto);
}

export function resetGame({ commit }: { commit: Commit }): void {
  commit("setGameStatus", initGameStatus);
  commit("setFinish", false);

  commit("updateFallingInterval", true);
  commit("clearFigures");

  commit("generateLeftFigure");

  commit("generateRightFigure");
}

export function togglePause({
  commit,
  state,
}: {
  commit: Commit;
  state: State;
}): void {
  commit("setGameStatus", !state.isPaused);
}
