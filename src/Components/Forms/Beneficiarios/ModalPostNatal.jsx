import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/authContext.jsx"
function ModalPostNatal({ beneficiary, onClose }) {
  const [postnatal, setPostnatal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { Api } = useAuth();
  useEffect(() => {
    const fetchPostnatal = async () => {
      try {
        const response = await axios.get(
          `${Api}beneficiarios/buscarPostNatalesBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setPostnatal(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchPostnatal();
  }, []);

  const actualizarPostnatal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${Api}beneficiarios/updateInfoBenePostnatales/${beneficiary.ID_BENEFICIARIO}`,
        postnatal
      );
      alert("Información actualizada correctamente");
      onClose();
    } catch (error) {
      alert("Error al actualizar la información:", error);
    }
  };

  const changePostNatal = (e) => {
    e.preventDefault();
    setPostnatal({ ...postnatal, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2 className={styles.Titulo}>Información Postnatal</h2>

        <form onSubmit={actualizarPostnatal} className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                name="TRATAMIENTO"
                value={postnatal.TRATAMIENTO || ""}
                onChange={changePostNatal}
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
              required
              name="INFECCIONES"
              value={postnatal.INFECCIONES}
              onChange={changePostNatal}
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
              required
              name="FIEBRE"
              value={postnatal.FIEBRE}
              onChange={changePostNatal}
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
              required
              name="CONVULCIONES"
              value={postnatal.CONVULCIONES}
              onChange={changePostNatal}
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
              required
              name="LENGUAJE"
              value={postnatal.LENGUAJE}
              onChange={changePostNatal}
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
              required
              name="CAMINA"
              value={postnatal.CAMINA}
              onChange={changePostNatal}
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
                name="OBSERVACIONES"
                pattern="^[a-zA-Z\s]{3,50}$"
                type="text"
                value={postnatal.OBSERVACIONES}
                onChange={changePostNatal}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></input>
              <span className={styles.ContainerInput__Span}>Observaciones</span>
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

export default ModalPostNatal;
