
import {
  House,
  PawPrint,
  Heart,
  ClipboardList,
  BriefcaseMedical,
  Sprout,
} from "lucide-react";

import styles from "./Services.module.css";
import ServiceCard from "./ServiceCard/ServiceCard";

const services = [
  {
    title: "Servicios para el hogar",
    icon: House,
    color: {
      color: "#087a50",
      background: "#e6f6ee",
    },
    services: [
      "Limpieza",
      "Plomería",
      "Pintura",
      "Electricidad",
      "Carpintería",
    ],
  },
  {
    title: "Servicios para mascotas",
    icon: PawPrint,
    color: {
      color: "#087d96",
      background: "#e7f4f7",
    },
    services: ["Paseos", "Cuidado", "Peluquería", "Traslados"],
  },
  {
    title: "Cuidado de personas",
    icon: Heart,
    color: {
      color: "#b66a00",
      background: "#fff3df",
    },
    services: [
      "Acompañamiento",
      "Adultos mayores",
      "Turnos",
      "Compras",
    ],
  },
  {
    title: "Trámites y gestiones",
    icon: ClipboardList,
    color: {
      color: "#7950b2",
      background: "#f1eafb",
    },
    services: ["Documentación", "Turnos", "Gestiones", "Mensajería"],
  },
  {
    title: "Servicios profesionales",
    icon: BriefcaseMedical,
    color: {
      color: "#608b20",
      background: "#edf5df",
    },
    services: ["Informática", "Diseño", "Clases", "Asesoría"],
  },
  {
    title: "Jardinería y exteriores",
    icon: Sprout,
    color: {
      color: "#64736c",
      background: "#eef1ef",
    },
    services: ["Jardinería", "Poda", "Piscinas", "Mantenimiento"],
  },
];

function Services() {
  return (
    <section className={styles.section} id="servicios">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>ENCONTRÁ LO QUE NECESITÁS</span>

          <h2 className={styles.title}>Explorá nuestros servicios</h2>

          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Encontrá opciones para resolver tus necesidades cotidianas.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
