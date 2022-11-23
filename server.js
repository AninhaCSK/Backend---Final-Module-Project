import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.get("/", (req, res) => {
  res.send("Hi there!");
}); */

app.use("/users", usersRoutes);
/* app.use("/auth", usersRoutes); */

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connected and server running on port: `, PORT)
    )
  )
  .catch((error) => console.log(error));
