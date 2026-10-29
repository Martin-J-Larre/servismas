import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import providers from "../../../provider/data/providers";
import styles from "./ProviderProfile.module.css";

import HeaderClient from "../../components/HeaderClient/HeaderClient";

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

  const provider = providers.find((item) => String(item.id) === String(id));

  if (!provider) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <div className={styles.notFound}>
            <h1>Prestador no encontrado</h1>

            <p>No pudimos encontrar el perfil que estás buscando.</p>

            <button type="button" onClick={() => navigate("/buscar-servicios")}>
              Volver a buscar servicios
            </button>
          </div>
        </main>
      </>
    );
  }

  const {
    name,
    initials,
    specialty,
    rating,
    reviewCount,
    location,
    category,
    description,
    availability,
  } = provider;

  const services = [
    {
      name: specialty || category,
      description:
        description || "Consultá con el prestador para conocer más detalles.",
    },
  ];

  return (
    <>
      <HeaderClient />

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
            {/* Columna izquierda */}
            <div className={styles.mainContent}>
              <ProviderProfileCard provider={provider} />

              <ProviderAbout
                experience={provider.experience}
                serviceArea={location}
              />

              <ProviderServices services={services} />

              <ProviderAvailability availability={availability} />

              <ProviderReviews reviews={[]} />
            </div>

            {/* Columna derecha */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <ProviderServiceInfo
                  serviceName={specialty || category}
                  category={category}
                  description={description}
                />

                <ProviderBookingCard
                  name={name}
                  initials={initials}
                  specialty={specialty}
                  location={location}
                  rating={rating}
                  reviewCount={reviewCount}
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
