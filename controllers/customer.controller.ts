import Customer, { CustomerAttributes } from "../models/customer.model";
import { Request, Response } from "express";

// Retrieve all from the database.
export const findAll = async (req: Request, res: Response) => {
  await Customer.findAll().then((data) => {
    res.send(data);
  });
};

export const findOne = async (req: Request, res: Response) => {
  const Customer_Name = req.params.name;
  await Customer.findOne({
    where: { Customer_Name: Customer_Name },
  }).then((data) => {
    res.send(data);
  });
};

export const findById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Customer.findByPk(id).then((data) => {
    res.send(data);
  });
};

export const create = async (req: Request, res: Response) => {
  // return console.log(req);
  if (!req.body.Customer_Name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create
  const customer: CustomerAttributes = {
    Customer_Name: req.body.Customer_Name,
    Customer_Address: req.body.Customer_Address,
    Customer_Code: req.body.Customer_Code,
    Customer_Contact: req.body.Customer_Contact,
    
  };
  // Save in the database
  await Customer.create(customer)
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
