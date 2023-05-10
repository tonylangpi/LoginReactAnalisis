import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormReporteBeneficiario = () => {
  return (
    <>


      <div className="Container-Beneficiario">
        <div className='Container-Beneficiario_item Titulo'>
          <h1>Reporte Beneficiario</h1>
        </div>

        <div className='Container-Citas__Grid'>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Citas-Container-Input__Input" />
              <span className="Citas-Container-Input__Span">Nombre Beneficiario</span>
            </div>
          </div>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <select className='Citas-Container-Input__Input' name="" id="">
                <option value="0"></option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>

              </select>
              <span className="Citas-Container-Input__Span">Genero</span>
            </div>
          </div>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <input
                placeholder=" "
                type="number"
                className="Citas-Container-Input__Input" />
              <span className="Citas-Container-Input__Span">Año de Nacimiento</span>
            </div>
          </div>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Citas-Container-Input__Input" />
              <span className="Citas-Container-Input__Span">Area</span>
            </div>
          </div>


          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input

                placeholder=" "
                type="date"
                className="Beneficiario-Container-Input__Input"
              />
              <span className="Beneficiario-Container-Input__Span">
                Fecha
              </span>
            </div>
          </div>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <select className='Citas-Container-Input__Input' name="" id="">
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

        </div>

        <button className="Button Button--Buscar">
          <div className="Button__Icono">
          </div>
          <span className="Button__Span Iniciar" >Agregar</span>

        </button>

      </div>

      <div className="Container-Beneficiario">
         
      <div id='Tabla2' className='Container-Citas__Tabla'>

        <div className='Container-Citas_item Titulo'>
          <h1>Listado</h1>
        </div>

        <div className="searchBeneficiary" >
            <input className="inputBeneficiary"  placeholder="Ingrese el Beneficiario " type="text" />
          </div>

        <table class="default">
          <tr>
            <th>Nombre Beneficiario</th>
            <th>Genero</th>
            <th>Edad</th>
            <th>Area</th>
            <th>Fecha</th>
            <th>Session</th>
            <th>Acciones</th>
          </tr>
          <tr>
            <td>Mario Cortez</td>
            <td>Masculino</td>
            <td>21</td>
            <td>Manicomio</td>
            <td>21/07/2001</td>
            <td>Session 1</td>
            <td>
              <button>Eliminar</button>
              <button>Listo</button>
            </td>
          </tr>
        </table>

      </div>
      <button className="Button Button--Buscar">
          <div className="Button__Icono">
          </div>
          <span className="Button__Span Iniciar" >Agregar</span>

        </button>
      </div>

    </>
  )
}

export default FormReporteBeneficiario