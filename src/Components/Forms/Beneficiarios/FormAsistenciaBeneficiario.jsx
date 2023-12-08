import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../utils/pagination";
import styles from "./ListBeneficiarios.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../context/authContext.jsx"
const FormListarBeneficiario = () => {

  const tokenDecode = jwt_decode(localStorage.getItem("Auth"));
  
  const [dataSelect, setDataSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaryPerPage] = useState(5);
  const [Fecha, setFecha] = useState('')
  const [showMyModal, setshowMyModal] = useState(false);
  
  const { Api } = useAuth();
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  const handleOnClose = () => setshowMyModal(false);
  const underSelect = (item) => {
    setDataSelect(item);
  };
  const [Listado, setListado] = useState([])

  const ListarAsistencia = () => {
    if(Fecha){
      axios
      .post(
        `${Api}beneficiarios/ListarAsistencias`,
        { Fecha }
      )
      .then(function (response) {
        
        setListado(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
    } else {
      alert("Ingrese la fecha")
    }

  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Titulo}>
          <h1>Lista de Beneficiarios Asistidos</h1>
        </div>

        <div className={styles.ContainerInput}>
          <input
            required
            name="fecha"
            placeholder=" "
            type="date"
            className={styles.ContainerInput__Input}
            onChange={(e) => setFecha(e.target.value)}
          />
          <span className={styles.ContainerInput__Span}>
            Fecha
          </span>
        </div>
        <div className={styles.Grid__button}>
            <button className="Button" onClick={ListarAsistencia}>
              Consultar
            </button>
          </div>

        <div className={styles.ContainerTable}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sucursal</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Listado.map(row => (
                  <tr key={row.ID_BENEFICIARIO}>
                    <td>{row.ID_BENEFICIARIO}</td>
                    <td>{row.SUCURSAL}</td>
                    <td>{row.NOMBRES}</td>
                    <td>{row.APELLIDOS}</td>
                    <td>{new Date(row.FECHA).toISOString().split('T')[0]}</td>                    
                    <td className={styles.actionsBeneficiary}>
                      {tokenDecode.crear_sesiones == 0 ? null : (
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
                    </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          beneficiaryPerPage={beneficiaryPerPage}
          allbeneficiary={Listado.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <Modal
          dataSelect={dataSelect}
          fecha={Fecha}
          onClose={handleOnClose}
          visible={showMyModal}
        />
      </div>
    </>
  );
};
export default FormListarBeneficiario;
