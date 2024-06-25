import Category, { CategoryAttributes } from "../models/category.model";
import { Request, Response } from "express";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Category.findAll().then((data) => {
    res.send(data);
  });
};

export const create = (req: Request, res: Response) => {
  if (!req.body.Category_Name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create
  const category: CategoryAttributes = {
    Category_Name: req.body.Category_Name,
    Category_Status: true,
    Category_Description: req.body.Category_Description
  };
  // Save in the database
  Category.create(category)
    .then(() => {
      res.send({ message: "Create success" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the students.",
      });
    });
};
