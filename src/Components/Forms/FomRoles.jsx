import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Pagination from '../utils/pagination'
import '../assets/scss/form.scss'

const FomRoles = () => {
  const [search, setSearch] = useState('')
  const [archivo, setArchivo] = useState(null)
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaryPerPage] = useState(5);
  const indexOfLastBeneficiary = currentPage * beneficiaryPerPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - beneficiaryPerPage;
  const currentBeneficiary = beneficiarios?.slice(indexOfFirstBeneficiary, indexOfLastBeneficiary);
  const pagination = (pageNumber) => { setCurrentPage(pageNumber) };

  const sesion = [
    { id: 1, title: "Sesion 1" },
    { id: 2, title: "Sesion 2" },
    { id: 3, title: "Sesion 3" },
    { id: 4, title: "Sesion 4" },
    { id: 5, title: "Sesion 5" },
    { id: 6, title: "Sesion 6" },
    { id: 7, title: "Sesion 7" },
    { id: 8, title: "Sesion 8" },
    { id: 9, title: "Sesion 9" },
    { id: 10, title: "Sesion 10" },
    { id: 11, title: "Sesion 11" },
    { id: 12, title: "Sesion 12" },
    { id: 13, title: "Sesion 13" },
    { id: 14, title: "Sesion 14" },

  ]

  const selectImageList = (e) => {
    const uplodad = e.target.files
    // console.log(uplodad.length)
    if (uplodad.length > 1) {
      alert("No puedes subir más de 1 archivos")
      setArchivo(null)
    } else {
      const uplodadList = []

      for (let i = 0; i < uplodad?.length; i++) {
        uplodadList.push(uplodad.item(i))
      }
      setArchivo(uplodadList)
    }
  }
  const [citas, setCitas] = React.useState({
    id_beneficiario: "",
    id_usuario: "",
    id_sesion: "",
    tipo_sesion: "",
    observacion: "",
    fecha: "",
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setCitas({
      ...citas,
      [e.target.name]: e.target.value
    })
  }

  const fileSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id_beneficiario', dataSelect.ID_BENEFICIARIO)
      formData.append('id_usuario', 1)
      formData.append('id_sesion', citas.id_sesion)
      formData.append('tipo_sesion', citas.tipo_sesion)
      formData.append('observacion', citas.observacion)
      formData.append('fecha', citas.fecha)
      for (let i = 0; i < archivo?.length; i++) {
        formData.append('evaluaciones', archivo[i])
      }
      axios({
        method: "POST",
        url: "http://localhost:4000/sesiones/createSesion",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log('hola', response);
        })
        .catch(function (response) {
          alert("No se ha encontrado un registro")
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const underSelect = (item) => {
    console.log(item);
    setDataSelect(item)
    const modal = document.getElementById('Modal');
    modal.style.display = 'flex';
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
        <div id="Modal" className="Beneficiario-Container-Modal">
          <div className="Beneficiario-Container-Modal__Modal">

            <form onSubmit={fileSubmit} action="">
              <div className='Container-Citas__Grid'>

                <div className="Container-Citas__Grid-item">
                  <div className="Citas-Container-Input">
                    <input
                      onChange={saveDataTemporaly}
                      value={`${dataSelect.NOMBRE1} ${dataSelect.APELLIDO1}`}
                      id='NombreBeneficiario'
                      type="text"
                      name='id_beneficiario'
                      className="Citas-Container-Input__Input" />
                    {/* <span className="Citas-Container-Input__Span">Nombre Beneficia</span> */}
                  </div>
                </div>

                <div className="Container-Citas__Grid-item">
                  <div className="Citas-Container-Input">
                    <select onChange={saveDataTemporaly} className='Citas-Container-Input__Input' name='id_sesion' id="">
                      {
                        sesion.map((item) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))
                      }
                    </select>
                    <span className="Citas-Container-Input__Span">Sessiones</span>
                  </div>
                </div>

                <div className="Container-Citas__Grid-item">
                  <div className="Citas-Container-Input">
                    <input
                      onChange={saveDataTemporaly}
                      type="date"
                      name='fecha'
                      placeholder=" "
                      className="Citas-Container-Input__Input" />
                    <span className="Citas-Container-Input__Span">Fecha</span>
                  </div>
                </div>

                <div className="Container-Citas__Grid-item">
                  <div className="Citas-Container-Radio">
                    <label htmlFor="">¿Tipo de Sessión?</label>
                    <div className='Citas-Container-Radio__Radio'>
                      <div className='InputRadio'>
                        <input onChange={saveDataTemporaly} class="" type="radio" value={"Normal"} name="tipo_sesion" />Normal
                      </div>
                      <div className='InputRadio'>
                        <input onChange={saveDataTemporaly} class="" type="radio" value={"Inicial"} name="tipo_sesion" />Incial
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Container-Citas__item TextArea">
                  <div className="Citas-Container-Input">
                    <textarea onChange={saveDataTemporaly} name='observacion' className='Citas-Container-Input__Input' placeholder=" "></textarea>
                    <span className="Citas-Container-Input__Span">Observaciones:</span>
                  </div>
                </div>

                <div className="Container-Citas__item TextArea">
                  <div className="Container-Input-file">
                    <span className="Container-Input-file__Span">Hoja</span>
                    <input
                      name='files'
                      onChange={selectImageList}
                      placeholder=" "
                      type="file"
                      className="Container-Input-file__Input" />
                  </div>
                </div>
                <button className='Button'>Registrar Cita</button>
              </div>
            </form>
          </div>
        </div>
        {/* search */}
          <div className="searchBeneficiary" >
            <input className="inputBeneficiary" onChange={(e)=>setSearch(e.target.value)} placeholder="Ingrese el Beneficiario " type="text" />
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
            {currentBeneficiary.filter((item)=>{
              return search.toLowerCase()=== '' ? item
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
                  <button onClick={(e) => underSelect(row)}><span class="material-symbols-sharp">
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
      </div>

    </>
  )
}

export default FomRoles