const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const express = require("express");
const PORT = process.env.PORT;
const cors = require("cors");
const appRouter = require("./src/routers");
const { ErrorNotFound } = require("./src/utils/errorHandlers");
const { errorResp } = require("./src/utils/responseHandlers");
const notFound = require("./src/middlewares/notFound");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(appRouter);

// Error Handling Middleware
app.use(notFound);

app.use((err, req, res, next) => {
  if (err instanceof ErrorNotFound) {
    return res.status(err.code || 404).json(errorResp(err.message));
  }
});

// Default Error Handling Middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  return res.status(err.status || 500).json(errorResp("Something Went Wrong!"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
