require("./config/mongoose");
const express = require("express");
const app = express();
const path = require("path");
const router = require("express").Router();
const productRouterV1 = require("./app/product_v1/routes");
const productRouterV2 = require("./app/product_v2/routes");

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/app.html"));
});
app.use("/", router);
app.use("/api/v1", productRouterV1);
app.use("/api/v2", productRouterV2);
app.use((req, res) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: `Resource ${req.originalUrl} not found`,
  });
});

app.listen(3000, () => {
  console.log("Server : http://localhost:3000");
});
