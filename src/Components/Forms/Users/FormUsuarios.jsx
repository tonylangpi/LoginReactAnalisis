import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../utils/pagination';
import '../../assets/scss/form.scss'
import { Link } from "react-router-dom";
import styles from './Usuarios.module.scss';

function FormUsuarios() {
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sesiones?.slice(indexOfFirstSession, indexOfLastSession);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  
  const [name, setName] = React.useState({
    nombre: ''
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
      .post(`http://localhost:4000/usuarios/userName`, {nombre: name.nombre})
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

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Listado de Usuarios</h1>
      <div className='ContainerInput'>
        <div className="Beneficiario-Container-Input">
          <input
            required
            name="nombre"
            placeholder=" "
            type="text"
            className="Beneficiario-Container-Input__Input"
            onKeyUp={saveDataTemporaly}
          />
          <span className="Beneficiario-Container-Input__Span">
            Nombre del Usuario
          </span>
        </div>
        <button><Link to="/FormAgregarUsuario">Agregar Usuario</Link></button>
      </div>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Area</th>
            <th>Direccion</th>
            <th>Nombre Empresa</th>
          </tr>
        </thead>
        <tbody>
          {currentSessions.filter((item) => {
            return item
          }).map((row, index) => (
            <tr key={index}>
              <td>{row.ID_USUARIO}</td>
              <td>{row.NOMBRE_USUARIO}</td>
              <td>{row.EMAIL_USUARIO}</td>
              <td>{row.ROL_USUARIO}</td>
              <td>{row.NOMBRE_AREA}</td>
              <td>{row.DIRECCION_EMPRESA}</td>
              <td>{row.NOMBRE_EMPRESA}</td>
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

export default FormUsuarios