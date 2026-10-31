import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderClient from "../../components/HeaderClient/HeaderClient";

import RateServiceHeader from "./components/RateServiceHeader/RateServiceHeader";
import RateServiceProvider from "./components/RateServiceProvider/RateServiceProvider";
import RatingForm from "./components/RatingForm/RatingForm";

import { getSavedCoordination } from "../CoordinateService/utils/coordination.utils";

import styles from "./RateService.module.css";

const RateService = () => {
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

  const handlePublishRating = (rating, review) => {
    if (!coordination || !request) {
      toast.error("No se encontraron los datos del servicio.");
      return;
    }

    if (coordination.serviceStatus !== "finalizado") {
      toast.error("Solo podés valorar un servicio finalizado.");
      return;
    }

    const savedRating = {
      id: `rating-${id}`,
      serviceId: id,
      providerId: request.providerId ?? request.provider?.id ?? null,
      providerName: request.providerName || "Prestador",
      specialty: request.category || request.specialty || "Servicio general",
      rating,
      review: review.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        `servismas-rating-${id}`,
        JSON.stringify(savedRating),
      );

      toast.success("¡Tu valoración se publicó correctamente!");

      navigate("/mis-solicitudes", { replace: true });
    } catch {
      toast.error("No se pudo guardar tu valoración.");
    }
  };

  const handleSkipRating = () => {
    navigate("/mis-solicitudes", { replace: true });
  };

  if (!request || !coordination) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <section className={styles.notFound}>
            <h1>No encontramos este servicio</h1>

            <p>
              No pudimos recuperar los datos del servicio. Volvé a tus
              solicitudes e intentá ingresar nuevamente.
            </p>

            <Link to="/mis-solicitudes">Volver a mis solicitudes</Link>
          </section>
        </main>
      </>
    );
  }

  const providerName = request.providerName || "Prestador";

  const specialty = request.category || request.specialty || "Servicio general";

  const serviceDate = coordination.serviceDate || request.serviceDate || "";

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <section className={styles.card}>
          <RateServiceHeader />

          <div className={styles.content}>
            <RateServiceProvider
              providerName={providerName}
              specialty={specialty}
              serviceDate={serviceDate}
            />

            <RatingForm
              onPublish={handlePublishRating}
              onSkip={handleSkipRating}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default RateService;
