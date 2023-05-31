import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalPostNatal({ beneficiary, onClose }) {
  const [postnatal, setPostnatal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostnatal = async () => {
      try {
        const response = await axios.get(
          `https://amordownapi-production.up.railway.app/beneficiarios/buscarPostNatalesBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setPostnatal(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchPostnatal();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPostnatal = async () => {
    try {
      await axios.post(
        `https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePostnatales/${beneficiary.ID_BENEFICIARIO}`,
        postnatal
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
        <h2 className={styles.Titulo}>Información Postnatal</h2>

        <div className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={postnatal.TRATAMIENTO}
                onChange={(e) =>
                  setPostnatal({ ...postnatal, TRATAMIENTO: e.target.value })
                }
                className={styles.ContainerInput__Input}
              >
                <option value="SI" selected={postnatal.TRATAMIENTO === "SI"}>
                  SI
                </option>
                <option value="NO" selected={postnatal.TRATAMIENTO === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                tratamiento del parto
              </span>
            </div>
          </div>

          <div className={styles.ContainerInput}>
            <select
              value={postnatal.INFECCIONES}
              onChange={(e) =>
                setPostnatal({ ...postnatal, INFECCIONES: e.target.value })
              }
              className={styles.ContainerInput__Input}
            >
              <option value="SI" selected={postnatal.INFECCIONES === "SI"}>
                SI
              </option>
              <option value="NO" selected={postnatal.INFECCIONES === "NO"}>
                NO
              </option>
            </select>
            <span className={styles.ContainerInput__Span}>
              ¿Tuvo infecciones?
            </span>
          </div>

          <div className={styles.ContainerInput}>
            <select
              value={postnatal.FIEBRE}
              onChange={(e) =>
                setPostnatal({ ...postnatal, FIEBRE: e.target.value })
              }
              className={styles.ContainerInput__Input}
            >
              <option value="SI" selected={postnatal.FIEBRE === "SI"}>
                SI
              </option>
              <option value="NO" selected={postnatal.FIEBRE === "NO"}>
                NO
              </option>
            </select>
            <span className={styles.ContainerInput__Span}>¿Tuvo Fiebre?</span>
          </div>

          <div className={styles.ContainerInput}>
            <select
              value={postnatal.CONVULCIONES}
              onChange={(e) =>
                setPostnatal({ ...postnatal, CONVULCIONES: e.target.value })
              }
              className={styles.ContainerInput__Input}
            >
              <option value="SI" selected={postnatal.CONVULCIONES === "SI"}>
                SI
              </option>
              <option value="NO" selected={postnatal.CONVULCIONES === "NO"}>
                NO
              </option>
            </select>
            <span className={styles.ContainerInput__Span}>
              ¿Tuvo convulciones?
            </span>
          </div>

          <div className={styles.ContainerInput}>
            <select
              value={postnatal.LENGUAJE}
              onChange={(e) =>
                setPostnatal({ ...postnatal, LENGUAJE: e.target.value })
              }
              className={styles.ContainerInput__Input}
            >
              <option value="SI" selected={postnatal.LENGUAJE === "SI"}>
                SI
              </option>
              <option value="NO" selected={postnatal.LENGUAJE === "NO"}>
                NO
              </option>
            </select>
            <span className={styles.ContainerInput__Span}>
              ¿Tiene lenguaje?
            </span>
          </div>

          <div className={styles.ContainerInput}>
            <select
              value={postnatal.CAMINA}
              onChange={(e) =>
                setPostnatal({ ...postnatal, CAMINA: e.target.value })
              }
              className={styles.ContainerInput__Input}
            >
              <option value="SI" selected={postnatal.CAMINA === "SI"}>
                SI
              </option>
              <option value="NO" selected={postnatal.CAMINA === "NO"}>
                NO
              </option>
            </select>
            <span className={styles.ContainerInput__Span}>¿Camina?</span>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="text"
                value={postnatal.OBSERVACIONES}
                onChange={(e) =>
                  setPostnatal({ ...postnatal, OBSERVACIONES: e.target.value })
                }
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>Observaciones</span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button} onClick={actualizarPostnatal}>
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

export default ModalPostNatal;
