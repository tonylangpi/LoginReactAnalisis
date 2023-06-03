import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Console } from "console";
import axios from "axios";
import styles from "./Beneficiario.module.scss";
import FormHistorialClinico from "./formHistorialClinico";

function FormEncargado({ idBene, showComponent }) {
  // CAMPOS DEL ENCARGADO
  const [showNext, setShowNext] = useState(false);
  const [show, setShow] = useState(true);
  const [isEncargado, setIsEncargado] = useState(true);
  const [IdEncargado, setIdencargado] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [Encargado, setEncargado] = React.useState({
    NOMBRE1: "",
    NOMBRE2: "",
    NOMBRE3: "",
    APELLIDO1: "",
    APELLIDO2: "",
    TELEFONO: "",
    TIPO: "",
    ESCOLARIDAD: "",
    OCUPACION: "",
    FECHA_NACIMIENTO: "",
  });

  const saveDate = (date) => {
    const selectDate = new Date(date.target.value);
    const currentDate = new Date();
    const limitDate = new Date();
    limitDate.setFullYear(limitDate.getFullYear() - 1);

    if (selectDate >= currentDate) {
      setErrorFecha("La fecha de nacimiento no debe ser futura");
      setFechaNacimiento("");
    } else if (selectDate >= limitDate) {
      setErrorFecha("La fecha de nacimiento debe ser anterior a 12 meses");
      setFechaNacimiento("");
    } else {
      setErrorFecha("");
      date.preventDefault();
      setBeneficiario({
        ...beneficiario,
        [date.target.name]: date.target.value,
      });
      setFechaNacimiento(date.target.value);
    }
  };

  const saveDataTemporalyEncargado = (event) => {
    event.preventDefault();
    setEncargado({
      ...Encargado,
      [event.target.name]: event.target.value,
    });
  };

  const dataSend = (e) => {
    e.preventDefault();
    try {
      if (idBene != null) {
        axios
          .post(
            `https://amordownapi-production.up.railway.app/beneficiarios/createEncargados/${idBene}`,
            Encargado
          )
          .then(function (response) {
            const mensaje = response?.data?.message;
            !mensaje ? alert("paso algo") : alert(mensaje);
            setShowNext(true);
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

  const guardarBeneAndEncargado = (e) => {
    e.preventDefault();
    try {
      if (IdEncargado != null && idBene != null) {
        axios
          .post(
            "http://localhost:4000/beneficiarios/unionBeneficiarioEncargado",
            {
              ID_BENEFICIARIO: idBene,
              ID_ENCARGADO: IdEncargado,
            }
          )
          .then(function (response) {
            const respuesta = response?.data.message;
            alert(respuesta);
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showOtherComponent = () => {
    setShow(false);
    setIsEncargado(false);
  };

  return (
    <div
      hidden={showComponent}
      id="FormDatosEncargado"
      className={showComponent ? "" : styles.Container}
    >
      {isEncargado ? (
        <div className={styles.Container}>
          <div className={styles.Titulo}>
            <h1>Datos del Encargado</h1>
          </div>

          <form onSubmit={dataSend} className={styles.Grid}>
            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  autoComplete="off"
                  required
                  name="NOMBRE1"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$" //validacion de nombres
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>
                  Primer Nombre
                </span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  required
                  autoComplete="off"
                  name="NOMBRE2"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$" //validacion de nombres
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>
                  Segundo Nombre
                </span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  name="NOMBRE3"
                  autoComplete="off"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$" //validacion de nombres
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>
                  Tercer Nombre
                </span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  required
                  name="APELLIDO1"
                  autoComplete="off"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$" //validacion de nombres
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>
                  Primer Apellido
                </span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  required
                  name="APELLIDO2"
                  autoComplete="off"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$" //validacion de nombres
                  className={styles.ContainerInput__Input}
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
                  name="TELEFONO"
                  autoComplete="off"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  pattern="/^\d{8}$/"
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>Telefono</span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <select
                  required
                  className={styles.ContainerInput__Input}
                  name="TIPO"
                  onChange={saveDataTemporalyEncargado}
                >
                  <option value=""></option>
                  <option value="Encargado">Encargado</option>
                  <option value="MADRE">Mamá</option>
                  <option value="PADRE">Papá</option>
                </select>
                <span className={styles.ContainerInput__Span}>
                  Tipo de Encargado
                </span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <select
                  required
                  className={styles.ContainerInput__Input}
                  name="ESCOLARIDAD"
                  onChange={saveDataTemporalyEncargado}
                >
                  <option value=""></option>
                  <option value="No Tiene">No Tiene</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Basico">Basico</option>
                  <option value="Diversificado">Diversificado</option>
                  <option value="Universitario">Universitario</option>
                </select>
                <span className={styles.ContainerInput__Span}>Escolaridad</span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  required
                  autoComplete="off"
                  name="OCUPACION"
                  pattern="/^[a-zA-Z0-9]{5,50}$/"
                  onChange={saveDataTemporalyEncargado}
                  placeholder=" "
                  type="text"
                  className={styles.ContainerInput__Input}
                />
                <span className={styles.ContainerInput__Span}>Ocupacion</span>
              </div>
            </div>

            <div className={styles.Grid__item}>
              <div className={styles.ContainerInput}>
                <input
                  required
                  value={fechaNacimiento}
                  name="FECHA_NACIMIENTO"
                  onChange={(event) => saveDate(event)}
                  placeholder=" "
                  pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
                  type="date"
                  className={styles.ContainerInput__Input}
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
              <button id="button-Encargado" className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>

            {showNext ? (
              <div className={styles.Grid__button}>
                <button
                  onClick={showOtherComponent}
                  id="button-Encargado"
                  className="Button Button--Guardar"
                >
                  <div className="Button__Icono">
                    <FontAwesomeIcon icon="fa-solid fa-right-long" />
                  </div>
                  <span className="Button__Span Iniciar">Siguiente</span>
                </button>
              </div>
            ) : null}
          </form>
        </div>
      ) : null}

      <FormHistorialClinico showComponent={show} idBenefi={idBene} />
    </div>
  );
}

export default FormEncargado;
