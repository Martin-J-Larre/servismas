import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderClient from "../../components/HeaderClient/HeaderClient";

import CoordinationHeader from "./components/CoordinationHeader/CoordinationHeader";
import StatusBanner from "./components/StatusBanner/StatusBanner";
import ProviderCard from "./components/ProviderCard/ProviderCard";
import ServiceDetails from "./components/ServiceDetails/ServiceDetails";
import ServiceConditions from "./components/ServiceConditions/ServiceConditions";
import CoordinationSummary from "./components/CoordinationSummary/CoordinationSummary";
import CoordinationTimeline from "./components/CoordinationTimeline/CoordinationTimeline";
import SecurityCard from "./components/SecurityCard/SecurityCard";

import {
  getSavedCoordination,
  formatDate,
  stages,
} from "./utils/coordination.utils";

import styles from "./CoordinateService.module.css";

const CoordinateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Recuperar la coordinación guardada.
  const [coordination, setCoordination] = useState(() =>
    getSavedCoordination(id),
  );

  // Obtener la solicitud desde la navegación o desde la coordinación guardada.
  const request = location.state?.request ?? coordination?.request;

  // Datos del formulario.
  const [serviceDate, setServiceDate] = useState(() => {
    if (coordination?.serviceDate) {
      return coordination.serviceDate;
    }

    if (
      request?.serviceDate &&
      /^\d{4}-\d{2}-\d{2}$/.test(request.serviceDate)
    ) {
      return request.serviceDate;
    }

    return "";
  });

  const [timeSlot, setTimeSlot] = useState(
    () =>
      coordination?.timeSlot ?? (request?.serviceDate ? "10:00 - 12:00" : ""),
  );

  const [address, setAddress] = useState(
    () => coordination?.address ?? request?.location ?? "",
  );

  const [comments, setComments] = useState(() => coordination?.comments ?? "");

  // Estado actual de la coordinación.
  const status = coordination?.status ?? "inicial";

  const isSent = status !== "inicial";
  const isWaiting = status === "esperando";
  const isAccepted = status === "aceptada";
  const isConfirmed = status === "confirmada";

  // Guardar la coordinación en localStorage y actualizar el estado.
  const saveCoordination = (updatedCoordination) => {
    try {
      localStorage.setItem(
        `servismas-coordination-${id}`,
        JSON.stringify(updatedCoordination),
      );

      setCoordination(updatedCoordination);
    } catch {
      toast.error("No se pudo guardar la coordinación.");
    }
  };

  // Enviar la propuesta de coordinación.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!serviceDate || !timeSlot || !address.trim()) {
      toast.error("Completá la fecha, el horario y la dirección.");
      return;
    }

    const proposal = {
      requestId: id,
      request,
      serviceDate,
      timeSlot,
      address: address.trim(),
      comments: comments.trim(),
      status: "enviada",
      updatedAt: new Date().toISOString(),
    };

    saveCoordination(proposal);

    toast.success("La propuesta de coordinación fue enviada.");
  };

  // Pasar al estado de espera.
  const handleContinueWaiting = () => {
    if (!coordination) return;

    saveCoordination({
      ...coordination,
      status: "esperando",
      updatedAt: new Date().toISOString(),
    });

    toast.info("La coordinación quedó a la espera de respuesta.");
  };

  // Simular la aceptación del prestador.
  const handleSimulateAcceptance = () => {
    if (!coordination) return;

    saveCoordination({
      ...coordination,
      status: "aceptada",
      acceptedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    toast.success("El prestador aceptó la propuesta.");
  };

  // Confirmar la coordinación.
  const handleConfirmCoordination = () => {
    if (!coordination || !isAccepted) {
      toast.error("No se puede confirmar esta coordinación.");
      return;
    }

    const confirmedCoordination = {
      ...coordination,
      status: "confirmada",
      confirmedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveCoordination(confirmedCoordination);

    toast.success("La coordinación quedó confirmada.");

    navigate(`/seguimiento-servicio/${id}`, {
      state: {
        request,
        coordination: confirmedCoordination,
      },
    });
  };

  // Ir al seguimiento del servicio.
  const handleViewTracking = () => {
    navigate(`/seguimiento-servicio/${id}`, {
      state: {
        request,
        coordination,
      },
    });
  };

  // Volver a las solicitudes.
  const handleBack = () => {
    navigate("/mis-solicitudes");
  };

  // Si no existe información de la solicitud, mostrar un mensaje.
  if (!request) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <div className={styles.container}>
            <section className={styles.notFound}>
              <h1>No encontramos esta solicitud</h1>

              <p>
                No pudimos recuperar la información necesaria para coordinar el
                servicio.
              </p>

              <Link to="/mis-solicitudes">Volver a mis solicitudes</Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  // Textos que cambian según el estado de la coordinación.
  const statusContent = {
    inicial: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Revisá los detalles del servicio y enviá tu propuesta al prestador.",
      bannerTitle: "Solicitud aceptada",
      bannerDescription:
        "El prestador aceptó tu solicitud. Revisá los detalles y enviá una propuesta de coordinación.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La fecha y el horario son una propuesta. La coordinación quedará pendiente hasta que el prestador responda.",
    },

    enviada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Propuesta enviada correctamente",
      bannerDescription:
        "La coordinación fue enviada al prestador. Podés continuar la simulación para ver el estado de espera.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La propuesta fue enviada. Continuá para registrar que queda a la espera de la respuesta del prestador.",
    },

    esperando: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Esperando respuesta del prestador",
      bannerDescription:
        "Propuesta enviada. Estamos esperando la respuesta del prestador.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La propuesta está pendiente. En esta demostración podés simular la aceptación del prestador.",
    },

    aceptada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Coordinación acordada",
      bannerDescription:
        "El prestador aceptó la propuesta. Revisá el resumen y confirmá la coordinación.",
      summaryTitle: "Confirmar coordinación",
      notice:
        "El prestador aceptó la propuesta. Confirmá la coordinación para continuar.",
    },

    confirmada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinación confirmada",
      description:
        "La coordinación quedó confirmada. Conservá esta información para el día del servicio.",
      bannerTitle: "Coordinación confirmada",
      bannerDescription: `Confirmaste la coordinación. El servicio quedó programado para el ${formatDate(
        serviceDate,
      )}${timeSlot ? ` de ${timeSlot}` : ""}.`,
      summaryTitle: "Coordinación confirmada",
      notice:
        "La coordinación quedó confirmada y no requiere más acciones en esta pantalla.",
    },
  };

  const currentContent = statusContent[status] ?? statusContent.inicial;

  const currentStageIndex = {
    inicial: -1,
    enviada: 0,
    esperando: 1,
    aceptada: 2,
    confirmada: 2,
  }[status];

  const displayedDate = serviceDate
    ? formatDate(serviceDate)
    : request.serviceDate || "Sin seleccionar";

  const serviceDescription =
    request.description ||
    "Trabajo solicitado por el cliente. Los detalles se revisarán con el prestador.";

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            Volver a mis solicitudes
          </button>

          <div className={styles.layout}>
            <div className={styles.mainColumn}>
              <CoordinationHeader
                eyebrow={currentContent.eyebrow}
                title={currentContent.title}
                description={currentContent.description}
              />

              <StatusBanner
                title={currentContent.bannerTitle}
                description={currentContent.bannerDescription}
              />

              <ProviderCard request={request} />

              <ServiceDetails
                request={request}
                serviceDescription={serviceDescription}
              />

              <ServiceConditions />
            </div>

            <aside className={styles.sidebar}>
              <CoordinationSummary
                title={currentContent.summaryTitle}
                request={request}
                serviceDate={displayedDate}
                timeSlot={timeSlot}
                address={address}
                isSent={isSent}
                isWaiting={isWaiting}
                isAccepted={isAccepted}
                isConfirmed={isConfirmed}
                onSubmit={handleSubmit}
                onContinueWaiting={handleContinueWaiting}
                onSimulateAcceptance={handleSimulateAcceptance}
                onConfirmCoordination={handleConfirmCoordination}
                onViewTracking={handleViewTracking}
                serviceDateValue={serviceDate}
                onServiceDateChange={setServiceDate}
                onTimeSlotChange={setTimeSlot}
                onAddressChange={setAddress}
                comments={comments}
                onCommentsChange={setComments}
                notice={currentContent.notice}
              />

              {isSent && (
                <CoordinationTimeline
                  stages={stages}
                  currentStageIndex={currentStageIndex}
                  isConfirmed={isConfirmed}
                />
              )}

              <SecurityCard />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default CoordinateService;

// import { useState } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CalendarDays,
//   Check,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   MapPin,
//   MessageSquare,
//   Pencil,
//   ShieldCheck,
//   Send,
//   Wallet,
// } from "lucide-react";
// import { toast } from "react-toastify";

// import HeaderClient from "../../components/HeaderClient/HeaderClient";
// import styles from "./CoordinateService.module.css";

// const STORAGE_PREFIX = "servismas-coordination-";

// const timeSlots = [
//   "08:00 - 10:00",
//   "10:00 - 12:00",
//   "12:00 - 14:00",
//   "14:00 - 16:00",
//   "16:00 - 18:00",
// ];

// const stages = [
//   {
//     id: "enviada",
//     title: "Coordinación enviada",
//     description: "La propuesta salió correctamente.",
//   },
//   {
//     id: "esperando",
//     title: "En espera",
//     description: "Esperando la respuesta del prestador.",
//   },
//   {
//     id: "aceptada",
//     title: "Acordada",
//     description: "El prestador aceptó la propuesta.",
//   },
// ];

// const getSavedCoordination = (id) => {
//   try {
//     const saved = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
//     return saved ? JSON.parse(saved) : null;
//   } catch {
//     return null;
//   }
// };

// const formatDate = (dateString) => {
//   if (!dateString) return "";

//   // Si ya viene con formato ISO: YYYY-MM-DD
//   const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(dateString);

//   if (isoDate) {
//     const date = new Date(`${dateString}T12:00:00`);

//     if (Number.isNaN(date.getTime())) {
//       return dateString;
//     }

//     return new Intl.DateTimeFormat("es-AR", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }).format(date);
//   }

//   // Por si ya viene como texto, por ejemplo:
//   // "2 de octubre de 2026"
//   //TODO: Vamos a arreglarlo cuando lo mande de la API o bbdd
//   return dateString;
// };

// const CoordinateService = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();

//   const [coordination, setCoordination] = useState(() =>
//     getSavedCoordination(id),
//   );

//   const request = location.state?.request ?? coordination?.request;

//   const [serviceDate, setServiceDate] = useState(
//     coordination?.serviceDate ??
//       (request?.serviceDate && /^\d{4}-\d{2}-\d{2}$/.test(request.serviceDate)
//         ? request.serviceDate
//         : ""),
//   );

//   const [timeSlot, setTimeSlot] = useState(
//     coordination?.timeSlot ?? (request?.serviceDate ? "10:00 - 12:00" : ""),
//   );
//   const [address, setAddress] = useState(
//     coordination?.address ?? request?.location ?? "",
//   );
//   const [comments, setComments] = useState(coordination?.comments ?? "");

//   const status = coordination?.status ?? "inicial";
//   const isSent = status !== "inicial";
//   const isWaiting = status === "esperando";
//   const isAccepted = status === "aceptada";
//   const isConfirmed = status === "confirmada";

//   const saveCoordination = (updatedCoordination) => {
//     localStorage.setItem(
//       `${STORAGE_PREFIX}${id}`,
//       JSON.stringify(updatedCoordination),
//     );

//     setCoordination(updatedCoordination);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!serviceDate || !timeSlot || !address.trim()) {
//       toast.error("Completá la fecha, el horario y la dirección.");
//       return;
//     }

//     const proposal = {
//       requestId: id,
//       request,
//       serviceDate,
//       timeSlot,
//       address: address.trim(),
//       comments: comments.trim(),
//       status: "enviada",
//       updatedAt: new Date().toISOString(),
//     };

//     saveCoordination(proposal);
//     toast.success("La propuesta de coordinación fue enviada.");
//   };

//   const handleContinueWaiting = () => {
//     if (!coordination) return;

//     saveCoordination({
//       ...coordination,
//       status: "esperando",
//       updatedAt: new Date().toISOString(),
//     });

//     toast.info("La propuesta quedó a la espera del prestador.");
//   };

//   const handleSimulateAcceptance = () => {
//     if (!coordination) return;

//     saveCoordination({
//       ...coordination,
//       status: "aceptada",
//       acceptedAt: new Date().toISOString(),
//     });

//     toast.success("El prestador aceptó la propuesta.");
//   };

//   const handleConfirmCoordination = () => {
//     if (!coordination || !isAccepted) {
//       toast.error("Primero necesitás la aceptación del prestador.");
//       return;
//     }

//     const confirmedCoordination = {
//       ...coordination,
//       status: "confirmada",
//       confirmedAt: new Date().toISOString(),
//     };

//     saveCoordination(confirmedCoordination);
//     toast.success("¡La coordinación quedó confirmada!");

//     // La pantalla de seguimiento se conectará en el siguiente paso.
//     navigate(`/seguimiento-servicio/${id}`, {
//       state: {
//         request,
//         coordination: confirmedCoordination,
//       },
//     });
//   };

//   const handleViewTracking = () => {
//     navigate(`/seguimiento-servicio/${id}`, {
//       state: {
//         request,
//         coordination,
//       },
//     });
//   };

//   const handleBack = () => {
//     navigate("/mis-solicitudes");
//   };

//   if (!request) {
//     return (
//       <>
//         <HeaderClient />

//         <main className={styles.page}>
//           <section className={styles.notFound}>
//             <h1>No encontramos la solicitud</h1>
//             <p>
//               Ingresá a Mis solicitudes y seleccioná la solicitud que querés
//               coordinar.
//             </p>
//             <Link to="/mis-solicitudes" className={styles.primaryButton}>
//               Volver a Mis solicitudes
//             </Link>
//           </section>
//         </main>
//       </>
//     );
//   }

//   const statusContent = {
//     inicial: {
//       eyebrow: "SOLICITUD ACEPTADA",
//       title: "Coordinar servicio",
//       description:
//         "Revisá los detalles del servicio y enviá tu propuesta al prestador.",
//       bannerTitle: "Solicitud aceptada",
//       bannerDescription:
//         "El prestador aceptó tu solicitud. Revisá los detalles y enviá una propuesta de coordinación.",
//       summaryTitle: "Propuesta de coordinación",
//       notice:
//         "La fecha y el horario son una propuesta. La coordinación quedará pendiente hasta que el prestador responda.",
//     },
//     enviada: {
//       eyebrow: "SOLICITUD ACEPTADA",
//       title: "Coordinar servicio",
//       description:
//         "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
//       bannerTitle: "Propuesta enviada correctamente",
//       bannerDescription:
//         "La coordinación fue enviada al prestador. Podés continuar la simulación para ver el estado de espera.",
//       summaryTitle: "Propuesta de coordinación",
//       notice:
//         "La propuesta fue enviada. Continuá para registrar que queda a la espera de la respuesta del prestador.",
//     },
//     esperando: {
//       eyebrow: "SOLICITUD ACEPTADA",
//       title: "Coordinar servicio",
//       description:
//         "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
//       bannerTitle: "Esperando respuesta del prestador",
//       bannerDescription:
//         "Propuesta enviada. Estamos esperando la respuesta del prestador.",
//       summaryTitle: "Propuesta de coordinación",
//       notice:
//         "La propuesta está pendiente. En esta demostración podés simular la aceptación del prestador.",
//     },
//     aceptada: {
//       eyebrow: "SOLICITUD ACEPTADA",
//       title: "Coordinar servicio",
//       description:
//         "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
//       bannerTitle: "Coordinación acordada",
//       bannerDescription:
//         "El prestador aceptó la propuesta. Revisá el resumen y confirmá la coordinación.",
//       summaryTitle: "Confirmar coordinación",
//       notice:
//         "El prestador aceptó la propuesta. Confirmá la coordinación para continuar.",
//     },
//     confirmada: {
//       eyebrow: "SOLICITUD ACEPTADA",
//       title: "Coordinar servicio",
//       description:
//         "La coordinación quedó confirmada. Conservá esta información para el día del servicio.",
//       bannerTitle: "Coordinación confirmada",
//       bannerDescription: `Confirmaste la coordinación. El servicio quedó programado para el ${formatDate(serviceDate)}${timeSlot ? ` de ${timeSlot}` : ""}.`,
//       summaryTitle: "Coordinación confirmada",
//       notice:
//         "La coordinación quedó confirmada y no requiere más acciones en esta pantalla.",
//     },
//   }[status];

//   const currentStageIndex = {
//     inicial: -1,
//     enviada: 0,
//     esperando: 1,
//     aceptada: 2,
//     confirmada: 2,
//   }[status];

//   const serviceDescription =
//     request.description ||
//     "Trabajo solicitado por el cliente. Los detalles se revisarán con el prestador.";

//   const displayedDate = serviceDate
//     ? formatDate(serviceDate)
//     : request.serviceDate || "Sin seleccionar";

//   return (
//     <>
//       <HeaderClient />

//       <main className={styles.page}>
//         <div className={styles.container}>
//           <button
//             type="button"
//             className={styles.backButton}
//             onClick={handleBack}
//           >
//             <ArrowLeft size={13} />
//             Volver a mis solicitudes
//           </button>

//           <div className={styles.layout}>
//             <div className={styles.mainColumn}>
//               <header className={styles.pageHeader}>
//                 <span className={styles.eyebrow}>{statusContent.eyebrow}</span>
//                 <h1 className={styles.title}>{statusContent.title}</h1>
//                 <p className={styles.subtitle}>{statusContent.description}</p>
//               </header>

//               <section className={styles.statusBanner} aria-live="polite">
//                 <CheckCircle2 size={18} className={styles.bannerIcon} />
//                 <div>
//                   <h2>{statusContent.bannerTitle}</h2>
//                   <p>{statusContent.bannerDescription}</p>
//                 </div>
//               </section>

//               <section className={styles.card}>
//                 <h2 className={styles.cardTitle}>Prestador</h2>

//                 <div className={styles.providerRow}>
//                   <div className={styles.avatar} aria-hidden="true">
//                     {(request.providerName || "Prestador")
//                       .split(" ")
//                       .map((part) => part[0])
//                       .slice(0, 2)
//                       .join("")
//                       .toUpperCase()}
//                   </div>

//                   <div className={styles.providerInfo}>
//                     <strong>{request.providerName || "Prestador"}</strong>
//                     <span>
//                       {request.specialty || request.category || "Servicios"}
//                     </span>
//                     <small>
//                       <MapPin size={11} />
//                       Zona norte
//                       <span className={styles.rating}>★ 4,8</span>
//                       <span> · 124 valoraciones</span>
//                     </small>
//                   </div>

//                   <span className={styles.acceptedPill}>
//                     <span />
//                     Aceptada
//                   </span>
//                 </div>
//               </section>

//               <section className={styles.card}>
//                 <h2 className={styles.cardTitle}>Detalles del servicio</h2>

//                 <div className={styles.detailRow}>
//                   <span className={styles.detailIcon}>
//                     <FileText size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Descripción del trabajo</span>
//                     <p>{serviceDescription}</p>
//                   </div>
//                 </div>

//                 <div className={styles.detailRow}>
//                   <span className={styles.detailIcon}>
//                     <MapPin size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Ubicación</span>
//                     <p>{address || request.location || "Sin especificar"}</p>
//                   </div>
//                 </div>

//                 <div className={styles.detailRow}>
//                   <span className={styles.detailIcon}>
//                     <CalendarDays size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Fecha</span>
//                     <p>{displayedDate}</p>
//                   </div>
//                 </div>

//                 <div className={styles.detailRow}>
//                   <span className={styles.detailIcon}>
//                     <Clock3 size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Horario</span>
//                     <p>
//                       {timeSlot
//                         ? `${timeSlot} – Se puede extender según el trabajo`
//                         : "Pendiente de coordinación"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.detailRow}>
//                   <span className={`${styles.detailIcon} ${styles.priceIcon}`}>
//                     <Wallet size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Presupuesto estimado</span>
//                     <p className={styles.priceRange}>
//                       $15.000 – $25.000
//                       <small>
//                         El monto final se define al terminar el servicio.
//                       </small>
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.detailRow}>
//                   <span className={styles.detailIcon}>
//                     <Pencil size={14} />
//                   </span>
//                   <div className={styles.detailContent}>
//                     <span>Materiales</span>
//                     <p>
//                       {comments ||
//                         "El prestador puede requerir materiales adicionales. Se informará con anticipación."}
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               <section className={styles.card}>
//                 <h2 className={styles.cardTitle}>Condiciones del servicio</h2>

//                 <ul className={styles.conditionsList}>
//                   <li>
//                     <Check size={12} />
//                     El prestador se compromete a realizar el trabajo en la fecha
//                     y horario acordados.
//                   </li>
//                   <li>
//                     <Check size={12} />
//                     El presupuesto puede variar según los materiales y el
//                     trabajo requerido.
//                   </li>
//                   <li>
//                     <Check size={12} />
//                     Cualquier cambio en la fecha o el alcance del trabajo debe
//                     coordinarse directamente con el prestador.
//                   </li>
//                   <li>
//                     <Check size={12} />
//                     Al confirmar la coordinación, aceptás estas condiciones y
//                     habilitás al prestador a presentarse en el domicilio
//                     indicado.
//                   </li>
//                 </ul>
//               </section>
//             </div>

//             <aside className={styles.sidebar}>
//               <section className={styles.summaryCard}>
//                 <span className={styles.sidebarEyebrow}>RESUMEN</span>
//                 <h2>{statusContent.summaryTitle}</h2>

//                 <div className={styles.summaryDetails}>
//                   <div>
//                     <span>Prestador</span>
//                     <strong>{request.providerName}</strong>
//                   </div>
//                   <div>
//                     <span>Servicio</span>
//                     <strong>
//                       {request.category || request.specialty || "Servicio"}
//                     </strong>
//                   </div>
//                   <div>
//                     <span>Fecha</span>
//                     <strong>{displayedDate}</strong>
//                   </div>
//                   <div>
//                     <span>Horario</span>
//                     <strong>{timeSlot || "Sin seleccionar"}</strong>
//                   </div>
//                   <div>
//                     <span>Dirección</span>
//                     <strong>{address || "Sin especificar"}</strong>
//                   </div>
//                 </div>

//                 {isSent && (
//                   <section className={styles.timeline}>
//                     <h3>ESTADO DE LA COORDINACIÓN</h3>

//                     <div className={styles.timelineItems}>
//                       {stages.map((stage, index) => {
//                         const isComplete = index <= currentStageIndex;
//                         const isCurrent = index === currentStageIndex;

//                         return (
//                           <div
//                             key={stage.id}
//                             className={`${styles.timelineItem} ${
//                               isComplete ? styles.timelineComplete : ""
//                             } ${isCurrent ? styles.timelineCurrent : ""}`}
//                           >
//                             <span className={styles.timelineMarker}>
//                               {isComplete ? <Check size={10} /> : <span />}
//                             </span>

//                             <div>
//                               <strong>{stage.title}</strong>
//                               {isCurrent && (
//                                 <p>
//                                   {status === "aceptada"
//                                     ? stage.description
//                                     : status === "confirmada"
//                                       ? "La coordinación está confirmada."
//                                       : stage.description}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </section>
//                 )}

//                 <p className={styles.notice}>{statusContent.notice}</p>

//                 {!isSent && (
//                   <form onSubmit={handleSubmit} className={styles.sidebarForm}>
//                     <div className={styles.compactField}>
//                       <label htmlFor="serviceDate">Fecha propuesta *</label>
//                       <input
//                         id="serviceDate"
//                         type="date"
//                         min={new Date().toLocaleDateString("en-CA")}
//                         value={serviceDate}
//                         onChange={(event) => setServiceDate(event.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className={styles.compactField}>
//                       <label htmlFor="timeSlot">Horario *</label>
//                       <select
//                         id="timeSlot"
//                         value={timeSlot}
//                         onChange={(event) => setTimeSlot(event.target.value)}
//                         required
//                       >
//                         <option value="">Seleccioná un horario</option>
//                         {timeSlots.map((slot) => (
//                           <option key={slot} value={slot}>
//                             {slot}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className={styles.compactField}>
//                       <label htmlFor="address">Dirección *</label>
//                       <input
//                         id="address"
//                         type="text"
//                         value={address}
//                         onChange={(event) => setAddress(event.target.value)}
//                         placeholder="Dirección del servicio"
//                         required
//                       />
//                     </div>

//                     <div className={styles.compactField}>
//                       <label htmlFor="comments">Comentarios</label>
//                       <textarea
//                         id="comments"
//                         value={comments}
//                         onChange={(event) => setComments(event.target.value)}
//                         placeholder="Detalles adicionales (opcional)"
//                         rows={2}
//                         maxLength={500}
//                       />
//                     </div>

//                     <button type="submit" className={styles.primaryButton}>
//                       <ClipboardCheckIcon />
//                       Enviar propuesta
//                     </button>
//                   </form>
//                 )}

//                 {status === "enviada" && (
//                   <button
//                     type="button"
//                     className={styles.secondaryAction}
//                     onClick={handleContinueWaiting}
//                   >
//                     Continuar a estado en espera
//                     <ArrowRight size={13} />
//                   </button>
//                 )}

//                 {isWaiting && (
//                   <button
//                     type="button"
//                     className={styles.secondaryAction}
//                     onClick={handleSimulateAcceptance}
//                   >
//                     Simular aceptación del prestador
//                     <ArrowRight size={13} />
//                   </button>
//                 )}

//                 {isAccepted && (
//                   <button
//                     type="button"
//                     className={styles.primaryButton}
//                     onClick={handleConfirmCoordination}
//                   >
//                     Confirmar coordinación
//                     <Check size={14} />
//                   </button>
//                 )}

//                 {isConfirmed && (
//                   <button
//                     type="button"
//                     className={styles.primaryButton}
//                     onClick={handleViewTracking}
//                   >
//                     Ver seguimiento
//                     <ArrowRight size={14} />
//                   </button>
//                 )}

//                 <button
//                   type="button"
//                   className={styles.backAction}
//                   onClick={handleBack}
//                 >
//                   <ArrowLeft size={12} />
//                   Volver
//                 </button>
//               </section>

//               <section className={styles.securityCard}>
//                 <h2>TU SEGURIDAD EN SERVISMÁS</h2>

//                 <div>
//                   <span>
//                     <ShieldCheck size={13} />
//                   </span>
//                   Prestador verificado por ServisMás
//                 </div>

//                 <div>
//                   <span>
//                     <Check size={13} />
//                   </span>
//                   Solicitud aceptada formalmente
//                 </div>

//                 <div>
//                   <span>
//                     <FileText size={13} />
//                   </span>
//                   Condiciones acordadas por escrito
//                 </div>
//               </section>
//             </aside>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// const ClipboardCheckIcon = () => <Send size={14} />;

// export default CoordinateService;
