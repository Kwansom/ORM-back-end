const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("<h1> Welcome to the E-Commerce API!</h1>");
});

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
