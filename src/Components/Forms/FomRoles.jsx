import React, { useState } from 'react'
import axios from 'axios';

const FomRoles = () => {

  const [beneficiarios, setBeneficiarios] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);

  const [citas, setCitas] = React.useState({
    // id_beneficiario: "",
    id_usuario: 1,
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

  const fileSubmit =  async (e) => {
       e.preventDefault();
      try {
        const datas =  await axios.post("http://localhost:4000/sesiones/createSesion", {
          'id_beneficiario': 1, 'id_usuario': 1, 'id_sesion': 1, 'tipo_sesion': 'lol','observacion': 'ssss', 'fecha': '2023-04-1'
        })
        console.log(datas);
        // const data = new FormData();
        // data.append('id_beneficiario', 1)
        // data.append('id_usuario', 1)
        // data.append('id_sesion', 1)
        // data.append('tipo_sesion', 'normal')
        // data.append('observacion', 'lol')
        // data.append('fecha', '2023-02-21')
        // data.append('files', null)

        // console.log(data);
        // axios({
        //   method: "POST",
        //   url: "http://localhost:4000/sesiones/createSesion",
        //   data: data,
        //   headers: { "Content-Type": "multipart/form-data" },
        // })
        //   .then(function (response) {
        //     console.log('hola',response);
        //   })
        //   .catch(function (response) {
        //     alert("No se ha encontrado un registro")
        //     console.log(response);
        //   });
      } catch (error) {
        console.log(error);
      }
    }

  const underSelect = (item)=>{
    console.log(item);
    setDataSelect(item)
    // const nombreBene = document.getElementById('NombreBeneficiario');
    // nombreBene.value = `${item.NOMBRE1} ${item.APELLIDO1}`;
    const modal =  document.getElementById('Modal');
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
                    value={`${dataSelect.NOMBRE1} ${dataSelect.APELLIDO1}`}
                    id='NombreBeneficiario'
                    placeholder=" "
                    type="text"
                    className="Citas-Container-Input__Input" />
                  {/* <span className="Citas-Container-Input__Span">Nombre Beneficia</span> */}
                </div>
              </div>

              <div className="Container-Citas__Grid-item">
                <div className="Citas-Container-Input">
                  <select onChange={saveDataTemporaly} className='Citas-Container-Input__Input' name="" id="">
                    <option value="1">Sesion 1</option>
                    <option value="2">Sesion 2</option>
                    <option value="3">Sesion 3</option>
                    <option value="4">Sesion 4</option>
                    <option value="5">Sesion 5</option>
                    <option value="6">Sesion 6</option>
                    <option value="7">Sesion 7</option>
                    <option value="8">Sesion 8</option>
                    <option value="9">Sesion 9</option>
                    <option value="10">Sesion 10</option>
                    <option value="11">Sesion 11</option>
                    <option value="12">Sesion 12</option>
                    <option value="13">Sesion 13</option>
                    <option value="14">Sesion 14</option>
                  </select>
                  <span className="Citas-Container-Input__Span">Sessiones</span>
                </div>
              </div>

              <div className="Container-Citas__Grid-item">
                <div className="Citas-Container-Input">
                  <input
                    onChange={saveDataTemporaly}
                    type="date"
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
                      <input onChange={saveDataTemporaly} class="" type="radio" value={"Normal"} name="Normal" />Normal
                    </div>
                    <div className='InputRadio'>
                      <input onChange={saveDataTemporaly} class="" type="radio" value={"Inicial"} name="Normal" />Incial
                    </div>
                  </div>
                </div>
              </div>

              <div className="Container-Citas__item TextArea">
                <div className="Citas-Container-Input">
                  <textarea onChange={saveDataTemporaly} className='Citas-Container-Input__Input' placeholder=" "></textarea>
                  <span className="Citas-Container-Input__Span">Observaciones:</span>
                </div>
              </div>

              <div className="Container-Citas__item TextArea">
                <div className="Container-Input-file">
                  <span className="Container-Input-file__Span">Hoja</span>
                  <input
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

      <form action="">
        <div className="Container-Beneficiario__item Titulo">
          <label htmlFor="">Ingrese el nombre del Beneficiario</label>
          <input placeholder="Ingrese el Beneficiario " type="text" />
          <input onClick={ListarBeneficiarios} type="button" value={"Buscar"} />
        </div>
      </form>

      <h1>Lista de beneficiarios</h1>

      <table class="default">
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
          {beneficiarios.map((row, index) => (
            <tr key={index}>
              <td>{row.ID_BENEFICIARIO}</td>
              <td>{row.NOMBRE1}</td>
              <td>{row.NOMBRE2}</td>
              <td>{row.APELLIDO1}</td>
              <td>{row.APELLIDO2}</td>
              <td>{row.SEXO}</td>
              <td>{row.DIRECCION}</td>
              <td><button onClick={(e) => underSelect(row)}>Agregar Cita</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </>
)}

export default FomRoles