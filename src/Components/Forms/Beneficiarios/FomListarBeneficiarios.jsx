import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./ListBeneficiarios.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import EditModal from "./EditModal";
import ModalPeri from "./ModalPeri";
import ModalEncargado from "./ModalEncargado";
import ModalHistorial from "./ModalHistorial";
import ModalPostNatal from "./ModalPostNatal";
import ModalPreNatal from "./ModalPreNatal";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../context/authContext.jsx"
const FormListarBeneficiario = () => {
  const [estadoBene, setEstadoBene] = useState("ACTIVO");
  const [showBeneficiario, setShowBeneficiario] = useState(false);
  const [encargado, SetEncargado] = useState(false);
  const [historialC, setHistorialC] = useState(false);
  const [prenatal, setPrenatal] = useState(false);
  const [peri, setPeri] = useState(false);
  const [postnatal, SetPostnatal] = useState(false);
  const { Api } = useAuth();
  const [busqueda, setBusqueda] = useState('')

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(false);

  const tokenDecode = jwt_decode(localStorage.getItem("Auth"));

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
    e.target.value = "";
  };

  const [beneficiarios, setBeneficiarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaryPerPage] = useState(5);


  const indexOfLastBeneficiary = currentPage * beneficiaryPerPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiaryPerPage;
  const currentBeneficiary = beneficiarios?.slice(
    indexOfFirstBeneficiary,
    indexOfLastBeneficiary
  );
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const ListarBeneficiarios = () => {
    axios
      .get(
        `${Api}beneficiarios/all`
      )
      .then(function (response) {
        const beneficiariosActivos = response.data.filter(
          (beneficiario) => beneficiario.ESTADO === estadoBene
        );
        setBeneficiarios(beneficiariosActivos);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  const ActivarBeneficiario = (idBene) => {
    axios
      .post(
        `${Api}beneficiarios/activarBeneficiario/${idBene}`
      )
      .then(function (response) {
        alert("Activado Exitoso");
        ListarBeneficiarios();
      })
      .catch(function (error) {
        alert("Error al activar el beneficiario");
        console.error(error);
      });
  };

  

  const InactivarBeneficiario = (idBene) => {
    axios
      .post(
        `${Api}beneficiarios/inactivarBeneficiario/${idBene}`
      )
      .then(function (response) {
        alert("Inactivado Exitoso");
        ListarBeneficiarios();
      })
      .catch(function (error) {
        alert("Error al inactivar el beneficiario");
        console.error(error);
      });
  };

  const showActiveBene = () => {
    setEstadoBene("ACTIVO");
    ListarBeneficiarios();
  };

  const showInActiveeBene = () => {
    setEstadoBene("INACTIVO");
    ListarBeneficiarios();
  };

  const Asistencia = (idBene) => {
    axios
      .post(
        `${Api}beneficiarios/AgregarAsistencia`, {Beneficiario: idBene}
      )
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert("Error al activar el beneficiario");
        console.error(error);
      });
  };

  useEffect(() => {
    ListarBeneficiarios();
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const BeneficiariosFiltrados = beneficiarios.filter((carnet) =>
    carnet.CARNET.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Titulo}>
          <h1>Lista de Beneficiarios</h1>
        </div>

        <div className={styles.ContainerInput}>
          <div>
          <input
            required
            name="nombre"
            placeholder=" "
            type="text"
            className={styles.ContainerInput__Input}
            onChange={handleBusquedaChange}
          />
          <span className={styles.ContainerInput__Span}>
            Carnet
          </span>
          </div>
        </div>

        <div className={styles.Container}>
          <span>Mostrar Estado del Beneficiario</span>
          <div className={styles.ContainerRadio}>
            <div className={styles.ContainerRadio__Radio}>
              <label htmlFor="Activos">
                <input
                  id="Activos"
                  required
                  value="Activos"
                  onClick={showActiveBene}
                  type="radio"
                  name="Estado"
                />
                Activos
              </label>
            </div>
            <div className={styles.ContainerRadio__Radio}>
              <label htmlFor="Inactivos">
                <input
                  id="Inactivos"
                  required
                  value="Inactivos"
                  onClick={showInActiveeBene}
                  type="radio"
                  name="Estado"
                />
                Inactivos
              </label>
            </div>
          </div>
        </div>

        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Carnet</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Tercer Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Genero</th>
                <th>Direccion</th>
                <th>Fecha de Nacimiento</th>
                <th>Edad</th>
                <th>Etapa</th>
                <th>Acciones</th>
                {tokenDecode.actualizar_bene == 0 ? null : <th>Editar</th>}
              </tr>
            </thead>
            <tbody>
              {BeneficiariosFiltrados
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.ID_BENEFICIARIO}</td>
                    <td>{row.CARNET}</td>
                    <td>{row.NOMBRE1}</td>
                    <td>{row.NOMBRE2}</td>
                    <td>{row.NOMBRE3}</td>
                    <td>{row.APELLIDO1}</td>
                    <td>{row.APELLIDO2}</td>
                    <td>{row.SEXO}</td>
                    <td>{row.DIRECCION}</td>
                    <td>{row.FECHA_NACIMIENTO.slice(0, 10)}</td>
                    <td>{row.EDAD}</td>
                    <td>{row.grupo_edad}</td>
                    <td className={styles.actionsBeneficiary}>                      
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>
                            Agregar Asistencia
                          </span>
                          <button onClick={() => {Asistencia(row.ID_BENEFICIARIO)}} >
                            <FontAwesomeIcon icon="fa-solid fa-calendar-check" />
                          </button>
                        </div>               

                      <div className={styles.tooltip}>
                        <span className={styles.tooltiptext}>
                          Ver Archivo 1
                        </span>
                        <button>
                          <a
                            href={`${Api}beneficiarios/${row.RUTA_ARCH1}`}
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
                            href={`${Api}beneficiarios/${row.RUTA_ARCH2}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-file" />
                          </a>
                        </button>
                      </div>
                      {tokenDecode.inhabilitar_bene == 0 ? null : estadoBene ==
                        "ACTIVO" ? (
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>Inactivar</span>
                          <button
                            onClick={() =>
                              InactivarBeneficiario(row.ID_BENEFICIARIO)
                            }
                          >
                            <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                          </button>
                        </div>
                      ) : estadoBene == "INACTIVO" ? (
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>Activar</span>
                          <button
                            onClick={() =>
                              ActivarBeneficiario(row.ID_BENEFICIARIO)
                            }
                          >
                            <FontAwesomeIcon icon="fa-solid fa-user-check" />
                          </button>
                        </div>
                      ) : null}
                    </td>
                    {tokenDecode.actualizar_bene == 0 ? null : (
                      <td className={styles.actionsBeneficiary}>
                        <select
                          id={index}
                          onChange={(e) => handleEditClick(e, row)}
                        >
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
};
export default FormListarBeneficiario;
