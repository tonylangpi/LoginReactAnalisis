import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import "../../assets/scss/form.scss";
import { Link } from "react-router-dom";
import styles from "./Usuarios.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import jwtDecode from "jwt-decode";

function FormUsuarios() {
  const tokenDecode = jwtDecode(localStorage.getItem("Auth"));
  const [dataSelect, setDataSelect] = useState([]);
  const [showMyModal, setshowMyModal] = useState(false);
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sesiones?.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const [name, setName] = React.useState({
    nombre: "",
  });

  const handleOnClose = () => setshowMyModal(false);
  const underSelect = (item) => {
    setDataSelect(item);
  };

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
      .post(`http://localhost:4000/usuarios/userName`, {
        nombre: name.nombre,
      })
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

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Listado de Usuarios</h1>
      <div className={styles.Flex}>
        <div className={styles.Flex__item}>
          <div className={styles.ContainerInput}>
            <input
              required
              name="nombre"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
              onKeyUp={saveDataTemporaly}
            />
            <span className={styles.ContainerInput__Span}>
              Nombre del Usuario
            </span>
          </div>
        </div>

        {tokenDecode.crear_usuarios == 0 ? null : (
          <div className={styles.Flex__item}>
            <Link className={styles.Button} to="/FormAgregarUsuario">
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </div>
              <span className={styles.Button__Span}>Agregar Usuario</span>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.ContainerTable}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Nivel</th>
              <th>Rol</th>
              <th>Area</th>
              <th>Nombre Empresa</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions
              .filter((item) => {
                return item;
              })
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.nombre}</td>
                  <td>{row.email}</td>
                  <td>{row.nivel}</td>
                  <td>{row.rol}</td>
                  <td>{row.area}</td>
                  <td>{row.empresa}</td>
                  <td>{row.telefono}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        beneficiaryPerPage={sessionsPerPage}
        allbeneficiary={sesiones.length}
        pagination={pagination}
        currentPage={currentPage}
      />
      <Modal
        dataSelect={dataSelect}
        onClose={handleOnClose}
        visible={showMyModal}
      />
    </div>
  );
}

export default FormUsuarios;
