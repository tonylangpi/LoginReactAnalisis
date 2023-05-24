import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Console } from "console";
import axios from 'axios';
import styles from './Beneficiario.module.scss';

function FormEncargado({idBene }) {
  // CAMPOS DEL ENCARGADO
  const [IdEncargado, setIdencargado] = useState(null);
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
  const saveDataTemporalyEncargado = (e) => {
    e.preventDefault();
    setEncargado({
      ...Encargado,
      [e.target.name]: e.target.value,
    });
  };

  const dataSend = (e) => {
    e.preventDefault();
    try {
      if(idBene != null){
        axios
        .post(`https://amordownapi-production.up.railway.app/beneficiarios/createEncargados/${idBene}`, Encargado)
        .then(function (response) {
          const mensaje =
            response?.data?.message;
          !mensaje
            ? alert("paso algo")
            : alert(mensaje);
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

 const guardarBeneAndEncargado = (e) =>{
    e.preventDefault();
    try {
        if(IdEncargado != null && idBene !=  null){
            axios
            .post("http://localhost:4000/beneficiarios/unionBeneficiarioEncargado", {
                "ID_BENEFICIARIO":idBene,
                "ID_ENCARGADO": IdEncargado
              })
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
   
 }

  return (
    <div id="FormDatosEncargado" className={styles.Container}>
      <div className={styles.Titulo}>
        <h1>Datos del Encargado</h1>
      </div>

      <form onSubmit={dataSend} className={styles.Grid}>
        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <input
              required
              name="NOMBRE1"
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
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
              name="NOMBRE2"
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
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
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
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
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
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
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
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
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Telefono
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="TIPO"
              onChange={saveDataTemporalyEncargado}>
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
              onChange={saveDataTemporalyEncargado}>
              <option value=""></option>
              <option value="No Tiene">No Tiene</option>
              <option value="Primaria">Primaria</option>
              <option value="Basico">Basico</option>
              <option value="Diversificado">Diversificado</option>
              <option value="Universitario">Universitario</option>
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
              name="OCUPACION"
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Ocupacion
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <input
              required
              name="FECHA_NACIMIENTO"
              onChange={saveDataTemporalyEncargado}
              placeholder=" "
              type="date"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Fecha de Nacimiento
            </span>
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
      </form>
    </div>
  );
}

export default FormEncargado;
