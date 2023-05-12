import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../utils/pagination';
import '../assets/scss/form.scss'
import styles from './ReporteArea.module.scss';

const FormReporteArea = () => {
  const [search, setSearch] = useState('');
  const [sesiones, setSesiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sesiones?.slice(indexOfFirstSession, indexOfLastSession);
  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  
  const [datos, setDatos] = React.useState({
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
      .get(`http://localhost:4000/reportes/sesionesPorArea/${1}/${idEmpresa}`, datos)
      .then(function (response) {
        console.log(response);
        setSesiones(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
        console.log(error);
      });
  };

  useEffect(() => {
    ListarSesionesPorArea();
  }, []);

  return (
    <>
      <div className={styles.Container}>
        {/* search */}
        <div className='searchSession'>
          <input
            className='inputSession'
            onChange={saveDataTemporaly}
            name="fecha_desde"
            placeholder='Ingrese la sesión'
            type='date'
          />
          <label>Fecha Inicio</label>
        </div>

        <div className='searchSession'>
          <input
            className='inputSession'
            onChange={saveDataTemporaly}
            name="fecha_hasta"
            placeholder='Ingrese la sesión'
            type='date'
          />
          <label>Fecha Final</label>
        </div>

        <h1>Lista de sesiones por área</h1>
        <table className='Table'>
          <thead>
            <tr>
              <th>Area</th>
              <th>Beneficiario</th>
              <th>Sesiones</th>
              <th>Fecha</th>
              <th>Hora Egreso</th>
              <th>Hora Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.filter((item) => {
              return search.toLowerCase() === '' ? item
                : item.BENEFICIARIO.toLowerCase().includes(search) || item.BENEFICIARIO.toLowerCase().includes(search)
            }).map((row, index) => (
              <tr key={index}>
                <td>{row.AREA}</td>
                <td>{row.BENEFICIARIO}</td>
                <td>{row.SESIONES}</td>
                <td>{row.FECHA}</td>
                <td>{row.HORA_EGRESO}</td>
                <td>{row.HORA_INGRESO}</td>
              </tr>
            ))}
          </tbody>
        </table>
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