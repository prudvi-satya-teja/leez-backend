const express = require("express");

const router = express.Router();

const { addSpecification } = require("../controllers/specifications.controller");

router.post("/add-specification", addSpecification);

module.exports = router;