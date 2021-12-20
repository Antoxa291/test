import { initGameStatus, maxFallingInterval } from "@/settings";
import { ILeftFigure, IRightFigure } from "@/types";

export interface State {
  playersFigure: ILeftFigure[];
  computersFigure: IRightFigure[];
  fallingInterval: number;
  isAuto: boolean;
  isPaused: boolean;
  isFinish: boolean;
  isMobile: boolean;
  leftSideFigures: ILeftFigure[];
  rightSideFigures: IRightFigure[];
}

export const state = {
  playersFigure: [],
  computersFigure: [],
  fallingInterval: maxFallingInterval,
  isAuto: false,
  isPaused: initGameStatus,
  isFinish: false,
  isMobile: false,
  leftSideFigures: [],
  rightSideFigures: [],
};
