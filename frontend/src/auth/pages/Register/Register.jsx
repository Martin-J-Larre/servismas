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

const Register = () => {
  const navigate = useNavigate();
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

  // !Simulación temporal: todavía no se crea una cuenta real.
  console.log("Registro simulado:", {
    firstName: registrationData.firstName,
    lastName: registrationData.lastName,
    email: registrationData.email,
    accountType: registrationData.accountType,
  });

  toast.success("Tu cuenta se creó correctamente. Ahora podés iniciar sesión.");

  setTimeout(() => {
    navigate("/login");
  }, 1000);
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
