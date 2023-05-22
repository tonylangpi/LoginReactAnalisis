import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import styles from './Antecedentes.module.scss';
import { text } from '@fortawesome/fontawesome-svg-core';

const FormPrenatales = ({idBen}) => {

  const [isPrenatal, setPrenatal] = useState(false);
  const [textbox, setTextBox] = React.useState({
    textbox1: false,
    textbox2: false,
    textbox3: false
  });

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

  const showTextBox = (num)=>{
    if (num == 1) {
      textbox.textbox1 = true;
    } else if (num == 2) {
      textbox.textbox2 = true;
    } else if (num == 3) {
      textbox.textbox3 = true;
    }
  }

  const hideTextBox = (num)=>{
    if (num == 1) {
      textbox.textbox1 = false;
    } else if (num == 2) {
      textbox.textbox2 = false;
    } else if (num == 3) {
      textbox.textbox3 = false;
    }
  }

  const savePrenatal = (e) => {
    e.preventDefault();
    try {
        if(idBen != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createPrenatales/${idBen}`, Prenatales)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial prenatal")
                : alert(mensaje)
                setPrenatal(true);
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
    <div id="FormPrenatales" className={styles.Container}>

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
                disabled={isPrenatal}
                onClick={() => hideTextBox(1)}
                onChange={saveDataTemporalyPrenatal}
                type="radio"
                name="EMBARAZO_TERMINO" />SI
            </div>
            <div className={styles.ContainerRadio__Radio}>
              <input
                required
                value="NO"
                disabled={isPrenatal}
                onClick={() => showTextBox(1)}
                onChange={saveDataTemporalyPrenatal}
                type="radio"
                name="EMBARAZO_TERMINO" />NO
            </div>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div hidden={!textbox.textbox1} className={styles.ContainerInput}>
            <textarea 
              disabled={isPrenatal}
              onChange={saveDataTemporalyPrenatal} 
              name='EXPLIQUE_EMBARAZO' 
              className={styles.ContainerInput__Input} 
              placeholder=" ">
            </textarea>
            <span className={styles.ContainerInput__Span}>Explique:</span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <label>¿Fue un embarazo normal?</label>
          <div className={styles.ContainerRadio}>
            <div className={styles.ContainerRadio__Radio}>
              <input 
                required
                onClick={() => hideTextBox(2)}
                value="SI" 
                disabled={isPrenatal} 
                onChange={saveDataTemporalyPrenatal} 
                type="radio" 
                name="PARTO_NORMAL" />SI
            </div>
            <div className={styles.ContainerRadio__Radio}>
              <input 
                required
                onClick={() => showTextBox(2)}
                value="NO" 
                disabled={isPrenatal} 
                onChange={saveDataTemporalyPrenatal} 
                type="radio" 
                name="PARTO_NORMAL" />NO
            </div>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div hidden={!textbox.textbox2} className={styles.ContainerInput}>
            <textarea 
              disabled={isPrenatal} 
              onChange={saveDataTemporalyPrenatal} 
              name='EXPLIQUE_PARTO' 
              className={styles.ContainerInput__Input} 
              placeholder=" ">
            </textarea>
            <span className={styles.ContainerInput__Span}>Explique:</span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <label htmlFor="">¿Tuvo complicaciones durante el embarazo?</label>
          <div className={styles.ContainerRadio}>
            <div className={styles.ContainerRadio__Radio}>
              <input 
                required 
                onClick={() => showTextBox(3)}
                value="SI" 
                disabled={isPrenatal} 
                onChange={saveDataTemporalyPrenatal} 
                type="radio" 
                name="COMPLICACIONES" />SI
            </div>
            <div className={styles.ContainerRadio__Radio}>
              <input 
                required 
                onClick={() => hideTextBox(3)}
                value="NO" 
                disabled={isPrenatal} 
                onChange={saveDataTemporalyPrenatal} 
                type="radio" 
                name="COMPLICACIONES" />NO
            </div>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div hidden={!textbox.textbox3} className={styles.ContainerInput}>
            <textarea 
              disabled={isPrenatal}
              onChange={saveDataTemporalyPrenatal} 
              name='EXPLIQUE_COMPLICACION' 
              className={styles.ContainerInput__Input} 
              placeholder=" ">
            </textarea>
            <span className={styles.ContainerInput__Span}>Explique:</span>
          </div>
        </div>

        {!isPrenatal ? (
          <div className='Container-Beneficiario__Grid-button'>
            <button id="Prenatales" className="Button Button--Guardar">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-file-export" />
              </div>
              <span className="Button__Span Iniciar">Guardar</span>
            </button>
          </div>
        ) : null}

      </form>

    </div>
  )
}

export default FormPrenatales