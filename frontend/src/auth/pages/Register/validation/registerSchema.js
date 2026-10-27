import { z } from "zod";

export const personalDataSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(50, "El nombre no puede superar los 50 caracteres."),

    lastName: z
      .string()
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres.")
      .max(50, "El apellido no puede superar los 50 caracteres."),

    email: z
      .string()
      .trim()
      .email("Ingresá un email válido.")
      .max(254, "El email es demasiado largo."),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .max(128, "La contraseña no puede superar los 128 caracteres.")
      .regex(/[A-Z]/, "Incluí al menos una letra mayúscula.")
      .regex(/[a-z]/, "Incluí al menos una letra minúscula.")
      .regex(/[0-9]/, "Incluí al menos un número.")
      .regex(
        /[^A-Za-z0-9]/,
        "Incluí al menos un carácter especial, por ejemplo: ! @ # $ %.",
      ),

    confirmPassword: z.string().min(1, "Confirmá tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const accountTypeSchema = z.object({
  accountType: z.enum(["client", "provider"], {
    message: "Seleccioná un tipo de cuenta.",
  }),
});
