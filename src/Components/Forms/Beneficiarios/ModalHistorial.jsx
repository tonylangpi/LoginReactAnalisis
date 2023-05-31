import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalHistorial({ beneficiary, onClose }) {
  const [historial, setHistorial] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarHistorialClinicoBene/${beneficiary.ID_BENEFICIARIO}`);
        setHistorial(response.data[0]); // Asumiendo que la respuesta es un arreglo de un solo elemento
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener el historial clínico:', error);
      }
    };

    fetchHistorial();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarHistorial = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBeneHistorialClinico/${beneficiary.ID_BENEFICIARIO}`, historial);
      alert('Historial actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar el historial clínico:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando historial clínico...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>

        <h2 className={styles.Titulo}>Historial Clínico</h2>

        <div className={styles.Grid}>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type='text'
                value={historial.MEDICAMENTOS_INGIERE}
                onChange={(e) => setHistorial({ ...historial, MEDICAMENTOS_INGIERE: e.target.value })}
                className={styles.ContainerInput__Input}
                placeholder=" ">
              </input>
              <span className={styles.ContainerInput__Span}>
                Medicamentos que ingiere:
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type='text'
                value={historial.ENFERMEDAD_PADECE}
                onChange={(e) => setHistorial({ ...historial, ENFERMEDAD_PADECE: e.target.value })}
                className={styles.ContainerInput__Input}
                placeholder=" ">
              </input>
              <span className={styles.ContainerInput__Span}>
                Enfermedades que padece:
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="VACUNAS"
                className={styles.ContainerInput__Input}
                value={historial.VACUNAS}
                onChange={(e) => setHistorial({ ...historial, VACUNAS: e.target.value })}>
                <option value="SI" selected={historial.VACUNAS === "SI"}>SI</option>
                <option value="NO" selected={historial.VACUNAS === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Esquema Completo de Vacunas?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="AUDICION"
                className={styles.ContainerInput__Input}
                value={historial.AUDICION}
                onChange={(e) => setHistorial({ ...historial, AUDICION: e.target.value })}>
                <option value="SI" selected={historial.AUDICION === "SI"}>SI</option>
                <option value="NO" selected={historial.AUDICION === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Tiene Examenes Auditivos?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="ORFTAMOLOGICAS"
                className={styles.ContainerInput__Input}
                value={historial.ORFTAMOLOGICAS}
                onChange={(e) => setHistorial({ ...historial, ORFTAMOLOGICAS: e.target.value })}>
                <option value="SI" selected={historial.ORFTAMOLOGICAS === "SI"}>SI</option>
                <option value="NO" selected={historial.ORFTAMOLOGICAS === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Tiene Pruebas Oftamologicas?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="APARATO_AUDITIVO"
                className={styles.ContainerInput__Input}
                value={historial.APARATO_AUDITIVO}
                onChange={(e) => setHistorial({ ...historial, APARATO_AUDITIVO: e.target.value })}>
                <option value="SI" selected={historial.APARATO_AUDITIVO === "SI"}>SI</option>
                <option value="NO" selected={historial.APARATO_AUDITIVO === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Usa Aparatos Auditivos?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="LENTES"
                className={styles.ContainerInput__Input}
                value={historial.LENTES}
                onChange={(e) => setHistorial({ ...historial, LENTES: e.target.value })}>
                <option value="SI" selected={historial.LENTES === "SI"}>SI</option>
                <option value="NO" selected={historial.LENTES === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Lentes?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="CIRUJIAS"
                className={styles.ContainerInput__Input}
                value={historial.CIRUJIAS}
                onChange={(e) => setHistorial({ ...historial, CIRUJIAS: e.target.value })}>
                <option value="SI" selected={historial.CIRUJIAS === "SI"}>SI</option>
                <option value="NO" selected={historial.CIRUJIAS === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Ha tenido Cirugias?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={historial.DISCAPACIDAD}
                className={styles.ContainerInput__Input}
                name="DISCAPACIDAD"
                onChange={(e) => setHistorial({ ...historial, DISCAPACIDAD: e.target.value })}>
                <option value=""></option>
                <option value="Fisica Motora" selected={historial.DISCAPACIDAD === "Fisica Motora"}>Fisica Motora</option>
                <option value="Visual" selected={historial.DISCAPACIDAD === "Visual"}>Visual</option>
                <option value="Auditiva" selected={historial.DISCAPACIDAD === "Auditiva"}>Auditiva</option>
                <option value="Mental" selected={historial.DISCAPACIDAD === "Mental"}>Mental</option>
                <option value="Otra" selected={historial.DISCAPACIDAD === "Otra"}>Otra</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Tipo de Discapacidad
              </span>
            </div>
          </div>

          <div className={styles.ContainerHistorial__item}>
            <div className={styles.ContainerInput}>
              <input
                name="DIAGNOSTICO"
                type="text" 
                value={historial.DIAGNOSTICO} 
                onChange={(e) => setHistorial({ ...historial, DIAGNOSTICO: e.target.value })}
                className={styles.ContainerInput__Input}
                placeholder=" "/>
              <span className={styles.ContainerInput__Span}>
                Diagnostico:
              </span>
            </div>
          </div>

          <div className={styles.ContainerHistorial__item}>
            <div className={styles.ContainerInput}>
              <input
                name="OTRAS"
                type="text" 
                value={historial.OTRAS} 
                onChange={(e) => setHistorial({ ...historial, OTRAS: e.target.value })}
                className={styles.ContainerInput__Input}
                placeholder=" "/>
              <span className={styles.ContainerInput__Span}>
                Otros:
              </span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button} onClick={actualizarHistorial}>
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

        </div>

      </div>

    </div> 
  );
}

export default ModalHistorial;





