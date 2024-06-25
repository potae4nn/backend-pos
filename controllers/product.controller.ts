import Products, { ProductsAttributes } from "../models/product.model";
import { Request, Response } from "express";
import Category from "../models/category.model";
import Productunit from "../models/productunit.model";
import { Op } from "sequelize";
import { sequelize } from "../models";

// Retrieve all from the database.
export const findAll = (req: Request, res: Response) => {
  Products.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["Category_Name"],
      },
      {
        model: Productunit,
        as: "productunit",
        attributes: ["Productunit_Name"],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const findCount = (req: Request, res: Response) => {
  Products.count({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["Category_Name"],
      },
      {
        model: Productunit,
        as: "productunit",
        attributes: ["Productunit_Name"],
      },
    ],
  }).then((data) => {
    res.send({ count: data });
  });
};

// Retrieve By page from the database.
export const findByPage = (req: Request, res: Response) => {
  try {
    if (Number(req.query.page) > 0) {
      const COLUMN_NAME: string = String(req.query.columnname);
      const SORT: string = String(req.query.sort);
      const pageNumber: number = Number(req.query.page);
      const limit: number = Number(req.query.limit);
      let offset = limit * pageNumber - limit;
      Products.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["Category_Name"],
          },
          {
            model: Productunit,
            as: "productunit",
            attributes: ["Productunit_Name"],
          },
        ],
        order: [[COLUMN_NAME, SORT]],
        limit: limit,
        offset: offset,
      }).then((data) => {
        res.send(data);
      });
    } else {
      res.send({ message: "ไม่มีข้อมูลนี้" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const findBySearch = async (req: Request, res: Response) => {
  const searchSelect: string = String(req.query.searchSelect);
  let search: string = String(req.params.search);
  await sequelize
    .query(
      `SELECT product.id, 
        product.Product_Name,
        product.Product_Code,
        product.Product_Stock,
        product.Product_Price, 
        product.Product_Status, 
        product.Product_Description, 
        product.Product_Image, 
        product.createdAt, 
        product.updatedAt, 
        product.categoryId, 
        product.productunitId,
        category.Category_Name, 
        productunit.Productunit_Name
      FROM products AS product 
      LEFT OUTER JOIN categories AS category ON product.categoryId = category.id 
      LEFT OUTER JOIN productunits AS productunit ON product.productunitId = productunit.id
      WHERE product.${searchSelect} LIKE '%${search}%'`
    )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const findByProductName = async (req: Request, res: Response) => {
  const Product_Name = req.params.name;
  await Products.findAll({
    where: { Product_Name: { [Op.like]: `%${Product_Name}%` } },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["Category_Name"],
      },
      {
        model: Productunit,
        as: "productunit",
        attributes: ["Productunit_Name"],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const findByProductCode = async (req: Request, res: Response) => {
  const Product_Code = req.params.code;
  await Products.findAll({
    where: { Product_Code: { [Op.like]: `%${Product_Code}%` } },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["Category_Name"],
      },
      {
        model: Productunit,
        as: "productunit",
        attributes: ["Productunit_Name"],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const findById = (req: Request, res: Response) => {
  const id = req.params.id;
  Products.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: [["Category_Name", "Category_Name"]],
      },
      {
        model: Productunit,
        as: "productunit",
        attributes: [["Productunit_Name", "Productunit_Name"]],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

export const create = (req: Request, res: Response) => {
  if (!req.body.Product_Code) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create
  const product: ProductsAttributes = {
    ...req.body,
    Product_Image: req.file?.filename 
    ? req.file?.filename
    : req.body.Product_Image,
  };

  // Save in the database
  Products.create(product)
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

  const product: ProductsAttributes = {
    ...req.body,
    Product_Image: req.file?.filename
      ? req.file?.filename
      : req.body.Product_Image,
  };

  await Products.update(product, {
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
  await Products.destroy({
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
