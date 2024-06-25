import Sales, { SalesAttributes } from "../models/sales.model";
import Invoice, { InvoiceAttributes } from "../models/invoice.model";
import Products from "../models/product.model";
import Customer from "../models/customer.model";
import User from "../models/user.model";
import Productunit from "../models/productunit.model";
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Sales.findAll({
    attributes: { exclude: ["productId", "invoiceId"] },
    include: [
      {
        model: Invoice,
        as: "invoice",
        attributes: ["Invoice_Total_Amount"],
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["Customer_Name", "Customer_Name", "Customer_Contact"],
          },
          {
            model: User,
            as: "user",
            attributes: ["User_Username"],
          },
        ],
      },
      {
        model: Products,
        as: "product",
        attributes: ["Product_Name"],
        include: [
          {
            model: Productunit,
            as: "productunit",
            attributes: ["Productunit_Name"],
          },
        ],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const findByIdInvoice = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Sales.findAll({
    attributes: { exclude: ["productId", "invoiceId"] },
    where: { invoiceId: id },
    include: [
      {
        model: Invoice,
        as: "invoice",
        attributes: ["Invoice_Total_Amount"],
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["Customer_Name", "Customer_Name", "Customer_Contact"],
          },
          {
            model: User,
            as: "user",
            attributes: ["User_Username"],
          },
        ],
      },
      {
        model: Products,
        as: "product",
        attributes: ["Product_Name"],
        include: [
          {
            model: Productunit,
            as: "productunit",
            attributes: ["Productunit_Name"],
          },
        ],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const create = async (req: Request, res: Response) => {
  let sales: SalesAttributes[] = [];
  let sumTotal: number = 0;
  let sumQuantity: number = 0;

  if (!req.body.cart) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  req.body.cart.map((data: SalesAttributes) => {
    sumTotal = sumTotal + data.Sales_Sub_Total;
    sumQuantity = sumQuantity + data.Sales_Quantity;
  });

  const invoice: InvoiceAttributes = {
    Invoice_Amount_Tendered: req.body.invoice.Invoice_Amount_Tendered,
    Invoice_Bank_Account_Name: req.body.invoice.Invoice_Bank_Account_Name,
    Invoice_Bank_Account_Number: req.body.invoice.Invoice_Bank_Account_Number,
    Invoice_Payment_Type: req.body.invoice.Invoice_Payment_Type,
    Invoice_Sub_Total: sumQuantity,
    Invoice_Total_Amount: sumTotal,
    customerId: req.body.customerId,
    userId: req.body.userId,
  };

  const invoiceRes = await Invoice.create(invoice);

  // Create
  req.body.cart.map((data: SalesAttributes) => {
    sales.push({
      Sales_Quantity: data.Sales_Quantity,
      Sales_Unit_Price: data.Sales_Unit_Price,
      Sales_Sub_Total: data.Sales_Sub_Total,
      productId: data.productId,
      invoiceId: invoiceRes.id,
    });
  });

  // Save in the database
  const salesRes = await Sales.bulkCreate(sales);
  Promise.all(
    salesRes.map(async (res) => {
      await Products.update(
        {
          Product_Stock: Sequelize.literal(
            `Product_Stock - ${res.Sales_Quantity}`
          ),
        },
        {
          where: {
            id: res.productId,
          },
        }
      );
    })
  )
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
