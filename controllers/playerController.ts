import { Request, Response } from "express";
import Player from "../models/Player";

export const getAllPlayers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    res.status(500).send({ message: (err as Error).message });
  }
};
