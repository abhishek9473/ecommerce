const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const { authUser, authAdmin } = require("../middleware/auth");

// //               -----------------------------------------------
// //   ######---->|     All router start from "/product" here    |<----######
// //               -----------------------------------------------

// // example :: https://localhost:3000/product/...

productRouter.get("/all", productController.allProducts);
productRouter.get("/:id", productController.singleProductbyId);
productRouter.get("/category/:id", productController.ProductsByCategory);

productRouter.post("/add", authAdmin, productController.addProduct);
productRouter.put("/update/:id", authAdmin, productController.updateProduct);
productRouter.delete("/delete/:id", authAdmin, productController.deleteProduct);

module.exports = productRouter;
