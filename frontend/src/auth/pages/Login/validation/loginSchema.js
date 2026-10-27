import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu email.")
    .email("Ingresá un email válido.")
    .max(254, "El email es demasiado largo."),

  password: z
    .string()
    .min(1, "Ingresá tu contraseña.")
    .max(128, "La contraseña es demasiado larga."),
});