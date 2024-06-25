import { Request, Response } from "express";
import Invoice, { InvoiceAttributes } from "../models/invoice.model";
import { Op, Sequelize } from "sequelize";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Invoice.findAll().then((data) => {
    res.send(data);
  });
};

export const findByDate = (req: Request, res: Response) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  Invoice.findAll({
    where: {
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW,
      },
    },
    attributes: {
      include: [
        [
          Sequelize.fn("SUM", Sequelize.col("Invoice_Total_Amount")),
          "Sum_Invoice_Total_Amount",
        ],
        [
          Sequelize.fn("SUM", Sequelize.col("Invoice_Sub_Total")),
          "Sum_Invoice_Sub_Total",
        ],
      ],
      exclude: [
        "id",
        "Invoice_Total_Amount",
        "Invoice_Payment_Type",
        "Invoice_Sub_Total",
        "Invoice_Amount_Tendered",
        "Invoice_Bank_Account_Name",
        "Invoice_Bank_Account_Number",
        "createdAt",
        "updatedAt",
        "customerId",
        "userId",
        "bankId",
      ],
    },
  }).then((data) => {
    res.send(data[0]);
  });
};

// Retrieve findLatesId from the database.
export const findLatestId = (req: Request, res: Response) => {
  Invoice.findOne({
    order: [["id", "DESC"]],
  }).then((data) => {
    res.send(data);
  });
};

export const create = (req: Request, res: Response) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create
  const invoice: InvoiceAttributes = {
    Invoice_Amount_Tendered: req.body.Invoice_Amount_Tendered,
    Invoice_Bank_Account_Name: req.body.Invoice_Bank_Account_Name,
    Invoice_Bank_Account_Number: req.body.Invoice_Bank_Account_Number,
    Invoice_Payment_Type: req.body.Invoice_Payment_Type,
    Invoice_Sub_Total: req.body.Invoice_Sub_Total,
    Invoice_Total_Amount: req.body.Invoice_Total_Amount,
    customerId: req.body.customerId,
    userId: req.body.userId,
  };
  // Save in the database
  Invoice.create(invoice)
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
