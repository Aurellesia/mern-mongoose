const mongoose = require("mongoose");

mongoose.connect(
  // "mongodb://eduwork:eduwork123@localhost:27017/product_db?authSource=admin"
  process.env.MONGODB_URI
);

const db = mongoose.connection;
db.on("error", console.log.bind(console, "Koneksi mongoose error : "));
db.once("open", () => console.log("Koneksi mongoose berhasil"));
