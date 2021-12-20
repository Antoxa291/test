import { boardAngle, boardWidth } from "@/settings";
import { getLeftFiguresProportion, getRightFiguresProportion } from "@/helpers";
import { State } from "@/store/state";
import { ILeftFigure, IRightFigure } from "@/types";

export function boardBendingAngle(
  state: State,
  {
    leftSideFiguresSum,
    rightSideFiguresSum,
  }: { leftSideFiguresSum: number; rightSideFiguresSum: number }
): number {
  let angle = 0;

  if (!leftSideFiguresSum) {
    angle = boardAngle;
  } else {
    const subtraction = Math.abs(leftSideFiguresSum - rightSideFiguresSum);

    angle =
      leftSideFiguresSum > rightSideFiguresSum
        ? (subtraction / leftSideFiguresSum) * -50
        : (subtraction / rightSideFiguresSum) * 50;
  }

  return angle;
}

export function playersFigure({ playersFigure }: State): ILeftFigure[] {
  return playersFigure;
}

export function computersFigure({ computersFigure }: State): IRightFigure[] {
  return computersFigure;
}

export function isAuto({ isAuto }: State): boolean {
  return isAuto;
}

export function isBoardAngleWithinLimits(
  state: State,
  { boardBendingAngle }: { boardBendingAngle: number }
): boolean {
  return boardBendingAngle > -boardAngle && boardBendingAngle < boardAngle;
}

export function isFinish({ isFinish }: State): boolean {
  return isFinish;
}

export function isMobile(): boolean {
  return window.innerWidth <= 800;
}

export function isPaused({ isPaused }: State): boolean {
  return isPaused;
}

export function leftSideFigures({ leftSideFigures }: State): ILeftFigure[] {
  return leftSideFigures;
}

export function rightSideFigures({ rightSideFigures }: State): IRightFigure[] {
  return rightSideFigures;
}

export function leftSideFiguresSum({ leftSideFigures }: State): number {
  return getLeftFiguresProportion(leftSideFigures, true);
}

export function rightSideFiguresSum({ rightSideFigures }: State): number {
  return getRightFiguresProportion(rightSideFigures, true);
}

export function rightSideEnergy({ rightSideFigures }: State): number {
  return rightSideFigures.reduce(
    (total, current) =>
      (total += (boardWidth / 2 - current.right) * current.weight),
    0
  );
}

export function leftSideEnergy({ leftSideFigures }: State): number {
  return leftSideFigures.reduce(
    (total, current) =>
      (total += (boardWidth / 2 - current.left) * current.weight),
    0
  );
}

export function sidesEnergyDifference(
  state: State,
  {
    leftSideEnergy,
    rightSideEnergy,
  }: { leftSideEnergy: number; rightSideEnergy: number }
): number {
  return Math.abs(leftSideEnergy - rightSideEnergy);
}
