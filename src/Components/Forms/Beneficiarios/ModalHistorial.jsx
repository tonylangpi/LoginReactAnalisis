import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalHistorial({ beneficiary, onClose }) {
  const [historial, setHistorial] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(
          `https://amordownapi-production.up.railway.app/beneficiarios/buscarHistorialClinicoBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setHistorial(response.data[0]); // Asumiendo que la respuesta es un arreglo de un solo elemento
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener el historial clínico:", error);
      }
    };

    fetchHistorial();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarHistorial = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBeneHistorialClinico/${beneficiary.ID_BENEFICIARIO}`,
        historial
      );
      alert("Historial actualizado correctamente");
      onClose();
    } catch (error) {
      alert("Error al actualizar el historial clínico:", error);
    }
  };

  const changeHistorial = (e) => {
    e.preventDefault();
    setHistorial({ ...historial, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Cargando historial clínico...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2 className={styles.Titulo}>Historial Clínico</h2>

        <form onSubmit={actualizarHistorial} className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                autoComplete="off"
                type="text"
                required
                pattern="^[a-zA-Z\s]{5,100}$"
                name="MEDICAMENTOS_INGIERE"
                value={historial.MEDICAMENTOS_INGIERE}
                onChange={(e) => changeHistorial(e)}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Medicamentos que ingiere:
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                autoComplete="off"
                type="text"
                required
                pattern="^[a-zA-Z\s]{5,100}$"
                name="ENFERMEDAD_PADECE"
                value={historial.ENFERMEDAD_PADECE}
                onChange={(e) => changeHistorial(e)}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Enfermedades que padece:
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                name="VACUNAS"
                className={styles.ContainerInput__Input}
                value={historial.VACUNAS}
                onChange={(e) => changeHistorial(e)}
              >
                <option value="SI" selected={historial.VACUNAS === "SI"}>
                  SI
                </option>
                <option value="NO" selected={historial.VACUNAS === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Esquema Completo de Vacunas?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="AUDICION"
                required
                className={styles.ContainerInput__Input}
                value={historial.AUDICION}
                onChange={(e) => changeHistorial(e)}
              >
                <option value="SI" selected={historial.AUDICION === "SI"}>
                  SI
                </option>
                <option value="NO" selected={historial.AUDICION === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Tiene Examenes Auditivos?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="ORFTAMOLOGICAS"
                required
                className={styles.ContainerInput__Input}
                value={historial.ORFTAMOLOGICAS}
                onChange={(e) => changeHistorial(e)}
              >
                <option value="SI" selected={historial.ORFTAMOLOGICAS === "SI"}>
                  SI
                </option>
                <option value="NO" selected={historial.ORFTAMOLOGICAS === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Tiene Pruebas Oftamologicas?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                name="APARATO_AUDITIVO"
                className={styles.ContainerInput__Input}
                value={historial.APARATO_AUDITIVO}
                onChange={(e) => changeHistorial(e)}
              >
                <option
                  value="SI"
                  selected={historial.APARATO_AUDITIVO === "SI"}
                >
                  SI
                </option>
                <option
                  value="NO"
                  selected={historial.APARATO_AUDITIVO === "NO"}
                >
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Usa Aparatos Auditivos?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="LENTES"
                required
                className={styles.ContainerInput__Input}
                value={historial.LENTES}
                onChange={(e) => changeHistorial(e)}
              >
                <option value="SI" selected={historial.LENTES === "SI"}>
                  SI
                </option>
                <option value="NO" selected={historial.LENTES === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>¿Lentes?</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="CIRUJIAS"
                required
                className={styles.ContainerInput__Input}
                value={historial.CIRUJIAS}
                onChange={(e) => changeHistorial(e)}
              >
                <option value="SI" selected={historial.CIRUJIAS === "SI"}>
                  SI
                </option>
                <option value="NO" selected={historial.CIRUJIAS === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Ha tenido Cirugias?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                value={historial.DISCAPACIDAD}
                className={styles.ContainerInput__Input}
                name="DISCAPACIDAD"
                onChange={(e) => changeHistorial(e)}
              >
                <option value=""></option>
                <option
                  value="Fisica Motora"
                  selected={historial.DISCAPACIDAD === "Fisica Motora"}
                >
                  Fisica Motora
                </option>
                <option
                  value="Visual"
                  selected={historial.DISCAPACIDAD === "Visual"}
                >
                  Visual
                </option>
                <option
                  value="Auditiva"
                  selected={historial.DISCAPACIDAD === "Auditiva"}
                >
                  Auditiva
                </option>
                <option
                  value="Mental"
                  selected={historial.DISCAPACIDAD === "Mental"}
                >
                  Mental
                </option>
                <option
                  value="Otra"
                  selected={historial.DISCAPACIDAD === "Otra"}
                >
                  Otra
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Tipo de Discapacidad
              </span>
            </div>
          </div>

          <div className={styles.ContainerHistorial__item}>
            <div className={styles.ContainerInput}>
              <input
                required
                name="DIAGNOSTICO"
                type="text"
                pattern="^[a-zA-Z\s]{5,50}$"
                value={historial.DIAGNOSTICO}
                onChange={(e) => changeHistorial(e)}
                className={styles.ContainerInput__Input}
                placeholder=" "
              />
              <span className={styles.ContainerInput__Span}>Diagnostico:</span>
            </div>
          </div>

          <div className={styles.ContainerHistorial__item}>
            <div className={styles.ContainerInput}>
              <input
                required
                pattern="^[a-zA-Z\s]{5,50}$"
                name="OTRAS"
                type="text"
                value={historial.OTRAS}
                onChange={(e) => changeHistorial(e)}
                className={styles.ContainerInput__Input}
                placeholder=" "
              />
              <span className={styles.ContainerInput__Span}>Otros:</span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
              </div>
              <span className={styles.Button__Span}>Actualizar</span>
            </button>
          </div>

          <div className={styles.Grid__button}>
            <span className={styles.Close} onClick={onClose}>
              <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
              {/* &times; */}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalHistorial;
