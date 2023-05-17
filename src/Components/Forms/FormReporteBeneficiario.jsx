import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../utils/pagination';
import '../assets/scss/form.scss'
import styles from './Reporte.module.scss';

const FormReporteBeneficiario = () => {
  const [search, setSearch] = useState('');
  const [beneficiario, setBeneficiario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = beneficiario?.slice(indexOfFirstSession, indexOfLastSession);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  
  const [datos, setDatos] = React.useState({
    idBeneficiario: "",
    fecha_desde: "",
    fecha_hasta: ""
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const ListarSesionesPorArea = () => {
    const idUsuario = localStorage.getItem('idUsuario');
    const idEmpresa = localStorage.getItem('idEmpresa');

    axios
      .get(`http://localhost:4000/reportes/sesionesPorBeneficiario/${datos.idBeneficiario}/${idEmpresa}/${datos.fecha_desde}/${datos.fecha_hasta}`)
      .then(function (response) {
        setBeneficiario(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });
  };

  // useEffect(() => {
  //   ListarSesionesPorArea();
  // }, []);

  return (
    <>
      <div className={styles.Container}>
        {/* search */}
        <div className={styles.ContainerSearch}>
          <div className={styles.ContainerInput}>
            <input
              onChange={saveDataTemporaly}
              name="fecha_desde"
              placeholder=' '
              type='date'
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Fecha Inicio
            </span>
          </div>

          <div className={styles.ContainerInput}>
            <input
              onChange={saveDataTemporaly}
              name="fecha_hasta"
              placeholder=' '
              type='date'
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Fecha Final
            </span>
          </div>

          <div className={styles.ContainerInput}>
            <input
              onChange={saveDataTemporaly}
              name="idBeneficiario"
              placeholder=' '
              type='number'
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              ID Beneficiario
            </span>
          </div>

          <button className='Button' onClick={ListarSesionesPorArea}>Buscar Reporte</button>
        </div>

        <h1 className={styles.Titulo}>Lista de Sesiones por Beneficiario</h1>
        <table className='Table'>
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
            {currentSessions.filter((item) => {
              return search.toLowerCase() === '' ? item
                : item.BENEFICIARIO.toLowerCase().includes(search) || item.BENEFICIARIO.toLowerCase().includes(search)
            }).map((row, index) => (
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