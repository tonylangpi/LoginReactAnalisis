import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";
import {useAuth} from "../../../context/authContext.jsx"
const FormReporteArea = () => {
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const { Api } = useAuth();
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sesiones?.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const [datos, setDatos] = React.useState({
    fecha_desde: "",
    fecha_hasta: "",
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const ListarSesionesPorArea = () => {
    const token = localStorage.getItem("Auth");
    if(datos.fecha_desde && datos.fecha_hasta){
      axios
      .get(
        `${Api}reportes/sesionesPorArea/${token}/${datos.fecha_desde}/${datos.fecha_hasta}`,
        datos
      )
      .then(function (response) {
        setSesiones(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
    } else {
      alert("Ingrese el rango de fechas")
    }
    
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                onChange={saveDataTemporaly}
                name="fecha_desde"
                placeholder=" "
                type="date"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Fecha Inicio</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                onChange={saveDataTemporaly}
                name="fecha_hasta"
                placeholder=" "
                type="date"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Fecha Final</span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className="Button" onClick={ListarSesionesPorArea}>
              Consultar
            </button>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de sesiones por área</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Area</th>
                <th>Beneficiario</th>
                <th>Sesiones</th>
                <th>Fecha</th>
                <th>Hora Ingreso</th>
                <th>Hora Egreso</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions
                .filter((item) => {
                  return item;
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.AREA}</td>
                    <td>{row.BENEFICIARIO}</td>
                    <td>{row.SESIONES}</td>
                    <td>{row.FECHA.slice(0, 10)}</td>
                    <td>{row.HORA_INGRESO}</td>
                    <td>{row.HORA_EGRESO}</td>
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

export default FormReporteArea;
