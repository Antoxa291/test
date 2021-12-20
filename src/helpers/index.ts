import { boardWidth } from "@/settings";
import { ILeftFigure, IRightFigure } from "@/types";

let figureId = 0;

export function generateRGBAColor(): string {
  const alpha = 0.9;
  const maxNum = 256;

  return `rgb(${generateInt(0, maxNum)}, ${generateInt(
    0,
    maxNum
  )}, ${generateInt(0, maxNum)}, ${alpha})`;
}

export function generateInt(min = 0, max = 1): number {
  return min + Math.floor(Math.random() * max);
}

export function getLeftFiguresProportion(
  figures: ILeftFigure[] = [],
  leftSide = false
): number {
  return figures.reduce((total, current: ILeftFigure) => {
    const left = leftSide ? boardWidth / 2 - current.left : current.left;
    total += current.weight * left;

    return total;
  }, 0);
}
export function getRightFiguresProportion(
  figures: IRightFigure[] = [],
  leftSide = false
): number {
  return figures.reduce((total, current: IRightFigure) => {
    const right = leftSide ? boardWidth / 2 - current.right : current.right;
    total += current.weight * right;

    return total;
  }, 0);
}

export function getID(): number {
  return figureId++;
}
