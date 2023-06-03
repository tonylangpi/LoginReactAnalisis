import React, { useState } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";

const FormReporteF9 = () => {
  const [search, setSearch] = useState("");
  const [beneficiario, setBeneficiario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(10);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = Array.isArray(beneficiario)
    ? beneficiario.slice(indexOfFirstSession, indexOfLastSession)
    : [];
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const [datos, setDatos] = useState({
    desde: "",
    hasta: "",
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const ListarReporteF9 = () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("Auth");

    axios
      .post(
        "https://amordownapi-production.up.railway.app/reportes/reporteF9",
        { desde: datos.desde, hasta: datos.hasta }
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
                name="desde"
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
                name="hasta"
                placeholder=" "
                type="date"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Fecha Final</span>
            </div>
          </div>

          <div className={styles.Grid__button}>
            <button className="Button" onClick={ListarReporteF9}>
              Buscar Reporte
            </button>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Reporte F9</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Fechas Dias</th>
                <th>Referencia</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Direccion </th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>Discapacidad</th>
                <th>Escolaridad</th>
                <th>Tipo de Sesión</th>
                <th>Diagnostico</th>
                <th>Servicio Recibido</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions
                .filter((item) => {
                  return (
                    search.toLowerCase() === "" ||
                    item.NOMBRES.toLowerCase().includes(search) ||
                    item.APELLIDOS.toLowerCase().includes(search)
                  );
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.FECHA_DIAS}</td>
                    <td>{row.REFERENCIA}</td>
                    <td>{row.NOMBRES}</td>
                    <td>{row.APELLIDOS}</td>
                    <td>{row.DIRECCION}</td>
                    <td>{row.SEXO}</td>
                    <td>{Math.trunc(row.EDAD)}</td>
                    <td>{row.DISCAPACIDAD}</td>
                    <td>{row.ESCOLARIDAD}</td>
                    <td>{row.TIPO_SESION}</td>
                    <td>{row.DIAGNOSTICO}</td>
                    <td>{row.SERVICIO_RECIBIDO}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          sessionsPerPage={sessionsPerPage}
          totalSessions={beneficiario.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default FormReporteF9;
