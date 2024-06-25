import Bank, { BankAttributes } from "../models/bank.model";
import { Request, Response } from "express";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Bank.findAll().then((data) => {
    res.send(data);
  });
};