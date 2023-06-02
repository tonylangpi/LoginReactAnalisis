import React, { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditModal = ({ beneficiary, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    NOMBRE1: beneficiary.NOMBRE1,
    NOMBRE2: beneficiary.NOMBRE2,
    NOMBRE3: beneficiary.NOMBRE3,
    APELLIDO1: beneficiary.APELLIDO1,
    APELLIDO2: beneficiary.APELLIDO2,
    ESCOLARIDAD: beneficiary.ESCOLARIDAD, // Asignar el valor actual de ESCOLARIDAD del beneficiario
    SEXO: beneficiary.SEXO,
    FECHA_NACIMIENTO: beneficiary.FECHA_NACIMIENTO.slice(0, 10),
    DIRECCION: beneficiary.DIRECCION,
    REFERENCIA: beneficiary.REFERENCIA,
    NUMERO_HERMANOS: beneficiary.NUMERO_HERMANOS,
    NUMERO_OCUPA: beneficiary.NUMERO_OCUPA,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBeneGeneral/${beneficiary.ID_BENEFICIARIO}`,
        updatedData
      )
      .then(function (response) {
        alert("Datos actualizados:", response.data);
      })
      .catch(function (error) {
        console.log(updatedData);
        console.log(beneficiary);
        alert("Error al actualizar los datos:", error);
      });
  };

  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Content}>
        <h2 className={styles.Titulo}>Editar Beneficiario</h2>
        <form className={styles.Grid} onSubmit={handleFormSubmit}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                className={styles.ContainerInput__Input}
                type="text"
                name="NOMBRE1"
                value={updatedData.NOMBRE1}
                onChange={handleInputChange}
              />
              <span className={styles.ContainerInput__Span}>Primer Nombre</span>
            </div>
          </div>

          {/* <div hidden>
            <label>ID Beneficiario:</label>
            <input type="number" value={beneficiary.ID_BENEFICIARIO} readOnly />
          </div> */}

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                className={styles.ContainerInput__Input}
                type="text"
                name="NOMBRE2"
                value={updatedData.NOMBRE2}
                onChange={handleInputChange}
              />
              <span className={styles.ContainerInput__Span}>
                Segundo Nombre
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                className={styles.ContainerInput__Input}
                type="text"
                name="NOMBRE3"
                value={updatedData.NOMBRE3}
                onChange={handleInputChange}
              />
              <span className={styles.ContainerInput__Span}>Tercer Nombre</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                className={styles.ContainerInput__Input}
                type="text"
                name="APELLIDO1"
                value={updatedData.APELLIDO1}
                onChange={handleInputChange}
              />
              <span className={styles.ContainerInput__Span}>
                Primer Apellido
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                className={styles.ContainerInput__Input}
                type="text"
                name="APELLIDO2"
                value={updatedData.APELLIDO2}
                onChange={handleInputChange}
              />
              <span className={styles.ContainerInput__Span}>
                Segundo Apellido
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="ESCOLARIDAD"
                className={styles.ContainerInput__Input}
                value={updatedData.ESCOLARIDAD}
                onChange={handleInputChange}
              >
                <option></option>
                <option
                  value="No Tiene"
                  selected={updatedData.ESCOLARIDAD === "No Tiene"}
                >
                  No Tiene
                </option>
                <option
                  value="No Aplica"
                  selected={updatedData.ESCOLARIDAD === "No Aplica"}
                >
                  No Aplica
                </option>
                <option
                  value="PrePrimaria"
                  selected={updatedData.ESCOLARIDAD === "PrePrimaria"}
                >
                  PrePrimaria
                </option>
                <option
                  value="Primaria"
                  selected={updatedData.ESCOLARIDAD === "Primaria"}
                >
                  Primaria
                </option>
                <option
                  value="Basico"
                  selected={updatedData.ESCOLARIDAD === "Basico"}
                >
                  Basico
                </option>
                <option
                  value="Diversificado"
                  selected={updatedData.ESCOLARIDAD === "Diversificado"}
                >
                  Diversificado
                </option>
                <option
                  value="Universitario"
                  selected={updatedData.ESCOLARIDAD === "Universitario"}
                >
                  Universitario
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>Escolaridad</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                name="SEXO"
                className={styles.ContainerInput__Input}
                value={updatedData.SEXO}
                onChange={handleInputChange}
              >
                <option></option>
                <option value="M" selected={updatedData.SEXO === "MASCULINO"}>
                  MASCULINO
                </option>
                <option value="F" selected={updatedData.SEXO === "FEMENINO"}>
                  FEMENINO
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>GENERO</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="date"
                name="FECHA_NACIMIENTO"
                value={updatedData.FECHA_NACIMIENTO.slice(0, 10)}
                onChange={handleInputChange}
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                Fecha de Nacimiento
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="text"
                name="DIRECCION"
                value={updatedData.DIRECCION}
                onChange={handleInputChange}
                placeholder=" "
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Direccion</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                className={styles.ContainerInput__Input}
                type="text"
                name="REFERENCIA"
                value={updatedData.REFERENCIA}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option
                  value="NO APLICA"
                  selected={updatedData.REFERENCIA === "NO APLICA"}
                >
                  NO APLICA
                </option>
                <option
                  value="CENTRO DE SALUD"
                  selected={updatedData.REFERENCIA === "CENTRO DE SALUD"}
                >
                  CENTRO DE SALUD
                </option>
              </select>
              <span className={styles.ContainerInput__Span}>REFERENCIA</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="number"
                name="NUMERO_HERMANOS"
                value={updatedData.NUMERO_HERMANOS}
                onChange={handleInputChange}
                placeholder=" "
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                Numero de Hermanos
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                type="number"
                name="NUMERO_OCUPA"
                value={updatedData.NUMERO_OCUPA}
                onChange={handleInputChange}
                placeholder=" "
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                Numero que Ocupa
              </span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className={styles.Button} type="submit">
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
        </form>
      </div>
    </div>
  );
};
export default EditModal;