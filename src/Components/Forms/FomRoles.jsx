import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../utils/pagination'
import '../assets/scss/form.scss'
import Modal from  './Modal'

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

  
  const handleOnClose = () => setshowMyModal(false)


  const underSelect = (item) => {
    setDataSelect(item)
  }

  const ListarBeneficiarios = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/beneficiarios/all",
    })
      .then(function (response) {
        setBeneficiarios(response.data.data);
      })
      .catch(function (response) {
        alert("no se ha encontrado un registro")
        console.log(response);
      });
  }
  useEffect(() => {
    ListarBeneficiarios()
  }, [])

  return (
    <>
      <div className='ListaBeneficiarios-Container'>

        {/* search */}
        <div className="searchBeneficiary" >
          <input className="inputBeneficiary" onChange={(e) => setSearch(e.target.value)} placeholder="Ingrese el Beneficiario " type="text" />
        </div>
        <h1>Lista de beneficiarios</h1>
        <table class="tableBeneficiary">
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
              return search.toLowerCase() === '' ? item
                : item.NOMBRE1.toLowerCase().includes(search) || item.NOMBRE2.toLowerCase().includes(search)
            }).map((row, index) => (
              <tr key={index}>
                <td>{row.ID_BENEFICIARIO}</td>
                <td>{row.NOMBRE1}</td>
                <td>{row.NOMBRE2}</td>
                <td>{row.APELLIDO1}</td>
                <td>{row.APELLIDO2}</td>
                <td>{row.SEXO}</td>
                <td>{row.DIRECCION}</td>
                <td className='actionsBeneficiary'><div className='tooltip'><span class="tooltiptext">Agregar cita</span>
                  <button onClick={() => { setshowMyModal(true), underSelect(row) }}><span class="material-symbols-sharp">
                    group_add
                  </span></button>
                </div></td>
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