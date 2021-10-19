import { Dispatch, SetStateAction } from "react";

export interface MapsProps {
  lat: number;
  lng: number;
  x: number;
  y: number;
  event: Function
}

export interface PointsProps {
  id: number;
  date: string;
  selected: boolean;
  latLng: {
    lat: number;
    lng: number;
  }
}

export interface PointsCompProps {
  points: PointsProps[];
  setPoints: Dispatch<SetStateAction<PointsProps[]>>;
  pointSelected?: PointsProps;
  setPointSelected: Dispatch<SetStateAction<any>>;
}