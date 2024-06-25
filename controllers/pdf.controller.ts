import { Request, Response } from "express";
import Invoice from "../models/invoice.model";
import Products from "../models/product.model";
import Sales from "../models/sales.model";
import ejs from "ejs";
import html_to_pdf from "html-pdf-node";

export interface DataBillSales {
  id: number;
  Sales_Quantity: number;
  Sales_Unit_Price: number;
  Sales_Sub_Total: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  invoiceId: number;
  invoice: Invoice;
  product: Product;
}

export interface Invoice {
  Invoice_Sub_Total: number;
}

export interface Product {
  Product_Name: string;
}

export const printBillAllById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let data: DataBillSales[] = [];

  const dataSales: any = await Sales.findAll({
    where: { invoiceId: id },
    include: [
      {
        model: Invoice,
        as: "invoice",
        attributes: ["Invoice_Sub_Total"],
      },
      {
        model: Products,
        as: "product",
        attributes: ["Product_Name"],
      },
    ],
  });

  dataSales.forEach((element: any) => {
    data.push(element.dataValues);
  });

  if (data[0] === undefined) {
    return res.send({ message: "ไม่พบข้อมูล" });
  } else {
    const table = await ejs.renderFile(
      "./template/tables.html.ejs",
      { rows: data },
      { async: true }
    );

    const html = await ejs.renderFile(
      "./template/layout.html.ejs",
      { body: table },
      { async: true }
    );

    let options = { height: 500, width: 300 };
    let file = { content: html };
    html_to_pdf
      .generatePdf(file, options)
      // .then((pdfBuffer: any) => {
      //   res
      //     .writeHead(200, {
      //       "Content-Type": "application/pdf",
      //       "Content-Disposition": "acctachment",
      //     })
      //     .end(pdfBuffer);
      // })
      // .catch((err: any) => {
      //   res.send({ success: false, error: err });
      // });
  }
};
