const { ObjectId } = require("bson");
const path = require("path");
const fs = require("fs");
const db = require("../../config/mongodb");

const index = async (req, res) => {
  try {
    const result = await db.collection("products").find().toArray();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .collection("products")
      .findOne({ _id: ObjectId(id) });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const store = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let result = {};
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      result = await db.collection("products").insertOne({
        name,
        price: parseInt(price),
        stock: parseInt(stock),
        status: Boolean(status),
        image_url: `https://mern-restapi-mongodb.herokuapp.com/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  } else {
    try {
      result = await db.collection("products").insertOne({
        name,
        price: parseInt(price),
        stock: parseInt(stock),
        status: Boolean(status),
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let result = {};
  try {
    if (image) {
      const target = path.join(__dirname, "../../uploads", image.originalname);
      fs.renameSync(image.path, target);
      result = await db.collection("products").updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            price: parseInt(price),
            stock: parseInt(stock),
            status: Boolean(status),
            image_url: `https://mern-restapi-mongodb.herokuapp.com/public/${image.originalname}`,
          },
        }
      );
      res.send(result);
    } else {
      result = await db.collection("products").updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            price: parseInt(price),
            stock: parseInt(stock),
            status: Boolean(status),
          },
        }
      );
      res.send(result);
    }
  } catch (e) {
    res.send(e);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .collection("products")
      .deleteOne({ _id: ObjectId(id) });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
module.exports = { index, store, view, update, destroy };
