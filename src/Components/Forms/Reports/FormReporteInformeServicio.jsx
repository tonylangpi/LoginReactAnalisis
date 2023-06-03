import React, { useState } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./Reporte.module.scss";

const FormReporteInformeServicio = () => {
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

  const ListarReporteInformeServicio = () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("Auth");

    axios
      .post(
        "https://amordownapi-production.up.railway.app/reportes/reporteInformeServicio",
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
            <button className="Button" onClick={ListarReporteInformeServicio}>
              Buscar Reporte
            </button>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Reporte Informe de Servicio</h1>
        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Area</th>
                <th>Beneficiarios Atendidos</th>
                <th>Terapias Brindadas</th>
                <th>Mes</th>
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
                    <td>{row.AREA}</td>
                    <td>{row.BENEFICIARIOS_ATENDIDOS}</td>
                    <td>{row.TERAPIAS_BRINDADAS}</td>
                    <td>{row.MES}</td>
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

export default FormReporteInformeServicio;
