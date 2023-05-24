import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../utils/pagination';
import '../../assets/scss/form.scss'
import styles from './Areas.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormAreas() {
    const [search, setSearch] = useState('');
    const [sesiones, setSesiones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sesiones?.slice(indexOfFirstSession, indexOfLastSession);
    const pagination = (pageNumber) => setCurrentPage(pageNumber);
    
    const [name, setName] = React.useState({
      NOMBRE: ''
    });

    const idArea = parseInt(localStorage.getItem('idArea'));
  
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
        .post(`https://amordownapi-production.up.railway.app/servicios/`, {NOMBRE: name.NOMBRE})
        .then(function (response) {
          setSesiones(response.data);
        })
        .catch(function (error) {
          alert('No se ha encontrado un registro');
        });
    };
  
    useEffect(() => {
      ListarUsuarios();
    }, []);


  const eliminarArea = (idArea) => {
    axios
      .delete(`https://amordownapi-production.up.railway.app/servicios/deleteServicios/${idArea}`)
      .then(function (response) {
        const respuesta = response?.data.message;
        alert("Eliminado Exitoso");
        ListarUsuarios();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    return (
      <div className={styles.Container}>
        {/* search */}
        <h1 className={styles.Titulo}>Listado de Areas</h1>

        <div className={styles.ContainerData}>
          <div className={styles.ContainerInput}>
            <input
              required
              name="NOMBRE"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
              onKeyUp={saveDataTemporaly}
            />
            <span className={styles.ContainerInput__Span}>
            Nombre del Area
            </span>
          </div>
          <Link className={styles.Button} to="/AreaCrear">
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </div>
            <span className={styles.Button__Span}>Agregar Area</span>
          </Link>
          <Link className={styles.Button} to="/AreaActualizar">
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
            </div>
            <span className={styles.Button__Span}>Actualizar Area</span>
          </Link>
        </div>

        <table className={styles.Table}>
          <thead>
            <tr>
              <th>ID Area</th>
              <th>Nombre del Area</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions
              .filter((item) => {
                return item
              })
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.ID_AREA}</td>
                  <td>{row.NOMBRE}</td>
                  <td className={styles.actionsBeneficiary}>
                    <div className={styles.tooltip}><span className={styles.tooltiptext}>Eliminar Area</span>
                      <button onClick={() => eliminarArea(row.ID_AREA)}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                    </div>
                  </td>
                  {/* <td>
                    <button
                      onClick={() => eliminarArea(row.ID_AREA)}
                      className="Button Button--Eliminar"
                    >
                      <div className="Button__Icono">
                        <FontAwesomeIcon icon="fa-solid fa-sync" />
                      </div>
                      <span className="Button__Span Iniciar">Eliminar</span>
                    </button>
                  </td> */}
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
    )
}

export default FormAreas