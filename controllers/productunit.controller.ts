import Productsunit, { ProductunitAttributes } from "../models/productunit.model";
import { Request, Response } from "express";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Productsunit.findAll().then((data) => {
    res.send(data);
  });
};

export const findById = (req: Request, res: Response) => {
  const id = req.params.id;
  Productsunit.findByPk(id).then((data) => {
    res.send(data);
  });
};

export const create = (req: Request, res: Response) => {
  if (!req.body.Productunit_Name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create
  const productunit: ProductunitAttributes = {
    Productunit_Name: req.body.Productunit_Name
  };
  // Save in the database
  Productsunit.create(productunit)
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

export const update = async (req: Request, res: Response) => {
  // Update a Tutorial by the id in the request
  const id = req.params.id;

  await Productsunit.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((number) => {
      if (number[0] === 1) {
        res.send({
          message: "Products was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

export const deleteById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Productsunit.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Products was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};
