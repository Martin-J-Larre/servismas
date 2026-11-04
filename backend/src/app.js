import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import serviceRoutes from "./routes/service.routes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/services", serviceRoutes);

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "ServisMás API funcionando correctamente",
  });
});

export default app;
