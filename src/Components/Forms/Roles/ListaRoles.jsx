import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./ListRol.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListaRoles() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);
  const indexOfLastSession = currentPage * rolesPerPage;
  const indexOfFirstSession = indexOfLastSession - rolesPerPage;
  const [busqueda, setBusqueda] = useState('')
  const currentSessions = roles?.slice(indexOfFirstSession, indexOfLastSession);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const listarRoles = async () => {
    const result = await axios(
      `http://localhost:4000/roles/`
    );
    setRoles(result.data);
  };

  
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const RolesFiltradas = roles.filter((roles) =>
  roles.nombre_rol.toLowerCase().includes(busqueda.toLowerCase())
);

  useEffect(() => {
    listarRoles();
  }, []);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Listado de Roles</h1>
      <div className={styles.Flex}>
        <div className={styles.Flex__item}>
          <div className={styles.ContainerInput}>
            <input
              required
              name="nombre"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
              onChange={handleBusquedaChange}
            />
            <span className={styles.ContainerInput__Span}>Nombre del Rol</span>
          </div>
        </div>

        <div className={styles.Flex__item}>
          <Link className={styles.Button}>
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </div>
            <span className={styles.Button__Span}>Crear Nuevo Rol</span>
          </Link>
        </div>
      </div>

      <div className={styles.ContainerTable}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>ID Rol</th>
              <th>Nombre Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {RolesFiltradas.map((row, index) => (
                <tr key={index}>
                  <td>{row.id_roles}</td>
                  <td>{row.nombre_rol}</td>
                  <td className={styles.actionsBeneficiary}>
                    <div className={styles.tooltip}>
                      <span className={styles.tooltiptext}>Editar Permisos</span>
                      <Link onClick={()=>{sessionStorage.setItem('idRol', row.id_roles)}} to='/UpdateRol'>
                        <FontAwesomeIcon icon="fa-solid fa-file-pen" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        beneficiaryPerPage={rolesPerPage}
        allbeneficiary={roles.length}
        pagination={pagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ListaRoles;
