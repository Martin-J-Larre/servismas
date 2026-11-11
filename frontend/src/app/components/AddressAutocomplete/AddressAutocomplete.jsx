import { useEffect, useId, useState } from "react";
import { MapPin, LoaderCircle } from "lucide-react";
import { searchAddresses } from "../../../services/geocoding.service";
import styles from "./AddressAutocomplete.module.css";

const formatAddress = (address, mode) => {
  if (!address) return "";

  if (mode === "coverage") {
    return [address.locality, address.province].filter(Boolean).join(", ");
  }

  const street = [address.street, address.houseNumber]
    .filter(Boolean)
    .join(" ");

  return [street, address.locality, address.province]
    .filter(Boolean)
    .join(", ");
};

const isValidAddress = (address, mode) => {
  const hasCoordinates =
    Number.isFinite(address.latitude) && Number.isFinite(address.longitude);

  const hasLocation =
    Boolean(address.locality?.trim()) && Boolean(address.province?.trim());

  if (mode === "coverage") {
    return hasLocation && hasCoordinates;
  }

  return (
    Boolean(address.street?.trim()) &&
    Boolean(address.houseNumber?.trim()) &&
    hasLocation &&
    hasCoordinates
  );
};

const AddressAutocomplete = ({
  mode = "full",
  label,
  placeholder,
  value,
  onChange,
}) => {
  const inputId = useId();

  const defaultLabel =
    mode === "coverage" ? "Zona donde prestás el servicio" : "Dirección";

  const defaultPlaceholder =
    mode === "coverage"
      ? "Ingresá una localidad o provincia..."
      : "Ingresá calle y número...";

  const [query, setQuery] = useState(() => formatAddress(value, mode));
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSelected, setIsSelected] = useState(Boolean(value));

  useEffect(() => {
    if (value) {
      setQuery(formatAddress(value, mode));
      setIsSelected(true);
    }
  }, [value, mode]);

  useEffect(() => {
    if (query.trim().length < 3 || isSelected) {
      setSuggestions([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError("");

        const results = await searchAddresses(query);

        setSuggestions(
          results.filter((address) => isValidAddress(address, mode)),
        );
      } catch (err) {
        console.error("Error al consultar Photon:", err);
        setSuggestions([]);
        setError("No se pudieron buscar las ubicaciones.");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query, isSelected, mode]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setIsSelected(false);
    setSuggestions([]);
    setError("");
    onChange?.(null);
  };

  const handleSelectAddress = (address) => {
    setQuery(formatAddress(address, mode));
    setIsSelected(true);
    setSuggestions([]);
    setError("");
    onChange?.(address);
  };

  const handleClear = () => {
    setQuery("");
    setIsSelected(false);
    setSuggestions([]);
    setError("");
    onChange?.(null);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label || defaultLabel}
      </label>

      <div className={styles.inputWrapper}>
        <MapPin size={20} className={styles.icon} />

        <input
          id={inputId}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder || defaultPlaceholder}
          autoComplete="off"
          className={styles.input}
        />

        {isLoading && <LoaderCircle size={18} className={styles.loader} />}

        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar ubicación"
          >
            Limpiar
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((address, index) => (
            <li key={`${address.latitude}-${address.longitude}-${index}`}>
              <button
                type="button"
                className={styles.suggestion}
                onClick={() => handleSelectAddress(address)}
              >
                <MapPin size={18} className={styles.suggestionIcon} />
                <span>{formatAddress(address, mode)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading &&
        query.trim().length >= 3 &&
        !isSelected &&
        suggestions.length === 0 &&
        !error && (
          <p className={styles.helper}>
            No se encontraron ubicaciones. Probá con otra búsqueda.
          </p>
        )}
    </div>
  );
};

export default AddressAutocomplete;
