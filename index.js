const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");


dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.S3_BUCKET);
  console.log("Database connected");
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute); 



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});