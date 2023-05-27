import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../../utils/pagination';
import styles from './ListBeneficiarios.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from './Modal';

import EditModal from './EditModal';
import Dropdown from 'react-dropdown-select';
import ModalPeri from './ModalPeri';
import ModalEncargado from './ModalEncargado';
import ModalHistorial from './ModalHistorial';

import ModalPostNatal from './ModalPostNatal';
import ModalPreNatal from './ModalPreNatal';
import { Link } from 'react-router-dom';


const FormListarBeneficiario = () => {

  const [selectedOption, setSelectedOption] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [historialC, setHistorialC] = useState(false);
  const [peri, setPeri] = useState(false);
  const [prenatal, setPrenatal] = useState(false);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(false);
 
  
  const handleEditClick1 = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setShowEditModal(true);
  };

  const handleEditClick2 = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setHistorialC(true);
  };

  const handleEditClick3 = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setPeri(true);
  };

  const handleEditClick4 = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setPrenatal(true);
  };

  // const handleEditClick = () => {
  //   setDropdown(true);
  //   setSelectedOption(null);
  // };

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
      .post(`https://amordownapi-production.up.railway.app/beneficiarios/allByName`, { nombre: name.nombre })
      .then(function (response) {
        setBeneficiarios(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

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
              {localStorage.getItem('nivel') == 3 ? null : (
                <th>Editar</th>
              )}
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
                  {localStorage.getItem('nivel') == 3 ? null : (
                    <div className={styles.tooltip}><span className={styles.tooltiptext}>Agregar Cita</span>
                      <button onClick={() => { setshowMyModal(true), underSelect(row) }}><FontAwesomeIcon icon="fa-solid fa-calendar-check" /></button>
                    </div>
                  )}
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
                {localStorage.getItem('nivel') == 3 ? null : (
                  <td className={styles.actionsBeneficiary}>

                    <div className={styles.tooltip}><span className={styles.tooltiptext}>Agregar Cita</span>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => { handleEditClick1(row) }} >
                              <span className={styles.tooltiptext}>Datos</span>
                              <FontAwesomeIcon icon="fa-solid fa-user" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.tooltip}><span className={styles.tooltiptext}></span>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => handleEditClick2(row)}>
                              <span className={styles.tooltiptext}>Encargado</span>
                              <FontAwesomeIcon icon="fa-solid fa-person" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.tooltip}>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => { handleEditClick2(row) }}>
                              <span className={styles.tooltiptext}>Historial Clinico</span>
                              <FontAwesomeIcon icon="fa-sharp fa-light fa-clipboard" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.tooltip}>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => { handleEditClick3(row) }}>
                              <span className={styles.tooltiptext}>Editar PeriNatal</span>
                              <FontAwesomeIcon icon="fa-sharp fa-light fa-baby-carriage" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.tooltip}>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => setSelectedOption('option4')}>
                              <span className={styles.tooltiptext}>Editar PostNatal</span>
                              <FontAwesomeIcon icon="fa-solid fa-notes-medical" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.tooltip}>
                      {Dropdown && (
                        <div className={styles.dropdownContent}>
                          <div className={styles.tooltip}>
                            <button onClick={() => { handleEditClick4(row) }}>
                              <span className={styles.tooltiptext}>Editar PreNatal</span>
                              <FontAwesomeIcon icon="fa-solid fa-person-pregnant" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </td>
                )}
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

        {showEditModal && selectedBeneficiary && (
          <EditModal beneficiary={selectedBeneficiary} onClose={() => setShowEditModal(false)} />
        )}
        {peri && selectedBeneficiary && (
          <ModalPeri beneficiary={selectedBeneficiary} onClose={() => setPeri(false)} />
        )}

        {selectedOption === 'option2' && (
          <ModalEncargado beneficiary={selectedBeneficiary} onClose={() => setSelectedOption(false)} />
        )}

        {historialC && selectedBeneficiary && (
          <ModalHistorial beneficiary={selectedBeneficiary} onClose={() => setHistorialC(false)} />
        )}

        {selectedOption === 'option4' && (
          <ModalPostNatal beneficiary={selectedBeneficiary} onClose={() => setSelectedOption(false)} />
        )}
        {prenatal&& selectedBeneficiary && (
          <ModalPreNatal beneficiary={selectedBeneficiary} onClose={() => setPrenatal(false)} />
        )}


      </div>
    </>
  )
}
export default FormListarBeneficiario

