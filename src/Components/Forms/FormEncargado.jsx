import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Console } from "console";
import axios from 'axios';
//import './_Beneficiario.scss';
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
        .post(`http://localhost:4000/beneficiarios/createEncargados/${idBene}`, Encargado)
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
    <div
      id="FormDatosEncargado"
      className="Container-Beneficiario Datos-Encargado"
    >
      <div className="Container-Beneficiario__item Titulo">
        <h1>Datos del Encargado</h1>
      </div>
      <form onSubmit={dataSend} className="Container-Beneficiario__Grid">
        <div className="Container-Beneficiario__Grid">
          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="NOMBRE1"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Primer Nombre
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="NOMBRE2"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Segundo Nombre
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="NOMBRE3"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Tercer Nombre
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="APELLIDO1"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Primer Apellido
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="APELLIDO2"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Segundo Apellido
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="TELEFONO"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Telefono
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <select
                required
                className="Beneficiario-Container-Input__Input"
                name="TIPO"
                onChange={saveDataTemporalyEncargado}
                id=""
              >
                <option value="NO APLICA">-------NO-APLICA--------</option>
                <option value="MADRE">Mamá</option>
                <option value="PADRE">Papá</option>
              </select>
              <span className="Beneficiario-Container-Input__Span">
                Tipo de Encargado
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <select
                required
                className="Beneficiario-Container-Input__Input"
                name="ESCOLARIDAD"
                onChange={saveDataTemporalyEncargado}
                id=""
              >
                <option value="Primaria">Primaria</option>
                <option value="Basico">Basico</option>
                <option value="Diversificado">Diversificado</option>
                <option value="Universidad">Universidad</option>
              </select>
              <span className="Beneficiario-Container-Input__Span">
                Escolaridad
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="OCUPACION"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Ocupacion
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                name="FECHA_NACIMIENTO"
                onChange={saveDataTemporalyEncargado}
                placeholder=" "
                type="date"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Fecha de Nacimiento
              </span>
            </div>
          </div>
        </div>

        <div className="Container-Beneficiario__Grid-button">
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
