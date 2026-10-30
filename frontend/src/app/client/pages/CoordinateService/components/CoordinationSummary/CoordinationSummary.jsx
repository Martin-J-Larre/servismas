import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Wrench,
  Send,
  Check,
  ArrowRight,
} from "lucide-react";

import { timeSlots } from "../../utils/coordination.utils";

import styles from "./CoordinationSummary.module.css";

const CoordinationSummary = ({
  title,
  request,
  serviceDate,
  timeSlot,
  address,
  isSent,
  isWaiting,
  isAccepted,
  isConfirmed,
  onSubmit,
  onContinueWaiting,
  onSimulateAcceptance,
  onConfirmCoordination,
  onViewTracking,
  serviceDateValue,
  onServiceDateChange,
  onTimeSlotChange,
  onAddressChange,
  comments,
  onCommentsChange,
  notice,
}) => {
  const providerName = request.providerName || "Prestador";
  const specialty =
    request.category || request.specialty || "Servicio general";

  return (
    <section className={styles.summaryCard}>
      <span className={styles.sidebarEyebrow}>RESUMEN</span>

      <h2 className={styles.summaryTitle}>{title}</h2>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <UserRound size={15} />

          <div>
            <span>Prestador</span>
            <strong>{providerName}</strong>
          </div>
        </div>

        <div className={styles.summaryRow}>
          <Wrench size={15} />

          <div>
            <span>Servicio</span>
            <strong>{specialty}</strong>
          </div>
        </div>

        <div className={styles.summaryRow}>
          <CalendarDays size={15} />

          <div>
            <span>Fecha</span>
            <strong>{serviceDate || "Sin seleccionar"}</strong>
          </div>
        </div>

        <div className={styles.summaryRow}>
          <Clock3 size={15} />

          <div>
            <span>Horario</span>
            <strong>{timeSlot || "Sin seleccionar"}</strong>
          </div>
        </div>

        <div className={styles.summaryRow}>
          <MapPin size={15} />

          <div>
            <span>Dirección</span>
            <strong>{address || "Sin especificar"}</strong>
          </div>
        </div>
      </div>

      <div className={styles.notice}>
        <p>{notice}</p>
      </div>

      {!isSent && (
        <form className={styles.sidebarForm} onSubmit={onSubmit}>
          <h3>Proponer coordinación</h3>

          <div className={styles.compactField}>
            <label htmlFor="service-date">Fecha del servicio</label>

            <input
              id="service-date"
              type="date"
              value={serviceDateValue}
              onChange={(event) => onServiceDateChange(event.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
              required
            />
          </div>

          <div className={styles.compactField}>
            <label htmlFor="service-time">Horario preferido</label>

            <select
              id="service-time"
              value={timeSlot}
              onChange={(event) => onTimeSlotChange(event.target.value)}
              required
            >
              <option value="">Seleccioná un horario</option>

              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.compactField}>
            <label htmlFor="service-address">Dirección del servicio</label>

            <input
              id="service-address"
              type="text"
              value={address}
              onChange={(event) => onAddressChange(event.target.value)}
              placeholder="Ingresá la dirección"
              required
            />
          </div>

          <div className={styles.compactField}>
            <label htmlFor="service-comments">
              Comentarios adicionales
            </label>

            <textarea
              id="service-comments"
              value={comments}
              onChange={(event) => onCommentsChange(event.target.value)}
              placeholder="Agregá indicaciones para el prestador..."
              rows={3}
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            <Send size={15} />
            Enviar propuesta
          </button>
        </form>
      )}

      {isSent && (
        <div className={styles.actions}>
          {isSent && !isWaiting && !isAccepted && !isConfirmed && (
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={onContinueWaiting}
            >
              Continuar a estado en espera
              <ArrowRight size={15} />
            </button>
          )}

          {isWaiting && (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onSimulateAcceptance}
            >
              <Check size={15} />
              Simular aceptación del prestador
            </button>
          )}

          {isAccepted && (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onConfirmCoordination}
            >
              <Check size={15} />
              Confirmar coordinación
            </button>
          )}

          {isConfirmed && (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onViewTracking}
            >
              Ver seguimiento
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default CoordinationSummary;