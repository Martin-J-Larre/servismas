import { useState } from "react";
import { Eye, EyeOff, UserRound, Mail, Lock, ShieldCheck } from "lucide-react";

import styles from "./PersonalDataForm.module.css";

const PersonalDataForm = ({ form, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formHeading}>
        <h1>Creá tu cuenta</h1>
        <p>Registrate en ServisMás para comenzar.</p>
      </div>

      <div className={styles.nameFields}>
        <div className={styles.field}>
          <label htmlFor="firstName">Nombre</label>

          <div
            className={`${styles.inputWrapper} ${
              errors.firstName ? styles.inputError : ""
            }`}
          >
            <UserRound size={17} aria-hidden="true" />

            <input
              id="firstName"
              type="text"
              placeholder="Tu nombre"
              autoComplete="given-name"
              {...register("firstName")}
            />
          </div>

          {errors.firstName && (
            <span className={styles.errorMessage}>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Apellido</label>

          <div
            className={`${styles.inputWrapper} ${
              errors.lastName ? styles.inputError : ""
            }`}
          >
            <UserRound size={17} aria-hidden="true" />

            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              autoComplete="family-name"
              {...register("lastName")}
            />
          </div>

          {errors.lastName && (
            <span className={styles.errorMessage}>
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>

        <div
          className={`${styles.inputWrapper} ${
            errors.email ? styles.inputError : ""
          }`}
        >
          <Mail size={17} aria-hidden="true" />

          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            autoComplete="email"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Contraseña</label>

        <div
          className={`${styles.inputWrapper} ${
            errors.password ? styles.inputError : ""
          }`}
        >
          <Lock size={17} aria-hidden="true" />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Creá una contraseña"
            autoComplete="new-password"
            {...register("password")}
          />

          <button
            type="button"
            className={styles.visibilityButton}
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Confirmar contraseña</label>

        <div
          className={`${styles.inputWrapper} ${
            errors.confirmPassword ? styles.inputError : ""
          }`}
        >
          <Lock size={17} aria-hidden="true" />

          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repetí tu contraseña"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          <button
            type="button"
            className={styles.visibilityButton}
            onClick={() => setShowConfirmPassword((visible) => !visible)}
            aria-label={
              showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <span className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        Continuar <span aria-hidden="true">→</span>
      </button>

      <p className={styles.privacyNotice}>
        <span aria-hidden="true"><ShieldCheck size={14} /></span>
        Tu información será utilizada para crear y gestionar tu cuenta en
        ServisMás.
      </p>

      <div className={styles.formFooter}>
        <p>
          ¿Ya tenés una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </form>
  );
};

export default PersonalDataForm;
