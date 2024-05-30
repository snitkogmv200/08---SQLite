const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/", controller.removeAllUser);
router.delete("/:id", controller.removeUser);

module.exports = router;
