import React, { useState } from 'react';
import axios from 'axios';
import Pagination from '../../utils/pagination';
import styles from './Reporte.module.scss';
import { read, writeFileXLSX } from "xlsx";
import * as XLSX from "xlsx";

const FormReporteCualitativo = () => {
  const [search, setSearch] = useState('');
  const [beneficiario, setBeneficiario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(10);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = Array.isArray(beneficiario) ? beneficiario.slice(indexOfFirstSession, indexOfLastSession) : [];
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const [exportData, setExportData] = useState([]);
  // const exportToExcel = () => {
    
  //   const worksheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  //   XLSX.writeFile(workbook, 'reporte.xlsx');
  // };


  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet([
  //     { "Fecha Inicio": datos.desde, "Fecha Final": datos.hasta },
  //     ...exportData
  //   ]);

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Cualitativo");
  //   XLSX.writeFile(workbook, "Reporte Cualitativo.xlsx");
  // };

  const exportToExcel = () => {
    const fechaInicio = { "Fecha Inicio": datos.desde };
    const fechaFinal = { "Fecha Final": datos.hasta };
  
    const worksheet = XLSX.utils.json_to_sheet([
      { "Fecha Inicio": datos.desde, "Fecha Final": datos.hasta }
    ]);
    // Agregar título "Reporte Cualitativo" en la celda A1
    worksheet["A5"] = { v: "Reporte Cualitativo" };
  
    // Agregar las fechas en la misma fila
  worksheet["A2"] = { v: fechaInicio["Fecha Inicio"] };
  worksheet["B2"] = { v: fechaFinal["Fecha Final"] };
    // Agregar nombres de columna
    worksheet["A7"] = { v: "EMPRESA" };
    worksheet["B7"] = { v: "RANGO" };
    worksheet["C7"] = { v: "HOMBRES" };
    worksheet["D7"] = { v: "MUJERES" };

    // Agregar los datos debajo de los encabezados
    const dataRows = exportData.map((row, index) => ({
      A: { v: row.EMPRESA },
      B: { v: row.RANGO },
      C: { v: row.HOMBRES },
      D: { v: row.MUJERES },
    }));
  
    XLSX.utils.sheet_add_json(worksheet, dataRows, { skipHeader: true, origin: "A8" });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    XLSX.writeFile(workbook, "reporte.xlsx");
  };


  const [datos, setDatos] = useState({
    "desde": "",
    "hasta": ""
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const ListarReporteCualitativo = () => {
    const idUsuario = localStorage.getItem('idUsuario');
    const token = localStorage.getItem('Auth');

    if (!validarFechas()) {
      return;
    }
  
    axios
      .post('https://amordownapi-production.up.railway.app/reportes/reporteCualitativo', {desde:datos.desde, hasta: datos.hasta})
      .then(function (response) {
        setBeneficiario(response.data);
        setExportData(response.data);
        alert('Reporte Exitoso');
        console.log(response);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });
  };


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
              Buscar Reporte
            </button>
          </div>
          <div>
            <button className="Button" onClick={exportToExcel}>
              Exportar en Excel
            </button>
          </div>
        </div>

        <h1 className={styles.Titulo}>Lista de Reporte Cualitativo</h1>
        <table className={styles.Table}  id="report-table">
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
                return (
                  search.toLowerCase() === '' ||
                  item.NOMBRES.toLowerCase().includes(search) ||
                  item.APELLIDOS.toLowerCase().includes(search)
                );
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