import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styles from "./Antecedentes.module.scss";
import { Link } from "react-router-dom";

const FormPostNatal = ({ idBen, showComponent }) => {
  const [isPostnatal, setPostnatal] = useState(true);
  const [Postnatal, setPostnatales] = React.useState({
    TRATAMIENTO: "",
    INFECCIONES: "",
    FIEBRE: "",
    CONVULCIONES: "",
    LENGUAJE: "",
    CAMINA: "",
    OBSERVACIONES: "",
  });

  const saveDataTemporalyPostnatal = (e) => {
    e.preventDefault();
    setPostnatales({
      ...Postnatal,
      [e.target.name]: e.target.value,
    });
  };

  const savePostnatal = (e) => {
    e.preventDefault();
    try {
      if (idBen != null) {
        axios
          .post(
            `https://amordownapi-production.up.railway.app/beneficiarios/createPostNatales/${idBen}`,
            Postnatal
          )
          .then(function (response) {
            const mensaje = response?.data?.message;
            !mensaje
              ? alert("sucedio un error al registrar el historial perinatal")
              : alert(mensaje);
            setPostnatal(false);
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
      {isPostnatal ? (
        <div className={styles.Container}>
          <div className={styles.Titulo}>
            <h1>Antecedentes Post-Natales</h1>
          </div>

          <form onSubmit={savePostnatal} className={styles.Form}>
            <div className={styles.Grid}>
              <div className={styles.Grid__item}>
                <label>¿Tuvo tratamiento despues del parto?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="TRATAMIENTO"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="TRATAMIENTO"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Tuvo infecciones?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="INFECCIONES"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="INFECCIONES"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Tuvo Fiebre?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="FIEBRE"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="FIEBRE"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Tuvo convulciones?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="CONVULCIONES"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="CONVULCIONES"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Tiene lenguaje?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="LENGUAJE"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="LENGUAJE"
                    />
                    NO
                  </div>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <label>¿Camina?</label>
                <div className={styles.ContainerRadio}>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="SI"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="CAMINA"
                    />
                    SI
                  </div>
                  <div className={styles.ContainerRadio__Radio}>
                    <input
                      required
                      value="NO"
                      onMouseDown={saveDataTemporalyPostnatal}
                      type="radio"
                      name="CAMINA"
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              <div className={styles.ContainerInput}>
                <textarea
                  required
                  pattern="/^[a-zA-Z]{5,50}$/"
                  name="OBSERVACIONES"
                  onChange={saveDataTemporalyPostnatal}
                  className={styles.ContainerInput__Input}
                  placeholder=" "
                ></textarea>
                <span className={styles.ContainerInput__Span}>
                  Observaciones
                </span>
              </div>
            </div>

            {isPostnatal ? (
              <Link className={styles.Button} to="/FormListarBeneficiarios">
                <div className={styles.Button__Icono}>
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className={styles.Button__Span}>Guardar</span>
              </Link>
            ) : // <div className="Container-Beneficiario__Grid-button">
            //   <button onClick={showOtherComponent} id="Postnatales" className="Button Button--Guardar" >
            //     <div className="Button__Icono">
            //       <FontAwesomeIcon icon="fa-solid fa-file-export" />
            //     </div>
            //     <span className="Button__Span Iniciar">Guardar</span>
            //   </button>
            // </div>
            null}
          </form>
        </div>
      ) : null}
      {/* <Link className={styles.Button} to="/FormListarBeneficiarios">
        <div className={styles.Button__Icono}>
          <FontAwesomeIcon icon="fa-solid fa-file-export" />
        </div>
        <span className={styles.Button__Span}>Actualizar</span>
      </Link> */}
    </div>
  );
};

export default FormPostNatal;
