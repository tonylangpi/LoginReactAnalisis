import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FormCitas = () => {
  
const Ocultar = ()=>{
  const tabla = document.getElementById('Tabla');
  tabla.style.display = 'none';
}

const MostarTabla = ()=>{
  const tabla = document.getElementById('Tabla');
  tabla.style.display = 'flex';
}
  
  return (
    <>
      <div className='Container-Citas'>
     
        <div id='Tabla' className='Container-Citas__Tabla'>

          <div className='Container-Citas_item Titulo'>
            <h1>Area de Citas</h1>
          </div>
          
          <table class="default">
            <tr>
              <th>ID Beneficiario</th>
              <th>ID Sesion</th>
              <th>Nombre Beneficiario</th>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Acciones</th>
            </tr>
            <tr>
              <td>Mario Cortez</td>
              <td>03/05/2023</td>
              <td>Sesion 1</td>
              <td>Normal</td>
              <td>Taba mal</td>
              <td>
                <button>Eliminar</button>
                <button>Listo</button>
              </td>
            </tr>     
          </table>

          <div className='Container-Citas__Grid-button'>
            <button onClick={Ocultar} className="Button Button--Guardar">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-file-export" />
              </div>
              <span className="Button__Span Iniciar">Agregar Nueva Cita</span>
            </button>
          </div>

        </div>

        <div className='Container-Citas_item Titulo'>
          <h1>Agregar Nueva Cita</h1>
        </div>

        <div className='Container-Citas__Grid'>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <input
                disabled
                placeholder=" "
                type="text"
                className="Citas-Container-Input__Input" />
              <span className="Citas-Container-Input__Span">Nombre Beneficia</span>
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




          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <input type="date"
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
                  <input class="" type="radio" name="Normal" />Normal
                </div>
                <div className='InputRadio'>
                  <input class="" type="radio" name="Normal" />Incial
                </div>
              </div>
            </div>
          </div>


          <div className="Container-Citas__item TextArea">
            <div className="Citas-Container-Input">
              <textarea className='Citas-Container-Input__Input' placeholder=" "></textarea>
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



        </div>

        <button onClick={MostarTabla} className="Button Button--Buscar">
          <div className="Button__Icono">
          </div>
          <span className="Button__Span Iniciar" data-bs-toggle="modal">Agendar Cita</span>

        </button>


      </div>
    </>
  )
}

export default FormCitas