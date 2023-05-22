import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styles from './HistorialClinico.module.scss';

const formHistorialClinico = ({ idBenefi = 0 }) => {
  const [isHisto, setHisto] = useState(false);

  const [Historial, setHistorial] = React.useState({
    ENFERMEDAD_PADECE: "",
    MEDICAMENTOS_INGIERE: "",
    VACUNAS: "",
    AUDICION: "",
    ORFTAMOLOGICAS: "",
    APARATO_AUDITIVO: "",
    LENTES: "",
    CIRUJIAS: "",
    OTRAS: "",
  });

  const saveDataTemporalyHistorial = (e) => {
    e.preventDefault();
    setHistorial({
      ...Historial,
      [e.target.name]: e.target.value,
    });
  };

  const saveHistorial = (e) => {
    e.preventDefault();
    try {
        if(idBenefi != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createHistorialClinico/${idBenefi}`, Historial)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial clinico")
                : alert(mensaje)
                setHisto(true);
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
    <>
      <div id="FormHistorialClinico" className={styles.Container}>
        
        <div className={styles.Titulo}>
          <h1>Historial Clinico</h1>
        </div>

        <form onSubmit={saveHistorial} className={styles.Form}>
          <div className={styles.Form__item}>
            {/* <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                required
                hidden={true}
                value={idBenefi? idBenefi : undefined}
                name="ID_BENEFICIARIO"
                onChange={saveDataTemporalyHistorial}
                placeholder=" "
                type="text"
                className={styles.ContainerInput__Input}
              />
            </div>
          </div> */}

            <div className={styles.ContainerInput}>
              <textarea
                required
                name="ENFERMEDAD_PADECE"
                onChange={saveDataTemporalyHistorial}
                disabled={isHisto}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></textarea>
              <span className={styles.ContainerInput__Span}>
                Enfermedades que padece:
              </span>
            </div>
          </div>

          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <textarea
                required
                name="MEDICAMENTOS_INGIERE"
                disabled={isHisto}
                onChange={saveDataTemporalyHistorial}
                className={styles.ContainerInput__Input}
                placeholder=" "
              ></textarea>
              <span className={styles.ContainerInput__Span}>
                Medicamentos que ingiere:
              </span>
            </div>
          </div>

          <div className={styles.Grid}>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Esquema Completo de Vacunas?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="VACUNAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="VACUNAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Tiene Examenes Auditivos?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="AUDICION"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="AUDICION"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Tiene Pruebas Oftamologicas?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="ORFTAMOLOGICAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="ORFTAMOLOGICAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>

            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Usa Aparatos Auditivos?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="APARATO_AUDITIVO"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="APARATO_AUDITIVO"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿lentes?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required                  
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="LENTES"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required                    
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="LENTES"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <label htmlFor="">¿Ha tenido Cirugias?</label>
              <div className={styles.ContainerRadio}>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required                    
                    disabled={isHisto}
                    value="SI"
                    type="radio"
                    name="CIRUJIAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  SI
                </div>
                <div className={styles.ContainerRadio__Radio}>
                  <input
                    required                   
                    disabled={isHisto}
                    value="NO"
                    type="radio"
                    name="CIRUJIAS"
                    onChange={saveDataTemporalyHistorial}
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ContainerHistorial}>

            <div className={styles.ContainerHistorial__item}>
              <div className={styles.ContainerInput}>
                <select
                  required
                  disabled={isHisto}
                  className={styles.ContainerInput__Input}
                  name="TipoDiscapacidad"
                  onChange={saveDataTemporalyHistorial}>
                  <option value=""></option>
                  <option value="Fisica Motora">Fisica Motora</option>
                  <option value="Visual">Visual</option>
                  <option value="Auditiva">Auditiva</option>
                  <option value="Mental">Mental</option>
                  <option value="Otra">Otra</option>
                </select>
                <span className={styles.ContainerInput__Span}>
                  Tipo de Discapacidad
                </span>
              </div>
            </div>

            <div className={styles.ContainerHistorial__item}>
                <div className={styles.ContainerInput}>
                  <input
                    name="OTRAS"
                    disabled={isHisto}
                    onChange={saveDataTemporalyHistorial}
                    className={styles.ContainerInput__Input}
                    placeholder=" "
                  />
                  <span className={styles.ContainerInput__Span}>
                    Otros:
                  </span>
                </div>
              </div>

          </div>

          

          {!isHisto ? (
            <div className="Container-Beneficiario__Grid-button">
              <button id="button-Historial" className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default formHistorialClinico;
