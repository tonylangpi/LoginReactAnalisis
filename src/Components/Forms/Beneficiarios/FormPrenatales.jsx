import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import styles from './Antecedentes.module.scss';
import { text } from '@fortawesome/fontawesome-svg-core';
import FormPerinatales from "./FormPerinatales";

const FormPrenatales = ({idBen, showComponent}) => {

  const [show, setShow] = useState(true);
  const [isPrenatal, setPrenatal] = useState(true);
  // const [textbox, setTextBox] = React.useState({
  //   textbox1: true,
  //   textbox2: true,
  //   textbox3: true
  // });
  const [textbox1, setTextBox1] = useState(false);
  const [textbox2, setTextBox2] = useState(false);
  const [textbox3, setTextBox3] = useState(false);

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
      setTextBox1(true);
    } else if (num == 2) {
      setTextBox2(true);
    } else if (num == 3) {
      setTextBox3(true);
    }
  }

  const hideTextBox = (num)=>{
    if (num == 1) {
      setTextBox1(false);
    } else if (num == 2) {
      setTextBox2(false);
    } else if (num == 3) {
      setTextBox3(false);
    }
  }

  const savePrenatal = (e) => {
    e.preventDefault();
    try {
        if(idBen != null){
            axios
            .post(`https://amordownapi-production.up.railway.app/beneficiarios/createPrenatales/${idBen}`, Prenatales)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial prenatal")
                : alert(mensaje)
              setShow(false);
              setPrenatal(false);
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

  const showOtherComponent = () => {
    // setShow(false);
    // setPrenatal(false);
  }

  return (
    <div  hidden={showComponent} id="FormPrenatales" className={showComponent ? '' : styles.Container}>
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
                    onClick={() => hideTextBox(1)}
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="EMBARAZO_TERMINO" />SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    value="NO"
                    onClick={() => showTextBox(1)}
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="EMBARAZO_TERMINO" />NO
                </div>
              </div>
            </div>
 
            <div className={styles.Form__item}>
              {textbox1 ? (
                <div className={styles.ContainerInput}>
                  <textarea
                    onChange={saveDataTemporalyPrenatal}
                    name='EXPLIQUE_EMBARAZO'
                    className={styles.ContainerInput__Input}
                    placeholder=" ">
                  </textarea>
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
                    onClick={() => hideTextBox(2)}
                    value="SI"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="PARTO_NORMAL" />SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    onClick={() => showTextBox(2)}
                    value="NO"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="PARTO_NORMAL" />NO
                </div>
              </div>
            </div>
            
            
            <div className={styles.Form__item}>
              {textbox2 ? (
                <div className={styles.ContainerInput}>
                  <textarea
                    onChange={saveDataTemporalyPrenatal}
                    name='EXPLIQUE_PARTO'
                    className={styles.ContainerInput__Input}
                    placeholder=" ">
                  </textarea>
                  <span className={styles.ContainerInput__Span}>Explique:</span>
                </div>
              ) : null}
            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Tuvo complicaciones durante el embarazo?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    onClick={() => showTextBox(3)}
                    value="SI"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="COMPLICACIONES" />SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    onClick={() => hideTextBox(3)}
                    value="NO"
                    onMouseDown={saveDataTemporalyPrenatal}
                    type="radio"
                    name="COMPLICACIONES" />NO
                </div>
              </div>
            </div>

            <div className={styles.Form__item}>
              {textbox3 ? (
                <div className={styles.ContainerInput}>
                  <textarea
                    onChange={saveDataTemporalyPrenatal}
                    name='EXPLIQUE_COMPLICACION'
                    className={styles.ContainerInput__Input}
                    placeholder=" ">
                  </textarea>
                  <span className={styles.ContainerInput__Span}>Explique:</span>
                </div>
              ) : null}     
            </div>

            <div className='Container-Beneficiario__Grid-button'>
              <button onClick={showOtherComponent} id="Prenatales" className="Button Button--Guardar">
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
  )
}

export default FormPrenatales