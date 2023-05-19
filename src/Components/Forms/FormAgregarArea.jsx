import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';


function FormAgregarArea() {
  const [area, setArea] = React.useState({
    NOMBRE: "",
    ID_AREA: ""
  });
  const [areas, setAreas] = useState([]);

  const Listar = () => {
    axios.get(`http://localhost:4000/servicios/`)
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

  const guardarArea = () => {
    axios
      .post("http://localhost:4000/servicios/createServicios", {
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

  const actualizarArea = () => {
    axios
      .put(`http://localhost:4000/servicios/updateServicios/${area.ID_AREA}`, {
        NOMBRE: area.NOMBRE,
        ID_AREA: area.ID_AREA
      })
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Actualizado Exitoso");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

   const eliminarArea = () => {
    axios
      .delete(`http://localhost:4000/servicios/deleteServicios/${area.ID_AREA}`)
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Eliminado Exitoso");
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
        <h1>Datos del Área</h1>
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
              Primer Nombre
            </span>
          </div>
        </div>


        <div className="Grid__item">
        <div className="Beneficiario-Container-Input">
            <select
              required
              className="Beneficiario-Container-Input__Input"
              name="ID_AREA"
              onChange={handleChange}>
              <option value=""></option>
              {areas.map((row, index) => (
                  <option key={index} value={row.ID_AREA}>{row.NOMBRE}</option>
              ))}
            </select>
            <span className="Beneficiario-Container-Input__Span">
              ID Areas
            </span>
          </div>
        </div>


















      </form>

      <div className="Container-Beneficiario__Grid-button">
        <button
          id="button-beneficiario"
          className="Button Button--Guardar"
          onClick={guardarArea}
        >
          <div className="Button__Icono">
            <FontAwesomeIcon icon="fa-solid fa-file-export" />
          </div>
          <span className="Button__Span Iniciar">Guardar</span>
        </button>

        <button
          id="button-actualizar"
          className="Button Button--Actualizar"
          onClick={actualizarArea}
        >
          <div className="Button__Icono">
            <FontAwesomeIcon icon="fa-solid fa-sync" />
          </div>
          <span className="Button__Span Iniciar">Actualizar</span>
        </button>

        <button
          id="button-eliminar"
          className="Button Button--Eliminar"
          onClick={eliminarArea}
        >
          <div className="Button__Icono">
            <FontAwesomeIcon icon="fa-solid fa-sync" />
          </div>
          <span className="Button__Span Iniciar">Eliminar</span>
        </button>
      </div>
    </div>
  );
}

export default FormAgregarArea;