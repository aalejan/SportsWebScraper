// types/PlayerType.ts

interface PlayerType {
  name: string | null;
  pos: string | null;
  age: number | null;
  G: number | null;
  PA: number | null;
  AB: number | null;
  R: number | null;
  H: number | null;
  doubles: number | null;
  triples: number | null;
  HR: number | null;
  RBI: number | null;
  SB: number | null;
  CS: number | null;
  BB: number | null;
  SO: number | null;
  battingAvg: number | null;
  onbasePerc: number | null;
  sluggingPerc: number | null;
  onbasePlusSlugging: number | null;
  onbasePlusSluggingPlus: number | null;
  TB: number | null;
  GIDP: number | null;
  HBP: number | null;
  SH: number | null;
  SF: number | null;
  IBB: number | null;
}

export default PlayerType;
