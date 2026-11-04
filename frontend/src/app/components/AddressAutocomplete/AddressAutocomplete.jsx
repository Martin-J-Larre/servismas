import { useEffect, useState } from "react";
import { MapPin, LoaderCircle } from "lucide-react";
import { searchAddresses } from "../../../services/geocoding.service";
import styles from "./AddressAutocomplete.module.css";

const formatAddress = (address) => {
  if (!address) return "";

  const street = [address.street, address.houseNumber]
    .filter(Boolean)
    .join(" ");

  return [street, address.locality, address.province]
    .filter(Boolean)
    .join(", ");
};

const AddressAutocomplete = ({ value, onChange }) => {
  const [query, setQuery] = useState(() => formatAddress(value));
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSelected, setIsSelected] = useState(Boolean(value));

  useEffect(() => {
    if (value) {
      setQuery(formatAddress(value));
      setIsSelected(true);
    }
  }, [value]);

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

        setSuggestions(results);
      } catch (err) {
        console.error("Error al consultar Photon:", err);

        setSuggestions([]);
        setError("No se pudieron buscar las ubicaciones.");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query, isSelected]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setIsSelected(false);
    setSuggestions([]);
    setError("");

    onChange?.(null);
  };

  const handleSelectAddress = (address) => {
    setQuery(formatAddress(address));
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
      <label htmlFor="address-search" className={styles.label}>
        Zona donde prestás el servicio
      </label>

      <div className={styles.inputWrapper}>
        <MapPin size={20} className={styles.icon} />

        <input
          id="address-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ingresá una localidad o provincia..."
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
                <span>{formatAddress(address)}</span>
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
