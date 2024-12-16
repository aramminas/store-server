import express from "express";
import cors from "cors";
import { port } from "./configs/envVars";
import { corsOptions } from "./configs/index";
import errorHandling from "./middlewares/errorHandler";

import usersRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";

const app = express();

//  Middlewares
app.use(express.json());
app.use(cors(corsOptions));
// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// static files directory
app.use(express.static("public"));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Error handling middleware
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
