import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/scss/form.scss'
import styles from '../ListaCitas.module.scss';


function AreaCrear() {
  const [area, setArea] = React.useState({
    NOMBRE: "",
    ID_AREA: ""
  });

  const guardarArea = () => {
    axios
      .post("http://localhost:4000/servicios/createServicios", {
        NOMBRE: area.NOMBRE
      })
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Guardado Exitoso");
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setArea({
      ...area,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="Container-Beneficiario__item Titulo">
        <h1>Crear Área</h1>
      </div>

      <form className="Grid">
        <div className="Grid__item">
          <div className="Beneficiario-Container-Input">
            <input
              required
              name="NOMBRE"
              placeholder=" "
              type="text"
              className="Beneficiario-Container-Input__Input"
              value={area.NOMBRE}
              onChange={handleChange}
            />
            <span className="Beneficiario-Container-Input__Span">
              Nombre del Area
            </span>
          </div>
        </div>
      </form>

      <div className="Container-Beneficiario__Grid-button">

        <button id="button-beneficiario" className="Button Button--Guardar"
          onClick={guardarArea}>
          <div className="Button__Icono">
            <FontAwesomeIcon icon="fa-solid fa-file-export" />
          </div>
          <span className="Button__Span Iniciar">Guardar</span>
        </button>

        <div className={styles.ContainerSearch}>
        
        <Link to="/FormAreas">
          <button className='Button' to="/FormAreas" >Regresar</button>
        
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AreaCrear;