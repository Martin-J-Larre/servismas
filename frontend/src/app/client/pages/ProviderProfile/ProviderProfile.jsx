import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getPublicProviderProfile } from "../../../../services/service.service";

import styles from "./ProviderProfile.module.css";

import AppHeader from "../../../components/AppHeader/AppHeader";

import ProviderProfileCard from "./components/ProviderProfileCard/ProviderProfileCard";
import ProviderAbout from "./components/ProviderAbout/ProviderAbout";
import ProviderServices from "./components/ProviderServices/ProviderServices";
import ProviderAvailability from "./components/ProviderAvailability/ProviderAvailability";
import ProviderReviews from "./components/ProviderReviews/ProviderReviews";
import ProviderServiceInfo from "./components/ProviderServiceInfo/ProviderServiceInfo";
import ProviderBookingCard from "./components/ProviderBookingCard/ProviderBookingCard";
import ProviderTrustCard from "./components/ProviderTrustCard/ProviderTrustCard";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedServiceId = location.state?.selectedServiceId;

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchProvider = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicProviderProfile(id);

        if (isActive) {
          setProvider(response.provider ?? null);
        }
      } catch (error) {
        console.error("Error al obtener el perfil del prestador:", error);

        if (isActive) {
          setError("No se pudo cargar el perfil del prestador.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProvider();

    return () => {
      isActive = false;
    };
  }, [id]);

  const services = useMemo(() => {
    if (!provider?.services) return [];

    const orderedServices = [...provider.services];

    if (selectedServiceId) {
      orderedServices.sort((a, b) => {
        if (String(a.id) === String(selectedServiceId)) return -1;
        if (String(b.id) === String(selectedServiceId)) return 1;
        return 0;
      });
    }

    return orderedServices;
  }, [provider, selectedServiceId]);

  if (loading) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <div className={styles.container}>
            <p>Cargando perfil del prestador...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !provider) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <div className={styles.notFound}>
            <h1>Prestador no encontrado</h1>
            <p>
              {error || "No pudimos encontrar el perfil que estás buscando."}
            </p>
            <button
              type="button"
              onClick={() => navigate("/app/cliente/buscar-servicios")}
            >
              Volver a buscar servicios
            </button>
          </div>
        </main>
      </>
    );
  }

  const firstName = provider.firstName ?? "";
  const lastName = provider.lastName ?? "";
  const name = `${firstName} ${lastName}`.trim();

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const selectedService =
    services.find(
      (service) => String(service.id) === String(selectedServiceId),
    ) ?? services[0];

  const serviceType =
    selectedService?.serviceType ?? provider.serviceTypes?.[0]?.name ?? "";

  const category = selectedService?.category ?? "";
  const specialty = selectedService?.name ?? "";
  const description = selectedService?.description ?? "";
  const serviceLocation = selectedService?.location ?? null;
  const availability = selectedService?.availability ?? [];

  // Rating estático hasta implementar las valoraciones reales.
  const rating = 4.8;
  const reviewCount = 12;

  return (
    <>
      <AppHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Volver a resultados
          </button>

          <div className={styles.profileLayout}>
            <div className={styles.mainContent}>
              <ProviderProfileCard
                provider={{
                  id: provider.userId,
                  name,
                  initials,
                  specialty,
                  rating,
                  reviewCount,
                  location: serviceLocation,
                  availability: "Disponible",
                  serviceType,
                  verificationStatus: provider.verificationStatus,
                }}
              />

              <ProviderAbout
                experience={provider.experience}
                serviceArea={serviceLocation}
              />

              <ProviderServices services={services} />

              <ProviderAvailability availability={availability} />

              <ProviderReviews reviews={[]} />
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <ProviderServiceInfo
                  serviceName={specialty}
                  category={category}
                  description={description}
                />

                <ProviderBookingCard
                  name={name}
                  initials={initials}
                  specialty={specialty}
                  location={serviceLocation}
                  rating={rating}
                  reviewCount={reviewCount}
                  onSelect={() =>
                    navigate(
                      `/app/cliente/solicitar-servicio/${provider.userId}`,
                      {
                        state: {
                          selectedServiceId: selectedService?.id,
                        },
                      },
                    )
                  }
                />

                <ProviderTrustCard />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProviderProfile;
