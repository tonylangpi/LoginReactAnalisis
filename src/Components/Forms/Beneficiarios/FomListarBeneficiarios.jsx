import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../../utils/pagination';
import styles from './ListBeneficiarios.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from './Modal';

const FomRoles = () => {
  const [search, setSearch] = useState('')
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaryPerPage] = useState(5);
  const [showMyModal, setshowMyModal] = useState(false)
  const indexOfLastBeneficiary = currentPage * beneficiaryPerPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiaryPerPage;
  const currentBeneficiary = beneficiarios?.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);
  const pagination = (pageNumber) => { setCurrentPage(pageNumber) };
  
  const [name, setName] = React.useState({
    nombre: ''
  });

  const handleOnClose = () => setshowMyModal(false)
  const underSelect = (item) => {
    setDataSelect(item)
  }

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
    ListarBeneficiarios();
  };

  const ListarBeneficiarios = () => {
    axios
      .post(`http://localhost:4000/beneficiarios/all`, {nombre: name.nombre})
      .then(function (response) {
        setBeneficiarios(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

    // axios({
    //   method: "post",
    //   url: "http://localhost:4000/beneficiarios/all",
    // })
    //   .then(function (response) {
    //     setBeneficiarios(response.data.data);
    //   })
    //   .catch(function (response) {
    //     alert("no se ha encontrado un registro")
    //     console.log(response);
    //   });
  }

  useEffect(() => {
    ListarBeneficiarios()
  }, [])

  return (
    <>
      <div className={styles.Container}>

        {/* search */}
        
        <div className={styles.Titulo}>
          <h1>Lista de Beneficiarios</h1>
        </div>

        <div className={styles.ContainerInput}>
          <input
            required
            name="nombre"
            placeholder=" "
            type="text"
            className={styles.ContainerInput__Input}
            onKeyUp={saveDataTemporaly}
          />
          <span className={styles.ContainerInput__Span}>
            Ingrese el Beneficiario
          </span>
        </div>

        <table className={styles.Table}>
          <thead>
            <tr>
              <th>ID Beneficiario</th>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Genero</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentBeneficiary.filter((item) => {
               return item
            }).map((row, index) => (
              <tr key={index}>
                <td>{row.ID_BENEFICIARIO}</td>
                <td>{row.NOMBRE1}</td>
                <td>{row.NOMBRE2}</td>
                <td>{row.APELLIDO1}</td>
                <td>{row.APELLIDO2}</td>
                <td>{row.SEXO}</td>
                <td>{row.DIRECCION}</td>
                <td className={styles.actionsBeneficiary}>
                  <div className={styles.tooltip}><span className={styles.tooltiptext}>Agregar Cita</span>
                    <button onClick={() => { setshowMyModal(true), underSelect(row) }}><FontAwesomeIcon icon="fa-solid fa-calendar-check" /></button>
                  </div>
                  <div className={styles.tooltip}><span className={styles.tooltiptext}>Ver Archivo 1</span>
                    <button>
                        <a href={`http://localhost:4000/beneficiarios/${row.RUTA_ARCH1}`} target="_blank" ><FontAwesomeIcon icon="fa-solid fa-file" /></a>
                    </button>
                  </div>
                  <div className={styles.tooltip}><span className={styles.tooltiptext}>Ver Archivo 2</span>
                    <button>
                        <a href={`http://localhost:4000/beneficiarios/${row.RUTA_ARCH2}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-solid fa-file" /></a>
                    </button>
                  </div>
                </td>
                {/* <td className='actionsBeneficiary'>
                  
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          beneficiaryPerPage={beneficiaryPerPage}
          allbeneficiary={beneficiarios.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <Modal
          dataSelect={dataSelect}
          onClose={handleOnClose}
          visible={showMyModal}
        />
      </div>
    </>
  )
}

export default FomRoles