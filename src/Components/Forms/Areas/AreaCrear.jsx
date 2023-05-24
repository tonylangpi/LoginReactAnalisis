import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/scss/form.scss'
import styles from './AddArea.module.scss';

function AreaCrear() {
  const [area, setArea] = React.useState({
    NOMBRE: "",
    ID_AREA: ""
  });

  const guardarArea = () => {
    axios
      .post("https://amordownapi-production.up.railway.app/servicios/createServicios", {
        NOMBRE: area.NOMBRE
      })
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Guardado Exitoso");
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
    <div className={styles.Container}>
      <div className={styles.Titulo}>
        <h1>Crear Área</h1>
      </div>

      <form className={styles.Container}>
        <div className={styles.ContainerInput}>
          <input
            required
            name="NOMBRE"
            placeholder=" "
            type="text"
            className={styles.ContainerInput__Input}
            value={area.NOMBRE}
            onChange={handleChange}
          />
          <span className={styles.ContainerInput__Span}>
            Nombre del Area
          </span>
        </div>
      </form>

      <Link onClick={guardarArea} className={styles.Button} to="/FormAreas">
        <div className={styles.Button__Icono}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </div>
        <span className={styles.Button__Span}>Agregar Area</span>
      </Link>

    </div>
  );
}

export default AreaCrear;