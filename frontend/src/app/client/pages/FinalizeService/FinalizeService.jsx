import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Flag, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import HeaderClient from "../../components/HeaderClient/HeaderClient";

import FinalizeServiceHeader from "./components/FinalizeServiceHeader/FinalizeServiceHeader";
import FinalizeServiceSummary from "./components/FinalizeServiceSummary/FinalizeServiceSummary";

import { getSavedCoordination } from "../CoordinateService/utils/coordination.utils";

import styles from "./FinalizeService.module.css";

const FinalizeService = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [coordination, setCoordination] = useState(
    () => getSavedCoordination(id) ?? location.state?.coordination ?? null,
  );

  const request = location.state?.request ?? coordination?.request;

  useEffect(() => {
    const savedCoordination = getSavedCoordination(id);
    const navigationCoordination = location.state?.coordination;

    setCoordination(savedCoordination ?? navigationCoordination ?? null);
  }, [id, location.state?.coordination]);

  const handleConfirmFinalization = () => {
    if (!coordination || !request) {
      toast.error("No se encontraron los datos del servicio.");
      return;
    }

    if (coordination.serviceStatus !== "en_progreso") {
      toast.error("El servicio no se encuentra en progreso.");
      return;
    }

    const now = new Date().toISOString();

    const updatedCoordination = {
      ...coordination,
      serviceStatus: "finalizado",
      serviceFinishedAt: now,
      updatedAt: now,
    };

    try {
      localStorage.setItem(
        `servismas-coordination-${id}`,
        JSON.stringify(updatedCoordination),
      );

      setCoordination(updatedCoordination);

      toast.success("El servicio se finalizó correctamente.");

      navigate(`/valorar-servicio/${id}`, {
        replace: true,
        state: {
          request,
          coordination: updatedCoordination,
        },
      });
    } catch {
      toast.error("No se pudo guardar la finalización del servicio.");
    }
  };

  const handleBack = () => {
    navigate(`/seguimiento-servicio/${id}`, {
      state: {
        request,
        coordination,
      },
    });
  };

  if (!request || !coordination) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <div className={styles.container}>
            <section className={styles.notFound}>
              <h1>No encontramos este servicio</h1>

              <p>
                No pudimos recuperar los datos del servicio. Volvé a tus
                solicitudes e intentá ingresar nuevamente.
              </p>

              <Link to="/mis-solicitudes">Volver a mis solicitudes</Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  const providerName = request.providerName || "Prestador";
  const specialty = request.category || request.specialty || "Servicio general";
  const serviceDate = coordination.serviceDate || request.serviceDate || "";
  const timeSlot = coordination.timeSlot || request.timeSlot || "";
  const address = coordination.address || request.location || "";

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.confirmationCard}>
            <header className={styles.cardHeader}>
              <div className={styles.headerIcon}>
                <Flag size={21} strokeWidth={1.8} />
              </div>

              <span className={styles.eyebrow}>Finalizar servicio</span>

              <FinalizeServiceHeader />
            </header>

            <div className={styles.summaryWrapper}>
              <FinalizeServiceSummary
                providerName={providerName}
                specialty={specialty}
                serviceDate={serviceDate}
                timeSlot={timeSlot}
                address={address}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleConfirmFinalization}
              >
                <CheckCircle2 size={16} />
                Confirmar finalización
              </button>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleBack}
              >
                <ArrowLeft size={14} />
                Volver
              </button>
            </div>

            <p className={styles.footerNote}>
              <ShieldCheck size={13} />
              Al confirmar, el servicio quedará marcado como finalizado.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default FinalizeService;
