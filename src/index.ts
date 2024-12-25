import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { port } from "./configs/envVars";
import { corsOptions } from "./configs/index";
import errorHandling from "./middlewares/errorHandler";

import { limiter } from "./configs/limiter";
import tokenRoutes from "./routes/tokenRoutes";
import usersRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// HTTP response headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Apply the rate limiting middleware to all requests.
app.use(limiter);
// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static("public"));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/refresh-token", tokenRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Error handling middleware
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
