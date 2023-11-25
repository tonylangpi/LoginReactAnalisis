import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";

const FormReporteBeneficiario = () => {
  const [beneficiario, setBeneficiario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = beneficiario?.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  const [datos, setDatos] = React.useState({
    idBeneficiario: "",
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

    axios
      .get(
        `http://localhost:4000/reportes/sesionesPorBeneficiario/${datos.idBeneficiario}/${token}/${datos.fecha_desde}/${datos.fecha_hasta}`
      )
      .then(function (response) {
        setBeneficiario(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
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

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                onChange={saveDataTemporaly}
                name="idBeneficiario"
                placeholder=" "
                type="number"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                ID Beneficiario
              </span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className="Button" onClick={ListarSesionesPorArea}>
              Consultar
            </button>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Sesiones por Beneficiario</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Area Atendido</th>
                <th>Beneficiario</th>
                <th>Edad</th>
                <th>Fecha</th>
                <th>Horario Atendido</th>
                <th>Sesion Atendido</th>
                <th>Sexo</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions
                .filter((item) => {
                  return item;
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.AREA_ATENDIO}</td>
                    <td>{row.BENEFICIARIO}</td>
                    <td>{Math.trunc(row.EDAD)}</td>
                    <td>{row.FECHA.slice(0, 10)}</td>
                    <td>{row.HORARIO_ATENDIDO}</td>
                    <td>{row.SESION_ATENDIDA}</td>
                    <td>{row.SEXO}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          beneficiaryPerPage={sessionsPerPage}
          allbeneficiary={beneficiario.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default FormReporteBeneficiario;
