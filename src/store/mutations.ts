import {
  boardWidth,
  maxFallingInterval,
  maxWeight,
  minFallingInterval,
  minWeight,
  scaleRatio,
} from "@/settings";
import { generateRGBAColor, generateInt, getID } from "@/helpers";
import { State } from "@/store/state";
import { ILeftFigure, IRightFigure, FigureType } from "@/types";

export function addLeftSideFigures(state: State, figure: ILeftFigure): void {
  state.leftSideFigures.push(figure);
}

export function addRightSideFigures(state: State, figure: IRightFigure): void {
  state.rightSideFigures.push(figure);
}
export function clearFigures(state: State): void {
  state.leftSideFigures = [];
  state.rightSideFigures = [];
  state.playersFigure = [];
  state.computersFigure = [];
}

export function generateLeftFigure(state: State): void {
  const color = generateRGBAColor();
  const id = getID();
  const left = generateInt(0, 40);
  const top = 0;
  const typesArray = [
    FigureType.Circle,
    FigureType.Square,
    FigureType.Triangle,
  ];
  const type = typesArray[generateInt(0, typesArray.length)];
  const weight = generateInt(minWeight, maxWeight);
  const scale = 1 + scaleRatio * weight;
  const figure: ILeftFigure = { id, color, left, scale, top, type, weight };

  state.playersFigure.push(figure);
}
export function generateRightFigure(state: State): void {
  const color = generateRGBAColor();
  const id = getID();
  const right = generateInt(0, 40);
  const top = 0;
  const typesArray = [
    FigureType.Circle,
    FigureType.Square,
    FigureType.Triangle,
  ];
  const type = typesArray[generateInt(0, typesArray.length)];
  const weight = generateInt(minWeight, maxWeight);
  const scale = 1 + scaleRatio * weight;
  const figure: IRightFigure = { id, color, right, scale, top, type, weight };

  state.computersFigure.push(figure);
}

export function moveFigure(
  { playersFigure }: State,
  { isMoveLeft, width }: { isMoveLeft: boolean; width: number }
): void {
  const [figure] = playersFigure;
  if (!figure.left) {
    return;
  }
  const ratio = 3;
  const canMoveLeft = figure.left - ratio >= 0;
  const canMoveRight = figure.left + width + ratio <= boardWidth / 2;

  if (isMoveLeft) {
    canMoveLeft && (figure.left = figure.left - ratio);
  } else {
    canMoveRight && (figure.left = figure.left + ratio);
  }
}

export function updateFallingInterval(state: State, isReset = false): void {
  if (isReset) {
    state.fallingInterval = maxFallingInterval;
  } else if (state.fallingInterval > minFallingInterval) {
    state.fallingInterval--;
  }
}

export function setAuto(state: State, autoGame = false): void {
  state.isAuto = autoGame;
}

export function setGameStatus(state: State, isPaused: boolean): void {
  state.isPaused = isPaused;
}

export function setFinish(state: State, isFinish = false): void {
  state.isFinish = isFinish;
}
