import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  personalDataSchema,
  accountTypeSchema,
} from "./validation/registerSchema";

import RegisterHeader from "./components/RegisterHeader/RegisterHeader";
import PersonalDataForm from "./components/PersonalDataForm/PersonalDataForm";
import AccountTypeSelector from "./components/AccountTypeSelector/AccountTypeSelector";

import styles from "./Register.module.css";

const Register = () => {
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

  const handleAccountTypeSubmit = (data) => {
    const registrationData = {
      ...personalData,
      ...data,
    };

    console.log("Datos del registro:", registrationData);

    // Enviar datos al backend
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
