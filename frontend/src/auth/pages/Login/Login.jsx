import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  House,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";

import { loginSchema } from "./validation/loginSchema";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = () => {
    // todo:Conectaremos el backend para la autenticación real en el futuro.

    toast.info(
      "El inicio de sesión estará disponible cuando conectemos el backend."
    );
  };

  const handleForgotPassword = () => {
    toast.info("La recuperación de contraseña estará disponible próximamente.");
  };

  return (
    <main className={styles.loginPage}>
      <header className={styles.topBar}>
        <Link
          to="/"
          className={styles.brand}
          aria-label="ServisMás - Inicio"
        >
          <span className={styles.brandIcon}>
            <House size={15} aria-hidden="true" />
          </span>

          <span>
            Servis<span className={styles.brandAccent}>Más</span>
          </span>
        </Link>

        <Link to="/" className={styles.backToHome}>
          <ArrowLeft size={12} aria-hidden="true" />
          Volver al inicio
        </Link>
      </header>

      <section className={styles.loginContent}>
        <div className={styles.loginCard}>
          <div className={styles.formHeading}>
            <h1>Iniciá sesión</h1>
            <p>Accedé a tu cuenta de ServisMás.</p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(handleLoginSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <label htmlFor="email">Email</label>

              <div
                className={`${styles.inputWrapper} ${
                  errors.email ? styles.inputError : ""
                }`}
              >
                <Mail size={15} aria-hidden="true" />

                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <span
                  id="email-error"
                  className={styles.errorMessage}
                  role="alert"
                >
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <div className={styles.passwordLabel}>
                <label htmlFor="password">Contraseña</label>

                <button
                  type="button"
                  className={styles.forgotPassword}
                  onClick={handleForgotPassword}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div
                className={`${styles.inputWrapper} ${
                  errors.password ? styles.inputError : ""
                }`}
              >
                <Lock size={15} aria-hidden="true" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  {...register("password")}
                />

                <button
                  type="button"
                  className={styles.visibilityButton}
                  onClick={() =>
                    setShowPassword((visible) => !visible)
                  }
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={15} aria-hidden="true" />
                  ) : (
                    <Eye size={15} aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span
                  id="password-error"
                  className={styles.errorMessage}
                  role="alert"
                >
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Iniciar sesión
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </form>

          <div className={styles.formFooter}>
            <p>
              ¿Todavía no tenés una cuenta?{" "}
              <Link to="/registro">Registrate</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;