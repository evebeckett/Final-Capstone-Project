const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:reservation_id").get(controller.validateReservationId).all(methodNotAllowed);


module.exports = router;
