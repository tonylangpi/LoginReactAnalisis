import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/authContext.jsx"
function ModalEncargados({ beneficiary, onClose }) {
  const [encargados, setEncargados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const { Api } = useAuth();
  useEffect(() => {
    const fetchEncargados = async () => {
      try {
        const response = await axios.get(
          `${Api}beneficiarios/buscarEncargadoBene/${beneficiary.ID_BENEFICIARIO}`
        );
        setEncargados(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("Error al obtener la información:", error);
      }
    };

    fetchEncargados();
  }, []);

  const actualizarEncargado = async (e, idEncargado, encargadoActualizado) => {
    e.preventDefault();
    try {
      await axios.post(
        `${Api}beneficiarios/updateEncargadosBene/${idEncargado}`,
        encargadoActualizado
      );
      alert("Información actualizada correctamente");
      onClose();
    } catch (error) {
      alert("Error al actualizar la información:", error);
    }
  };

  const saveDate = (date, idEncargado) => {
    const selectDate = new Date(date.target.value);
    const currentDate = new Date();

    if (selectDate >= currentDate) {
      setErrorFecha("La fecha de nacimiento no debe ser futura");
      setFechaNacimiento("");
    } else {
      setErrorFecha("");
      const updatedEncargados = encargados.map((enc) =>
        enc.ID_ENCARGADO === idEncargado
          ? { ...enc, FECHA_NACIMIENTO: date.target.value }
          : enc
      );
      setEncargados(updatedEncargados);
      setFechaNacimiento(date.target.value);
    }
  };

  const changeEncargado = (e, id) => {
    const updatedEncargados = encargados.map((enc) =>
      enc.ID_ENCARGADO === id
        ? { ...enc, [e.target.name]: e.target.value }
        : enc
    );
    setEncargados(updatedEncargados);
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

            <form
              onSubmit={(e) =>
                actualizarEncargado(
                  e,
                  encargado.ID_ENCARGADO,
                  encargados[index]
                )
              }
              className={styles.Grid}
            >
              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    autoComplete="off"
                    required
                    name="NOMBRE1"
                    pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE1}
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    autoComplete="off"
                    required
                    name="NOMBRE2"
                    pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE2}
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    autoComplete="off"
                    pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.NOMBRE3}
                    name="NOMBRE3"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Tercer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    autoComplete="off"
                    required
                    pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.APELLIDO1}
                    name="APELLIDO1"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    autoComplete="off"
                    required
                    pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.APELLIDO2}
                    name="APELLIDO2"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    autoComplete="off"
                    pattern="^\d{8}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.TELEFONO}
                    name="TELEFONO"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>Teléfono</span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    required
                    className={styles.ContainerInput__Input}
                    name="TIPO"
                    type="text"
                    value={encargado.TIPO}
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  >
                    <option></option>
                    <option
                      value="Encargado"
                      selected={encargado.TIPO === "Encargado"}
                    >
                      Encargado
                    </option>
                    <option value="Mamá" selected={encargado.TIPO === "Mamá"}>
                      Mamá
                    </option>
                    <option value="Papá" selected={encargado.TIPO === "Papá"}>
                      Papá
                    </option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    Tipo Encargado
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    required
                    className={styles.ContainerInput__Input}
                    name="ESCOLARIDAD"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  >
                    <option></option>
                    <option
                      value="No Tiene"
                      selected={encargado.ESCOLARIDAD === "No Tiene"}
                    >
                      No Tiene
                    </option>
                    <option
                      value="Primaria"
                      selected={encargado.ESCOLARIDAD === "Primaria"}
                    >
                      Primaria
                    </option>
                    <option
                      value="Basico"
                      selected={encargado.ESCOLARIDAD === "Basico"}
                    >
                      Basico
                    </option>
                    <option
                      value="Diversificado"
                      selected={encargado.ESCOLARIDAD === "Diversificado"}
                    >
                      Diversificado
                    </option>
                    <option
                      value="Universitario"
                      selected={encargado.ESCOLARIDAD === "Universitario"}
                    >
                      Universitario
                    </option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    Escolaridad
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    autoComplete="off"
                    pattern="^[a-zA-Z\s]{3,50}$"
                    placeholder=" "
                    className={styles.ContainerInput__Input}
                    type="text"
                    value={encargado.OCUPACION}
                    name="OCUPACION"
                    onChange={(e) => changeEncargado(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>Ocupacion</span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    className={styles.ContainerInput__Input}
                    placeholder=" "
                    type="date"
                    value={
                      fechaNacimiento == ""
                        ? encargado.FECHA_NACIMIENTO.slice(0, 10)
                        : fechaNacimiento
                    }
                    onChange={(e) => saveDate(e, encargado.ID_ENCARGADO)}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Fecha de Nacimiento
                  </span>
                  {errorFecha && (
                    <p className={styles.ErrorMessage}>{errorFecha}</p>
                  )}
                </div>
              </div>

              <div className={styles.Grid__button}>
                <button className={styles.Button}>
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
        ))}
      </div>
    </div>
  );
}

export default ModalEncargados;
