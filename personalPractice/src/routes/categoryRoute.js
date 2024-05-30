const router = require("express").Router();
const categoryController = require("./../controllers/categoryController");

router.get("/category", categoryController.getAllCategory);
router.post("/category", categoryController.createCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
