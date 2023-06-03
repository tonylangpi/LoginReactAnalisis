import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../../utils/pagination';
import styles from './ListBeneficiarios.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from './Modal';
import EditModal from './EditModal';
import ModalPeri from './ModalPeri';
import ModalEncargado from './ModalEncargado';
import ModalHistorial from './ModalHistorial';
import ModalPostNatal from './ModalPostNatal';
import ModalPreNatal from './ModalPreNatal';


const FormListarBeneficiario = () => {

  const [estadoBene, setEstadoBene] = useState('ACTIVO');
  const [showBeneficiario, setShowBeneficiario] = useState(false);
  const [encargado, SetEncargado] = useState(false);
  const [historialC, setHistorialC] = useState(false);
  const [prenatal, setPrenatal] = useState(false);
  const [peri, setPeri] = useState(false);
  const [postnatal, SetPostnatal] = useState(false);
  
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(false);

  const handleEditClick = (e, beneficiary) => {
    let value = e.target.value;
    if (value == 1) {
      setSelectedBeneficiary(beneficiary);
      setShowBeneficiario(true);
    } else if (value == 2) {
      setSelectedBeneficiary(beneficiary);
      SetEncargado(true);
    } else if (value == 3) {
      setSelectedBeneficiary(beneficiary);
      setHistorialC(true);
    } else if (value == 4) {
      setSelectedBeneficiary(beneficiary);
      setPrenatal(true);
    } else if (value == 5) {
      setSelectedBeneficiary(beneficiary);
      setPeri(true);
    } else if (value == 6) {
      setSelectedBeneficiary(beneficiary);
      SetPostnatal(true);
    }
  };

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
        // Filtrar solo los beneficiarios activos
        const beneficiariosActivos = response.data.filter(beneficiario => beneficiario.ESTADO === estadoBene);
        setBeneficiarios(beneficiariosActivos);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });
  }

  const ActivarBeneficiario = (idBene) =>{
    axios
      .post(`https://amordownapi-production.up.railway.app/beneficiarios/activarBeneficiario/${idBene}`)
      .then(function(response) {
          alert("Activado Exitoso");
          ListarBeneficiarios();
      })
      .catch(function(error){
        alert("Error al activar el beneficiario");
        console.error(error);
      });
  }

  const InactivarBeneficiario = (idBene) => {
    axios
      .post(`https://amordownapi-production.up.railway.app/beneficiarios/inactivarBeneficiario/${idBene}`)
      .then(function(response) {
          alert("Inactivado Exitoso");
          ListarBeneficiarios();
      })
      .catch(function(error){
        alert("Error al inactivar el beneficiario");
        console.error(error);
      });
  };

  const showActiveBene = () => {
    ListarBeneficiarios();
    setEstadoBene("ACTIVO");
  };

  const showInActiveeBene = () => {
    ListarBeneficiarios();
    setEstadoBene("INACTIVO");
  };

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

        <div className={styles.Container}>
          <label htmlFor="">Mostrar Estado del Beneficiario</label>
          <div className={styles.ContainerRadio}>
            <div className={styles.ContainerRadio__Radio}>
              <input
                required
                value="Activos"
                onClick={showActiveBene}
                type="radio"
                name="Estado"
              />
              Activos
            </div>
            <div className={styles.ContainerRadio__Radio}>
              <input
                required
                value="Inactivos"
                onClick={showInActiveeBene}
                type="radio"
                name="Estado"
              />
              Inactivos
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Tercer Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Genero</th>
                <th>Direccion</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones</th>
                {localStorage.getItem("nivel") == 3 ? null : <th>Editar</th>}
              </tr>
            </thead>
            <tbody>
              {currentBeneficiary
                .filter((item) => {
                  return item;
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.ID_BENEFICIARIO}</td>
                    <td>{row.NOMBRE1}</td>
                    <td>{row.NOMBRE2}</td>
                    <td>{row.NOMBRE3}</td>
                    <td>{row.APELLIDO1}</td>
                    <td>{row.APELLIDO2}</td>
                    <td>{row.SEXO}</td>
                    <td>{row.DIRECCION}</td>
                    <td>{row.FECHA_NACIMIENTO.slice(0, 10)}</td>
                    <td className={styles.actionsBeneficiary}>
                      {localStorage.getItem("nivel") == 3 ? null : (
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>
                            Agregar Cita
                          </span>
                          <button
                            onClick={() => {
                              setshowMyModal(true), underSelect(row);
                            }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
                          </button>
                        </div>
                      )}
                      <div className={styles.tooltip}>
                        <span className={styles.tooltiptext}>
                          Ver Archivo 1
                        </span>
                        <button>
                          <a
                            href={`https://amordownapi-production.up.railway.app/beneficiarios/${row.RUTA_ARCH1}`}
                            target="_blank"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-file" />
                          </a>
                        </button>
                      </div>
                      <div className={styles.tooltip}>
                        <span className={styles.tooltiptext}>
                          Ver Archivo 2
                        </span>
                        <button>
                          <a
                            href={`https://amordownapi-production.up.railway.app/beneficiarios/${row.RUTA_ARCH2}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-file" />
                          </a>
                        </button>
                      </div>

                      {estadoBene == "ACTIVO" ? (
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>Inactivar</span>
                          <button
                            onClick={() => InactivarBeneficiario(row.ID_BENEFICIARIO)}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                          </button>
                        </div>
                      ) : estadoBene == 'INACTIVO' ? (
                          <div className={styles.tooltip}>
                            <span className={styles.tooltiptext}>
                              Activar
                            </span>
                            <button
                              onClick={() => ActivarBeneficiario(row.ID_BENEFICIARIO)}
                            >
                              <FontAwesomeIcon icon="fa-solid fa-user-check" />
                            </button>
                          </div>
                        
                      ) : null}
                    </td>
                    {localStorage.getItem("nivel") == 3 ? null : (
                      <td className={styles.actionsBeneficiary}>
                        <select onChange={(e) => handleEditClick(e, row)}>
                          <option value={""}></option>
                          <option value={1}>Beneficiario</option>
                          <option value={2}>Encargado</option>
                          <option value={3}>Historial Clinico</option>
                          <option value={4}>Antecedentes Prenatales</option>
                          <option value={5}>Antecedentes PeriNatales</option>
                          <option value={6}>Antecedentes PostNatales</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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

        {showBeneficiario && selectedBeneficiary && (
          <EditModal
            beneficiary={selectedBeneficiary}
            onClose={() => setShowBeneficiario(false)}
          />
        )}

        {encargado && selectedBeneficiary && (
          <ModalEncargado
            beneficiary={selectedBeneficiary}
            onClose={() => SetEncargado(false)}
          />
        )}

        {historialC && selectedBeneficiary && (
          <ModalHistorial
            beneficiary={selectedBeneficiary}
            onClose={() => setHistorialC(false)}
          />
        )}

        {prenatal && selectedBeneficiary && (
          <ModalPreNatal
            beneficiary={selectedBeneficiary}
            onClose={() => setPrenatal(false)}
          />
        )}

        {peri && selectedBeneficiary && (
          <ModalPeri
            beneficiary={selectedBeneficiary}
            onClose={() => setPeri(false)}
          />
        )}

        {postnatal && selectedBeneficiary && (
          <ModalPostNatal
            beneficiary={selectedBeneficiary}
            onClose={() => SetPostnatal(false)}
          />
        )}
      </div>
    </>
  );
}
export default FormListarBeneficiario

