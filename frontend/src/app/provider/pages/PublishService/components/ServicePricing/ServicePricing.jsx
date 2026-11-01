import { DollarSign, Info } from "lucide-react";

import styles from "./ServicePricing.module.css";

const ServicePricing = ({ formData, onChange }) => {
  const isRange = formData.pricingType === "range";

  const handlePriceChange = (field, value) => {
    // Evitamos valores negativos en los precios.
    if (value !== "" && Number(value) < 0) {
      return;
    }

    onChange(field, value);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>4</span>

        <div className={styles.sectionTitle}>
          <DollarSign size={15} aria-hidden="true" />
          <h2>Precio del servicio</h2>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          Indicá un precio orientativo para que los clientes tengan una
          referencia del costo de tu servicio.
        </p>

        <div className={styles.field}>
          <span className={styles.label}>Modalidad de precio</span>

          <div className={styles.pricingOptions}>
            <button
              type="button"
              className={`${styles.pricingOption} ${
                isRange ? styles.selected : ""
              }`}
              aria-pressed={isRange}
              onClick={() => onChange("pricingType", "range")}
            >
              <span className={styles.radio}>
                {isRange && <span className={styles.radioInner} />}
              </span>

              <span className={styles.optionContent}>
                <strong>Rango de precios</strong>
                <small>Establecé un precio mínimo y máximo.</small>
              </span>
            </button>

            <button
              type="button"
              className={`${styles.pricingOption} ${
                !isRange ? styles.selected : ""
              }`}
              aria-pressed={!isRange}
              onClick={() => onChange("pricingType", "agreement")}
            >
              <span className={styles.radio}>
                {!isRange && <span className={styles.radioInner} />}
              </span>

              <span className={styles.optionContent}>
                <strong>A convenir</strong>
                <small>Definí el precio al coordinar el trabajo.</small>
              </span>
            </button>
          </div>
        </div>

        {isRange ? (
          <div className={styles.priceFields}>
            <div className={styles.field}>
              <label htmlFor="service-price-min">Precio mínimo</label>

              <div className={styles.priceInputWrapper}>
                <span className={styles.currency}>$</span>

                <input
                  id="service-price-min"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={formData.priceMin}
                  onChange={(event) =>
                    handlePriceChange("priceMin", event.target.value)
                  }
                  placeholder="15000"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="service-price-max">Precio máximo</label>

              <div className={styles.priceInputWrapper}>
                <span className={styles.currency}>$</span>

                <input
                  id="service-price-max"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={formData.priceMax}
                  onChange={(event) =>
                    handlePriceChange("priceMax", event.target.value)
                  }
                  placeholder="25000"
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.agreementNotice}>
            <span className={styles.noticeIcon}>
              <Info size={17} aria-hidden="true" />
            </span>

            <div>
              <strong>Precio a convenir con el cliente</strong>

              <p>
                Podrás coordinar el costo final con el cliente según el tipo de
                trabajo, los materiales y las características del servicio.
              </p>
            </div>
          </div>
        )}

        <div className={styles.priceHint}>
          <Info size={15} aria-hidden="true" />

          <p>
            El precio es orientativo. ServisMás no procesa pagos; la
            contratación y el acuerdo económico se coordinan entre el cliente y
            el prestador.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
