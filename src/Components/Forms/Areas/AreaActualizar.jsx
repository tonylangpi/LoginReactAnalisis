import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/scss/form.scss';
import styles from './Update.module.scss';

function AreaActualizar() {
  const [area, setArea] = React.useState({
    NOMBRE: "",
    ID_AREA: ""
  });

  const [name, setName] = React.useState({
    NOMBRE: ''
  });

  const handleSelectChange = (e) => {
    const selectedArea = areas.find((row) => row.ID_AREA === e.target.value);
    setArea({
      ...area,
      NOMBRE: selectedArea ? selectedArea.NOMBRE : "",
      ID_AREA: e.target.value
    });
  };

  const [areas, setAreas] = useState([]);

  const Listar = () => {
    axios.post(`https://amordownapi-production.up.railway.app/servicios/`, {NOMBRE: name.NOMBRE})
      .then(function (response) {
        setAreas(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });
  };

  useEffect(() => {
    Listar();
  }, []);

  const actualizarArea = () => {
    axios
      .put(`https://amordownapi-production.up.railway.app/servicios/updateServicios/${area.ID_AREA}`, { 
        NOMBRE: area.NOMBRE,
        ID_AREA: area.ID_AREA
      })
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Actualizado Exitoso");
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
    <div className={styles.Container}>
      <div className={styles.Titulo}>
        <h1>Actualizar Area</h1>
      </div>

      <form className={styles.Container}>

        <div className={styles.ContainerInput}>
          <select
            required
            className={styles.ContainerInput__Input}
            name="ID_AREA"
            onChange={handleSelectChange}>
            <option value=""></option>
            {areas.map((row, index) => (
              <option key={index} value={row.ID_AREA}>{row.NOMBRE}</option>
            ))}
          </select>
          <span className={styles.ContainerInput__Span}>
            seleccione El Area:
          </span>
        </div>

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
            Nuevo Nombre:
          </span>
        </div>
        
      </form>

      <Link onClick={actualizarArea} className={styles.Button} to="/FormAreas">
        <div className={styles.Button__Icono}>
          <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
        </div>
        <span className={styles.Button__Span}>Actualizar</span>
      </Link>

      {/* <div className="Container-Beneficiario__Grid-button">

        <button id="button-beneficiario" className="Button Button--Guardar"
          onClick={actualizarArea}>
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

      </div> */}
    </div>
  );
}

export default AreaActualizar;