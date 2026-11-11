import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  personalDataSchema,
  accountTypeSchema,
} from "./validation/registerSchema";

import RegisterHeader from "./components/RegisterHeader/RegisterHeader";
import PersonalDataForm from "./components/PersonalDataForm/PersonalDataForm";
import AccountTypeSelector from "./components/AccountTypeSelector/AccountTypeSelector";

import styles from "./Register.module.css";

import { useAuth } from "../../../app/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerAccount } = useAuth();

  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState(null);
  const [accountType, setAccountType] = useState("client");

  const personalDataForm = useForm({
    resolver: zodResolver(personalDataSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const accountTypeForm = useForm({
    resolver: zodResolver(accountTypeSchema),
    mode: "onChange",
    defaultValues: {
      accountType: "client",
    },
  });

  const handlePersonalDataSubmit = (data) => {
    setPersonalData(data);
    setStep(2);
  };

  const handleAccountTypeSubmit = async (data) => {
    const registrationData = {
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      email: personalData.email,
      password: personalData.password,
      accountType: data.accountType,
    };

    try {
      // Crear cuenta e iniciar sesión automáticamente
      const user = await registerAccount(registrationData);

      toast.success("¡Tu cuenta se creó correctamente!");

      // Redirigir según el tipo de cuenta
      const redirectPath =
        user.accountType === "provider" ? "/app/prestador" : "/app/cliente";

      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(
        error.message || "No se pudo crear la cuenta. Intentá nuevamente.",
      );
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <main className={styles.registerPage}>
      <header className={styles.topBar}>
        <a href="/" className={styles.brand} aria-label="ServisMás - Inicio">
          <span className={styles.brandIcon}>⌂</span>
          <span>
            Servis<span>Más</span>
          </span>
        </a>

        <a href="/" className={styles.backToHome}>
          ← Volver al inicio
        </a>
      </header>

      <section className={styles.registerContent}>
        <RegisterHeader step={step} />

        <div className={styles.registerCard}>
          {step === 1 ? (
            <PersonalDataForm
              form={personalDataForm}
              onSubmit={handlePersonalDataSubmit}
            />
          ) : (
            <AccountTypeSelector
              form={accountTypeForm}
              accountType={accountType}
              onAccountTypeChange={setAccountType}
              onSubmit={handleAccountTypeSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Register;
