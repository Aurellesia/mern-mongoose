const { MongoClient } = require("mongodb");

const url =
  // "mongodb://eduwork:eduwork123@localhost:27017/product_db?authSource=admin";
  process.env.MONGODB_URI;
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
