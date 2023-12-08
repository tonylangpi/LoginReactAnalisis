import React, { useState } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";
import {useAuth} from "../../../context/authContext.jsx"
const FormReporteCualitativo = () => {
  const [beneficiario, setBeneficiario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(10);
  const { Api } = useAuth();
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = Array.isArray(beneficiario)
    ? beneficiario.slice(indexOfFirstSession, indexOfLastSession)
    : [];
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const validarFechas = () => {
    const fechaInicio = new Date(datos.desde).getTime();
    const fechaFinal = new Date(datos.hasta).getTime();

    if (isNaN(fechaInicio) || isNaN(fechaFinal)) {
      alert('Ingresa fechas válidas');
      return false;
    }

    if (fechaInicio > fechaFinal) {
      alert('La fecha de inicio debe ser anterior o igual a la fecha final');
      return false;
    }

    return true;
  };

  const descargarArchivo = () => {
    if(datos.desde && datos.hasta){
      if (!validarFechas()) {
      return;
    }

    axios
      .post(
        `${Api}reportes/descargarReporteCualitativo`,
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
        link.setAttribute("download", "Reporte Cualitativo.xlsx"); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
    } else {
      alert("Ingrese el rango de fechas")
    }
    
  };

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

  const ListarReporteCualitativo = () => {
    if(datos.desde && datos.hasta){
      if (!validarFechas()) {
      return;
    }

    axios
      .post(
        `${Api}reportes/reporteCualitativo`,
        { desde: datos.desde, hasta: datos.hasta }
      )
      .then(function (response) {
        setBeneficiario(response.data);
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
            <button className="Button" onClick={ListarReporteCualitativo}>
              Consultar
            </button>
          </div>

          <div className={styles.Grid__button}>
            <a className="Button" onClick={descargarArchivo}>
              Exportar en Excel
            </a>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Reporte Cualitativo</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Rango</th>
                <th>Hombres</th>
                <th>Mujeres</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions
                .filter((item) => {
                  return item
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.EMPRESA}</td>
                    <td>{row.RANGO}</td>
                    <td>{row.HOMBRES}</td>
                    <td>{row.MUJERES}</td>
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

export default FormReporteCualitativo;
