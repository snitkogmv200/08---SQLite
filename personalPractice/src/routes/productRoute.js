const router = require("express").Router();
const productController = require("./../controllers/productController");

router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.get(
  "/product/category/:categoryId",
  productController.getProductsByCategoryId
);
router.post("/product", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
