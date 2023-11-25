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
          `http://localhost:4000/beneficiarios/buscarPrenatalesBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setPrenatal(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchPrenatal();
  }, []);

  const actualizarPrenatal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/beneficiarios/updateInfoBenePrenatales/${beneficiary.ID_BENEFICIARIO}`,
        prenatal
      );
      alert("Información actualizada correctamente");
    } catch (error) {
      alert("Error al actualizar la información:", error);
    }
  };

  const changePreNatal = (e) => {
    e.preventDefault();
    setPrenatal({ ...prenatal, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2>Información Prenatal</h2>

        <form onSubmit={actualizarPrenatal} className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                name="EMBARAZO_TERMINO"
                value={prenatal.EMBARAZO_TERMINO}
                onChange={changePreNatal}
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
                required
                pattern="^[a-zA-Z\s]{3,50}$"
                name="EXPLIQUE_EMBARAZO"
                type="text"
                value={prenatal.EXPLIQUE_EMBARAZO}
                onChange={changePreNatal}
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
                required
                name="PARTO_NORMAL"
                value={prenatal.PARTO_NORMAL}
                onChange={changePreNatal}
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
                required
                name="EXPLIQUE_PARTO"
                type="text"
                pattern="^[a-zA-Z\s]{3,50}$"
                value={prenatal.EXPLIQUE_PARTO}
                onChange={changePreNatal}
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
                required
                name="COMPLICACIONES"
                value={prenatal.COMPLICACIONES}
                onChange={changePreNatal}
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
                required
                name="EXPLIQUE_COMPLICACION"
                pattern="^[a-zA-Z\s]{3,50}$"
                type="text"
                value={prenatal.EXPLIQUE_COMPLICACION}
                onChange={changePreNatal}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                Explique complicaciones
              </span>
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

export default ModalPreNatal;
