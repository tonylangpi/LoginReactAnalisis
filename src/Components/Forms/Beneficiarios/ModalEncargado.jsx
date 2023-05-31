import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalEncargados({ beneficiary, onClose }) {
  const [encargados, setEncargados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEncargados = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarEncargadoBene/${beneficiary.ID_BENEFICIARIO}`);
        setEncargados(response.data);
        console.log(encargados);
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchEncargados();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarEncargado = async (idEncargado, encargadoActualizado) => {
    console.log(encargadoActualizado);
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateEncargadosBene/${idEncargado}`, encargadoActualizado);
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
        <h2 className={styles.Titulo}>Editar Información de Encargados</h2>
        {encargados.map((encargado, index) => (
          <div className={styles.ContentData} key={encargado.ID_ENCARGADO}>
            <h3 className={styles.SubTitulo}>Encargado {index + 1}</h3>

            <div className={styles.Grid}>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                   className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE1}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE1: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE2}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE2: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE3}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE3: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Tercer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.APELLIDO1}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, APELLIDO1: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.APELLIDO2}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, APELLIDO2: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.TELEFONO}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, TELEFONO: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Teléfono
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    className={styles.ContainerInput__Input}
                    name='TIPO'
                    type="text"
                    value={encargado.TIPO}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, TIPO: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}>
                    <option></option>
                    <option value="Encargado" selected={encargado.TIPO === "Encargado"}>Encargado</option>
                    <option value="Mamá" selected={encargado.TIPO === "Mamá"}>Mamá</option>
                    <option value="Papá" selected={encargado.TIPO === "Papá"}>Papá</option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    Tipo Encargado
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    className={styles.ContainerInput__Input}
                    name="ESCOLARIDAD"
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, ESCOLARIDAD: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}>
                    <option></option>
                    <option value="No Tiene" selected={encargado.ESCOLARIDAD === "No Tiene"}>No Tiene</option>
                    <option value="Primaria" selected={encargado.ESCOLARIDAD === "Primaria"}>Primaria</option>
                    <option value="Basico" selected={encargado.ESCOLARIDAD === "Basico"}>Basico</option>
                    <option value="Diversificado" selected={encargado.ESCOLARIDAD === "Diversificado"}>Diversificado</option>
                    <option value="Universitario" selected={encargado.ESCOLARIDAD === "Universitario"}>Universitario</option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    Escolaridad
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    placeholder=' '
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.OCUPACION}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, OCUPACION: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Ocupacion
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    className={styles.ContainerInput__Input}
                    placeholder=' '
                    type="date"
                    value={encargado.FECHA_NACIMIENTO.slice(0, 10)}
                    onChange={(e) => {
                      const updatedEncargados = encargados.map((enc) =>
                        enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, FECHA_NACIMIENTO: e.target.value } : enc
                      );
                      setEncargados(updatedEncargados);
                    }}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Fecha de Nacimiento
                  </span>
                </div>
              </div>

              <div className={styles.Grid__button}>
                <button className={styles.Button} onClick={() => actualizarEncargado(encargado.ID_ENCARGADO, encargados[index])}>
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
        ))}
      </div>

    </div>
  );
}

export default ModalEncargados;