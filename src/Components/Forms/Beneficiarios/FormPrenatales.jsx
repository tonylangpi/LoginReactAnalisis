import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styles from "./Antecedentes.module.scss";
import { text } from "@fortawesome/fontawesome-svg-core";
import FormPerinatales from "./FormPerinatales";
import {useAuth} from "../../../context/authContext.jsx"
const FormPrenatales = ({ idBen, showComponent }) => {
  const [show, setShow] = useState(true);
  const [isPrenatal, setPrenatal] = useState(true);
  const { Api } = useAuth();
  const [Prenatales, setPrenatales] = React.useState({
    EMBARAZO_TERMINO: "",
    EXPLIQUE_EMBARAZO: "",
    PARTO_NORMAL: "",
    EXPLIQUE_PARTO: "",
    COMPLICACIONES: "",
    EXPLIQUE_COMPLICACION: "",
  });

  const saveDataTemporalyPrenatal = (e) => {
    e.preventDefault();
    setPrenatales({
      ...Prenatales,
      [e.target.name]: e.target.value,
    });
  };

  const savePrenatal = (e) => {
    e.preventDefault();
    try {
      if (idBen != null) {
        axios
          .post(
            `${Api}beneficiarios/createPrenatales/${idBen}`,
            Prenatales
          )
          .then(function (response) {
            const mensaje = response?.data?.message;
            !mensaje
              ? alert("sucedio un error al registrar el historial prenatal")
              : alert(mensaje);
            setShow(false);
            setPrenatal(false);
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
      className={showComponent ? "" : styles.Container}
    >
      {isPrenatal ? (
        <div className={styles.Container}>
          <div className={styles.Titulo}>
            <h1>Antecedentes Pre-Natales</h1>
          </div>

          <form onSubmit={savePrenatal} className={styles.Form}>
            <div className={styles.Grid__item}>
              <label>¿Fue un embarazo a termino?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="SI"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="EMBARAZO_TERMINO"
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="NO"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="EMBARAZO_TERMINO"
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              {Prenatales.EMBARAZO_TERMINO == "NO" ? (
                <div className={styles.ContainerInput}>
                  <textarea
                    required={Prenatales.EMBARAZO_TERMINO == "NO" ? true : false}
                    autoComplete="off"
                    pattern="^[a-zA-Z\s]{3,50}$"
                    onChange={saveDataTemporalyPrenatal}
                    name="EXPLIQUE_EMBARAZO"
                    className={styles.ContainerInput__Input}
                    placeholder=" "
                  ></textarea>
                  <span className={styles.ContainerInput__Span}>Explique:</span>
                </div>
              ) : null}
            </div>

            <div className={styles.Grid__item}>
              <label>¿Fue un embarazo normal?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="SI"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="PARTO_NORMAL"
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="NO"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="PARTO_NORMAL"
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              {Prenatales.PARTO_NORMAL == "NO" ? (
                <div className={styles.ContainerInput}>
                  <textarea
                  required={Prenatales.PARTO_NORMAL == "NO" ? true : false}
                    autoComplete="off"
                    pattern="^[a-zA-Z\s]{3,50}$"
                    onChange={saveDataTemporalyPrenatal}
                    name="EXPLIQUE_PARTO"
                    className={styles.ContainerInput__Input}
                    placeholder=" "
                  ></textarea>
                  <span className={styles.ContainerInput__Span}>Explique:</span>
                </div>
              ) : null}
            </div>

            <div className={styles.Grid__item}>
              <label>¿Tuvo complicaciones durante el embarazo?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="SI"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="COMPLICACIONES"
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="NO"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="COMPLICACIONES"
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              {Prenatales.COMPLICACIONES == "SI" ? (
                <div className={styles.ContainerInput}>
                  <textarea
                    required={Prenatales.COMPLICACIONES == "SI" ? true : false}
                    autoComplete="off"
                    pattern="^[a-zA-Z\s]{3,50}$"
                    onChange={saveDataTemporalyPrenatal}
                    name="EXPLIQUE_COMPLICACION"
                    className={styles.ContainerInput__Input}
                    placeholder=" "
                  ></textarea>
                  <span className={styles.ContainerInput__Span}>Explique:</span>
                </div>
              ) : null}
            </div>

            <div className="Container-Beneficiario__Grid-button">
              <button className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <FormPerinatales showComponent={show} idBen={idBen} />
    </div>
  );
};

export default FormPrenatales;
