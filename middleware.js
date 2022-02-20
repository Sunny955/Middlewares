const express = require("express");

const app = express();

const router = express.Router();

// 1st compiled middleware(global)
router.use((req, res, next) => {
  console.log("Date is: ", new Date());
  next();
});

router.get(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    req.admin = true;
    next();
  },
  (req, res, next) => {
    console.log("Request type :", req.method);
    req.admin = false;
    next();
  },
  (req, res) => {
    res.json({
      status: true,
      admin: req.admin,
      id: req.params.id,
    });
  }
);

app.use("/", router);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
