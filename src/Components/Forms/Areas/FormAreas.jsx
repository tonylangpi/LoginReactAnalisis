import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import "../../assets/scss/form.scss";
import styles from "./Areas.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";

function FormAreas() {
  const tokenDecode = jwtDecode(localStorage.getItem("Auth"));
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const [busqueda, setBusqueda] = useState('')
  const currentSessions = sesiones?.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const [name, setName] = React.useState({
    NOMBRE: "",
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
    ListarUsuarios();
  };

  const ListarUsuarios = () => {
    axios
      .post(`http://localhost:4000/servicios/`)
      .then(function (response) {
        setSesiones(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  useEffect(() => {
    ListarUsuarios();
  }, []);

  const eliminarArea = ({Area, Estado}) => {
    
    axios
      .post(
        `http://localhost:4000/servicios/deleteServicios`, {Area, Estado}
      )
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Se cambio estado");
        ListarUsuarios();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const AreasFiltradas = sesiones.filter((nombre) =>
  nombre.NOMBRE.toLowerCase().includes(busqueda.toLowerCase())
);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Listado de Areas</h1>

      <div className={styles.ContainerData}>
        <div className={styles.ContainerInput}>
          <input
            required
            name="NOMBRE"
            placeholder=" "
            type="text"
            className={styles.ContainerInput__Input}
            onChange={handleBusquedaChange}
          />
          <span className={styles.ContainerInput__Span}>Nombre del Area</span>
        </div>

        {tokenDecode.crear_areas == 0 ? null : (
          <Link className={styles.Button} to="/AreaCrear">
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </div>
            <span className={styles.Button__Span}>Agregar Area</span>
          </Link>
        )}

        {tokenDecode.actualizar_areas == 0 ? null : (
          <Link className={styles.Button} to="/AreaActualizar">
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
            </div>
            <span className={styles.Button__Span}>Actualizar Area</span>
          </Link>
        )}
      </div>

      <table className={styles.Table}>
        <thead>
          <tr>
            <th>ID Area</th>
            <th>Nombre del Area</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {AreasFiltradas.map((row, index) => (
              <tr key={index}>
                <td>{row.ID_AREA}</td>
                <td>{row.NOMBRE}</td>
                <td>{row.ESTADO === 1 ? ("Activo") : "Inactivo"}</td>
                <td className={styles.actionsBeneficiary}>
                  <div className={styles.tooltip}>
                    <span className={styles.tooltiptext}>Cambiar Estado</span>
                    <button onClick={() => eliminarArea({Area:row.ID_AREA, Estado:row.ESTADO})}>
                      <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        beneficiaryPerPage={sessionsPerPage}
        allbeneficiary={sesiones.length}
        pagination={pagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default FormAreas;
