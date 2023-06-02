import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalPreNatal({ beneficiary, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [prenatal, setPrenatal] = useState({});
  useEffect(() => {
    const fetchPrenatal = async () => {
      try {
        const response = await axios.get(
          `https://amordownapi-production.up.railway.app/beneficiarios/buscarPrenatalesBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setPrenatal(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchPrenatal();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPrenatal = async () => {
    try {
      await axios.post(
        `https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePrenatales/${beneficiary.ID_BENEFICIARIO}`,
        prenatal
      );
      alert("Información actualizada correctamente");
    } catch (error) {
      alert("Error al actualizar la información:", error);
    }
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2>Información Prenatal</h2>

        <div className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={prenatal.EMBARAZO_TERMINO}
                onChange={(e) =>
                  setPrenatal({ ...prenatal, EMBARAZO_TERMINO: e.target.value })
                }
                className={styles.ContainerInput__Input}
              >
                <option
                  value="SI"
                  selected={prenatal.EMBARAZO_TERMINO === "SI"}
                >
                  SI
                </option>
                <option
                  value="NO"
                  selected={prenatal.EMBARAZO_TERMINO === "NO"}
                >
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Embarazo a Termino
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="text"
                value={prenatal.EXPLIQUE_EMBARAZO}
                onChange={(e) =>
                  setPrenatal({
                    ...prenatal,
                    EXPLIQUE_EMBARAZO: e.target.value,
                  })
                }
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Explique embarazo a termino
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={prenatal.PARTO_NORMAL}
                onChange={(e) =>
                  setPrenatal({ ...prenatal, PARTO_NORMAL: e.target.value })
                }
                className={styles.ContainerInput__Input}
              >
                <option value="SI" selected={prenatal.PARTO_NORMAL === "SI"}>
                  SI
                </option>
                <option value="NO" selected={prenatal.PARTO_NORMAL === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Embarazo Normal
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="text"
                value={prenatal.EXPLIQUE_PARTO}
                onChange={(e) =>
                  setPrenatal({ ...prenatal, EXPLIQUE_PARTO: e.target.value })
                }
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Explique embarazo normal
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={prenatal.COMPLICACIONES}
                onChange={(e) =>
                  setPrenatal({ ...prenatal, COMPLICACIONES: e.target.value })
                }
                className={styles.ContainerInput__Input}
              >
                <option value="SI" selected={prenatal.COMPLICACIONES === "SI"}>
                  SI
                </option>
                <option value="NO" selected={prenatal.COMPLICACIONES === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Complicaciones en embarazo
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="text"
                value={prenatal.EXPLIQUE_COMPLICACION}
                onChange={(e) =>
                  setPrenatal({
                    ...prenatal,
                    EXPLIQUE_COMPLICACION: e.target.value,
                  })
                }
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Explique complicaciones
              </span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button} onClick={actualizarPrenatal}>
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
        </div>
      </div>
    </div>
  );
}

export default ModalPreNatal;