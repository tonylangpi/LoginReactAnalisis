import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalPeri({ beneficiary, onClose }) {
  const [peri, setPeri] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeri = async () => {
      try {
        const response = await axios.get(
          `https://amordownapi-production.up.railway.app/beneficiarios/buscarPerinatalesBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setPeri(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchPeri();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPeri = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePerinatales/${beneficiary.ID_BENEFICIARIO}`,
        peri
      );
      alert("Información actualizada correctamente");
      onClose();
    } catch (error) {
      alert("Error al actualizar la información:", error);
    }
  };

  const changePerinatal = (e) => {
    e.preventDefault();
    setPeri({ ...peri, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2 className={styles.Titulo}>Editar Informacion PeriNatal</h2>

        <form onSubmit={actualizarPeri} className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                name="LLORO_INMEDIATAMENTE"
                value={peri.LLORO_INMEDIATAMENTE}
                onChange={changePerinatal}
                className={styles.ContainerInput__Input}
              >
                <option
                  value="SI"
                  selected={peri.LLORO_INMEDIATAMENTE === "SI"}
                >
                  SI
                </option>
                <option
                  value="NO"
                  selected={peri.LLORO_INMEDIATAMENTE === "NO"}
                >
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Lloro inmediatamente al nacer
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="COLORACION"
                required
                value={peri.COLORACION}
                onChange={changePerinatal}
                className={styles.ContainerInput__Input}
              >
                <option value="SI" selected={peri.COLORACION === "SI"}>
                  SI
                </option>
                <option value="NO" selected={peri.COLORACION === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Su coloracion fue normal?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="INCUBADORA"
                required
                value={peri.INCUBADORA}
                onChange={changePerinatal}
                className={styles.ContainerInput__Input}
              >
                <option value="SI" selected={peri.INCUBADORA === "SI"}>
                  SI
                </option>
                <option value="NO" selected={peri.INCUBADORA === "NO"}>
                  NO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Estuvo en incubadora?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                name="COLOR"
                value={peri.COLOR}
                required
                pattern="^[a-zA-Z\s]{5,50}$"
                onChange={changePerinatal}
                type="text"
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>
                ¿Nacio amarillo o morado?
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

export default ModalPeri;
