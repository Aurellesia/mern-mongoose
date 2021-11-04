const mongoose = require("mongoose");

mongoose.connect(
  // "mongodb://eduwork:eduwork123@localhost:27017/product_db?authSource=admin"
  "mongodb+srv://eduwork:eduwork123@product-cluster.cowyd.mongodb.net/product_db?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.log.bind(console, "Koneksi mongoose error : "));
db.once("open", () => console.log("Koneksi mongoose berhasil"));
