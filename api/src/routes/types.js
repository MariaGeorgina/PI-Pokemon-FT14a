const { Router } = require("express");
const { getTypes } = require("./controllers");
const router = Router();

router.get("/types", getTypes);

module.exports = router;