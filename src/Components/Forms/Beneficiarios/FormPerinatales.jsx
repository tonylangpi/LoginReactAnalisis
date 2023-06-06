import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styles from "./Antecedentes.module.scss";
import FormPostNatal from "./FormPostNatal";

const FormPerinatales = ({ idBen, showComponent }) => {
  const [show, setShow] = useState(true);
  const [isPerinatal, setPerinatal] = useState(true);
  const [Perinatal, setPerinatales] = React.useState({
    LLORO_INMEDIATAMENTE: "",
    COLORACION: "",
    INCUBADORA: "",
    COLOR: "",
  });

  const saveDataTemporalyPerinatal = (e) => {
    e.preventDefault();
    setPerinatales({
      ...Perinatal,
      [e.target.name]: e.target.value,
    });
  };

  const savePerinatal = (e) => {
    e.preventDefault();
    try {
      if (idBen != null) {
        axios
          .post(
            `https://amordownapi-production.up.railway.app/beneficiarios/createPeriNatales/${idBen}`,
            Perinatal
          )
          .then(function (response) {
            const mensaje = response?.data?.message;
            !mensaje
              ? alert("sucedio un error al registrar el historial perinatal")
              : alert(mensaje);
            setShow(false);
            setPerinatal(false);
          })
          .catch(function (response) {
            alert("No se ha encontrado un registro");
            console.log(response);
          });
      } else {
        alert("No se encontro el id del beneficiario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      hidden={showComponent}
      id="FormPeriNatales"
      className={showComponent ? "" : styles.Container}
    >
      {isPerinatal ? (
        <div className={styles.Container}>
          <div className={styles.Titulo}>
            <h1>Antecedentes Peri-Natales</h1>
          </div>

          <form onSubmit={savePerinatal} className={styles.Form}>
            <div className={styles.Grid}>
              <div className={styles.Grid__item}>
                <label>¿El niño lloro inmediatamente?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      onMouseDown={saveDataTemporalyPerinatal}
                      value="SI"
                      type="radio"
                      name="LLORO_INMEDIATAMENTE"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPerinatal}
                      type="radio"
                      name="LLORO_INMEDIATAMENTE"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Su coloracion fue normal?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPerinatal}
                      type="radio"
                      name="COLORACION"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPerinatal}
                      type="radio"
                      name="COLORACION"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Estuvo en incubadora?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPerinatal}
                      type="radio"
                      name="INCUBADORA"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPerinatal}
                      type="radio"
                      name="INCUBADORA"
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              <div className={styles.ContainerInput}>
                <textarea
                  name="COLOR"
                  autoComplete="off"
                  required
                  pattern="^[a-zA-Z\s]{5,50}$"
                  onChange={saveDataTemporalyPerinatal}
                  className={styles.ContainerInput__Input}
                  placeholder=" "
                ></textarea>
                <span className={styles.ContainerInput__Span}>
                  ¿Nacio amarillo o morado?:
                </span>
              </div>
            </div>

            {isPerinatal ? (
              <div className="Container-Beneficiario__Grid-button">
                <button className="Button Button--Guardar">
                  <div className="Button__Icono">
                    <FontAwesomeIcon icon="fa-solid fa-file-export" />
                  </div>
                  <span className="Button__Span Iniciar">Guardar</span>
                </button>
              </div>
            ) : null}
          </form>
        </div>
      ) : null}

      <FormPostNatal showComponent={show} idBen={idBen} />
    </div>
  );
};

export default FormPerinatales;
