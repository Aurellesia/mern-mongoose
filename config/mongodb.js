const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://eduwork:eduwork123@product-cluster.cowyd.mongodb.net/product_db?retryWrites=true&w=majority";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log(`Koneksi mongodb native berhasil`);
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("product_db");

module.exports = db;
