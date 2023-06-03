import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./ListaCitas.module.scss";

const FormListarCitas = () => {
  const [search, setSearch] = useState("");
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

  const [Area, setIdArea] = React.useState({
    idArea: parseInt(localStorage.getItem("idArea")),
  });

  const token = localStorage.getItem("Auth");

  const ListarSesionesPorArea = () => {
    axios
      .get(
        `https://amordownapi-production.up.railway.app/sesiones/AreaSesiones/${token}`,
        Area
      )
      .then(function (response) {
        setSesiones(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  useEffect(() => {
    ListarSesionesPorArea();
  }, []);

  return (
    <>
      <div className={styles.Container}>
        {/* search */}

        <h1 className={styles.Titulo}>Listado de Sesiones</h1>

        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID Sesion</th>
                <th>ID Beneficiario</th>
                <th>Beneficiario</th>
                <th>Fecha</th>
                <th>Terapia</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.BENEFICIARIO.toLowerCase().includes(search) ||
                        item.BENEFICIARIO.toLowerCase().includes(search);
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.ID_SESION_BENEFICIARIO}</td>
                    <td>{row.ID_BENEFICIARIO}</td>
                    <td>{row.BENEFICIARIO}</td>
                    <td>{row.FECHA.slice(0, 10)}</td>
                    <td>{row.NOMBRE}</td>
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
      </div>
    </>
  );
};

export default FormListarCitas;
