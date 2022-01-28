const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:table_id/seat").put(controller.updateToSeated).put(controller.update).delete(controller.destroy).all(methodNotAllowed)

module.exports = router;
