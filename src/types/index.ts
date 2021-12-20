export enum Color {
  Green = "green",
  Red = "red",
  Blue = "blue",
  Grey = "grey",
}

export interface ILeftFigure {
  color: string;
  id: number;
  left: number;
  scale: number;
  top: number;
  type: FigureType;
  weight: number;
}

export interface IRightFigure {
  color: string;
  id: number;
  right: number;
  scale: number;
  top: number;
  type: FigureType;
  weight: number;
}

export enum FigureType {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
}

export interface StatisticItems {
  [key: string]: string;
}
