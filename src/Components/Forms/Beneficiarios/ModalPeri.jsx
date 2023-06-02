import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalPeri({ beneficiary, onClose }) {
  const [peri, setPeri] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeri = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPerinatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPeri(response.data[0]); 
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchPeri();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPeri = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePerinatales/${beneficiary.ID_BENEFICIARIO}`, peri);
      alert('Información actualizada correctamente');
    } catch (error) {
      alert('Error al actualizar la información:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2 className={styles.Titulo}>Editar Informacion PeriNatal</h2>

        <div className={styles.Grid}>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={peri.LLORO_INMEDIATAMENTE} 
                onChange={(e) => setPeri({ ...peri, LLORO_INMEDIATAMENTE: e.target.value })}
                className={styles.ContainerInput__Input}>
                <option value="SI" selected={peri.LLORO_INMEDIATAMENTE === "SI"}>SI</option>
                <option value="NO" selected={peri.LLORO_INMEDIATAMENTE === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                Lloro inmediatamente al nacer
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={peri.COLORACION} 
                onChange={(e) => setPeri({ ...peri, COLORACION: e.target.value })}
                className={styles.ContainerInput__Input}>
                <option value="SI" selected={peri.COLORACION === "SI"}>SI</option>
                <option value="NO" selected={peri.COLORACION === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Su coloracion fue normal?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={peri.INCUBADORA} 
                onChange={(e) => setPeri({ ...peri, INCUBADORA: e.target.value })}
                className={styles.ContainerInput__Input}>
                <option value="SI" selected={peri.INCUBADORA === "SI"}>SI</option>
                <option value="NO" selected={peri.INCUBADORA === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Estuvo en incubadora?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                value={peri.INCUBADORA} 
                onChange={(e) => setPeri({ ...peri, INCUBADORA: e.target.value })}
                className={styles.ContainerInput__Input}>
                <option value="SI" selected={peri.INCUBADORA === "SI"}>SI</option>
                <option value="NO" selected={peri.INCUBADORA === "NO"}>NO</option>
              </select>
              <span className={styles.ContainerInput__Span}>
                ¿Estuvo en incubadora?
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                value={peri.COLOR} 
                onChange={(e) => setPeri({ ...peri, COLOR: e.target.value })} 
                type='text'
                className={styles.ContainerInput__Input}
                placeholder=" ">
              </input>
              <span className={styles.ContainerInput__Span}>
                ¿Nacio amarillo o morado?
              </span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button} onClick={actualizarPeri}>
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

export default ModalPeri;