import { UserRound, UsersRound, Check, ArrowLeft } from "lucide-react";

import styles from "./AccountTypeSelector.module.css";

const AccountTypeSelector = ({
  form,
  accountType,
  onAccountTypeChange,
  onSubmit,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const handleSelect = (type) => {
    onAccountTypeChange(type);

    setValue("accountType", type, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.heading}>
        <h1>¿Cómo vas a utilizar ServisMás?</h1>
        <p>Elegí el tipo de cuenta que querés crear.</p>
      </div>

      <input type="hidden" {...register("accountType")} />

      <div className={styles.options}>
        <button
          type="button"
          className={`${styles.option} ${
            accountType === "client" ? styles.selected : ""
          }`}
          onClick={() => handleSelect("client")}
          aria-pressed={accountType === "client"}
        >
          <span className={styles.optionIcon}>
            <UserRound size={22} />
          </span>

          <span className={styles.optionTitle}>Cliente</span>

          <span className={styles.optionDescription}>
            Buscá y contratá servicios ofrecidos por prestadores.
          </span>

          <span className={styles.selectionIndicator}>
            {accountType === "client" && <Check size={13} />}
          </span>
        </button>

        <button
          type="button"
          className={`${styles.option} ${
            accountType === "provider" ? styles.selected : ""
          }`}
          onClick={() => handleSelect("provider")}
          aria-pressed={accountType === "provider"}
        >
          <span className={styles.optionIcon}>
            <UsersRound size={22} />
          </span>

          <span className={styles.optionTitle}>Prestador de servicios</span>

          <span className={styles.optionDescription}>
            Publicá tus servicios y conectá con nuevos clientes.
          </span>

          <span className={styles.selectionIndicator}>
            {accountType === "provider" && <Check size={13} />}
          </span>
        </button>
      </div>

      {errors.accountType && (
        <p className={styles.errorMessage} role="alert">
          {errors.accountType.message}
        </p>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        Crear cuenta <Check size={16} />
      </button>

      <button type="button" className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={13} />
        Volver
      </button>
    </form>
  );
};

export default AccountTypeSelector;
