import { useState } from "react";
import { Search, BriefcaseBusiness, MapPin, CalendarDays } from "lucide-react";
import styles from "./ServiceSearchBar.module.css";

const serviceTypes = [
  {
    id: "home",
    name: "Servicios para el hogar",
    categories: [
      "Plomería",
      "Electricidad",
      "Limpieza",
      "Pintura",
      "Carpintería",
      "Reparaciones",
    ],
  },
  {
    id: "pets",
    name: "Servicios para mascotas",
    categories: [
      "Paseo de mascotas",
      "Cuidado de mascotas",
      "Peluquería para mascotas",
      "Adiestramiento",
    ],
  },
  {
    id: "personal-care",
    name: "Cuidado de personas",
    categories: [
      "Cuidado de adultos mayores",
      "Cuidado infantil",
      "Acompañamiento",
    ],
  },
  {
    id: "procedures",
    name: "Trámites y gestiones",
    categories: ["Trámites administrativos", "Gestiones personales"],
  },
  {
    id: "professional",
    name: "Servicios profesionales",
    categories: ["Informática", "Diseño", "Asesoramiento profesional"],
  },
  {
    id: "gardening",
    name: "Jardinería y exteriores",
    categories: [
      "Jardinería",
      "Mantenimiento de jardines",
      "Limpieza de exteriores",
    ],
  },
];

const ServiceSearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    serviceType: "",
    service: "",
    category: "",
    location: "",
    date: "",
  });

  const selectedType = serviceTypes.find(
    (type) => type.id === searchData.serviceType,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchData((previousData) => {
      if (name === "serviceType") {
        return {
          ...previousData,
          serviceType: value,
          category: "",
        };
      }

      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchData.serviceType) {
      return;
    }

    onSearch?.({
      ...searchData,
      serviceTypeName: selectedType?.name ?? "",
    });
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="serviceType">¿Qué tipo de servicio necesitás?</label>

        <div className={styles.inputWrapper}>
          <BriefcaseBusiness size={18} aria-hidden="true" />

          <select
            id="serviceType"
            name="serviceType"
            value={searchData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná un tipo de servicio</option>

            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="category">Categoría</label>

        <div className={styles.inputWrapper}>
          <Search size={18} aria-hidden="true" />

          <select
            id="category"
            name="category"
            value={searchData.category}
            onChange={handleChange}
            disabled={!selectedType}
          >
            <option value="">
              {selectedType
                ? "Seleccioná una categoría"
                : "Primero elegí un tipo"}
            </option>

            {selectedType?.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="location">¿Dónde?</label>

        <div className={styles.inputWrapper}>
          <MapPin size={18} aria-hidden="true" />

          <input
            id="location"
            name="location"
            type="text"
            placeholder="Ciudad o localidad"
            value={searchData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="date">¿Cuándo lo necesitás?</label>

        <div className={styles.inputWrapper}>
          <CalendarDays size={18} aria-hidden="true" />

          <input
            id="date"
            name="date"
            type="date"
            value={searchData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className={styles.searchButton} type="submit">
        <Search size={17} aria-hidden="true" />
        Buscar servicios
      </button>
    </form>
  );
};

export default ServiceSearchBar;
