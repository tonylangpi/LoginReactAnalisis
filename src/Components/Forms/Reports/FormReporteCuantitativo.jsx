import React, { useState } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";

const FormReporteCuantitativo = () => {
  const [search, setSearch] = useState("");
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

  const descargarArchivo = () => {
    if (!validarFechas()) {
      return;
    }

    axios
      .post(
        "https://amordownapi-production.up.railway.app/reportes/descargarReporteCuantitativo",
        {
          desde: datos.desde,
          hasta: datos.hasta,
        },
        {
          responseType: "blob", // Indicar que la respuesta es un archivo binario
        }
      )
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Reporte Cuantitativo.xlsx"); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const ListarReporteCuantitativo = () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("Auth");

    if (!validarFechas()) {
      return;
    }

    axios
      .post(
        "https://amordownapi-production.up.railway.app/reportes/reporteCuantitativo",
        { desde: datos.desde, hasta: datos.hasta }
      )
      .then(function (response) {
        setBeneficiario(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  const validarFechas = () => {
    const fechaInicio = new Date(datos.desde).getTime();
    const fechaFinal = new Date(datos.hasta).getTime();

    if (isNaN(fechaInicio) || isNaN(fechaFinal)) {
      alert("Ingresa fechas válidas");
      return false;
    }

    if (fechaInicio > fechaFinal) {
      alert("La fecha de inicio debe ser anterior o igual a la fecha final");
      return false;
    }

    return true;
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
            <button className="Button" onClick={ListarReporteCuantitativo}>
              Buscar Reporte
            </button>
          </div>

          <div className={styles.Grid__button}>
            <a className="Button" onClick={descargarArchivo}>
              Exportar en Excel
            </a>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Reporte Cuantitativo</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Nombres </th>
                <th>Apellidos</th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>Clasificacion</th>
                <th>Diagnostico</th>
                <th>Discapacidad</th>
                <th>Asistencia</th>
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
                    <td>{row.NOMBRES}</td>
                    <td>{row.APELLIDOS}</td>
                    <td>{row.SEXO}</td>
                    <td>{Math.trunc(row.EDAD)}</td>
                    <td>{row.CLASIFICACION}</td>
                    <td>{row.DIAGNOSTICO}</td>
                    <td>{row.DISCAPACIDAD}</td>
                    <td>{row.ASISTENCIA}</td>
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

export default FormReporteCuantitativo;
