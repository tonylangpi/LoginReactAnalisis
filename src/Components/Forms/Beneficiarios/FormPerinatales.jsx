import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import styles from './Antecedentes.module.scss';
const FormPerinatales = ({idBen}) => {
    const [isPerinatal, setPerinatal] = useState(false);

    const [Perinatal, setPerinatales] = React.useState({
        LLORO_INMEDIATAMENTE: "",
        COLORACION: "",
          INCUBADORA: "",
          COLOR: ""
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
        if(idBen != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createPeriNatales/${idBen}`, Perinatal)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial perinatal")
                : alert(mensaje)
                setPerinatal(true);
            })
            .catch(function (response) {
              alert("No se ha encontrado un registro");
              console.log(response);
            });
        }else{
            alert("No se encontro el id del beneficiario");
        }
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="FormPeriNatales" className={styles.Container}>
      <div className={styles.Titulo}>
        <h1>Antecedentes Peri-Natales</h1>
      </div>

      <form onSubmit={savePerinatal} className={styles.Form}>

        <div className={styles.Grid}>

          <div className={styles.Grid__item}>
            <label htmlFor="">¿El niño lloro inmediatamente?</label>
            <div className={styles.ContainerRadio}>
              <div className={styles.ContainerRadio__Radio}>
                <input
                  required
                  disabled={isPerinatal}
                  onChange={saveDataTemporalyPerinatal}
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
                  disabled={isPerinatal}
                  onChange={saveDataTemporalyPerinatal}
                  type="radio"
                  name="LLORO_INMEDIATAMENTE"
                />
                NO
              </div>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <label htmlFor="">¿Su coloracion fue normal?</label>
            <div className={styles.ContainerRadio}>
              <div className={styles.ContainerRadio__Radio}>
                <input 
                  required value="SI" 
                  disabled={isPerinatal} 
                  onChange={saveDataTemporalyPerinatal} 
                  type="radio" 
                  name="COLORACION" />
                SI
              </div>
              <div className={styles.ContainerRadio__Radio}>
                <input 
                  required value="NO" 
                  disabled={isPerinatal} 
                  onChange={saveDataTemporalyPerinatal} 
                  type="radio" 
                  name="COLORACION" />
                NO
              </div>
            </div>
          </div>

          <div className={styles.Grid__item}>

            <label htmlFor="">¿Estuvo en incubadora?</label>
            <div className={styles.ContainerRadio}>
              <div className={styles.ContainerRadio__Radio}>
                <input 
                  required value="SI" 
                  disabled={isPerinatal} 
                  onChange={saveDataTemporalyPerinatal}
                  type="radio" 
                  name="INCUBADORA" />
                SI
              </div>
              <div className={styles.ContainerRadio__Radio}>
                <input 
                  required value="NO" 
                  disabled={isPerinatal} 
                  onChange={saveDataTemporalyPerinatal}
                  type="radio" 
                  name="INCUBADORA" />
                NO
              </div>
            </div>
          </div>

        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <textarea
              name="COLOR"
              onChange={saveDataTemporalyPerinatal} 
              disabled={isPerinatal}
              className={styles.ContainerInput__Input}
              placeholder=" ">
            </textarea>
            <span className={styles.ContainerInput__Span}>
              ¿Nacio amarillo o morado?:
            </span>
          </div>
        </div>

        {!isPerinatal ? (
            <div className="Container-Beneficiario__Grid-button">
          <button id="Perinatales" className="Button Button--Guardar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-file-export" />
            </div>
            <span className="Button__Span Iniciar">Guardar</span>
          </button>
        </div>
            ) : null}
      </form>
    </div>
  );
};

export default FormPerinatales;
