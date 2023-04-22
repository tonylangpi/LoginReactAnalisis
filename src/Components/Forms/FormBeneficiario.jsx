import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormBeneficiario = () => {
  return (
      <>
      <div className='Container-Beneficiario'>

        <div className='Container-Beneficiario__Titulo'>
          <h1>Beneficiarios</h1>
      
        </div>
        
        <div className='Container-Beneficiario__Form'>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Nombre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Fecha de Nacimiento</span>
            </div>
          </div>


          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <select className='Container-Input__Input' name="" id="">
                <option value="Primaria">Primaria</option>
                <option value="Basico">Basico</option>
                <option value="Diversificado">Diversificado</option>
                <option value="Universidad">Universidad</option>
              </select>
              <span className="Container-Input__Span">Escolaridad</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Direccion</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Nombre de la Madre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Edad de la Madre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Ocupacion de la Madre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <select className='Container-Input__Input' placeholder='--Ninguno--' name="" id="">
                <option value="Primaria">Primaria</option>
                <option value="Basico">Basico</option>
                <option value="Diversificado">Diversificado</option>
                <option value="Universidad">Universidad</option>
              </select>
              <span className="Container-Input__Span">Escolaridad del Madre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Telefono de la Madre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Nombre del Padre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Edad del Padre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <select className='Container-Input__Input' placeholder= " ">
                <option value="" placeholder=' '></option>
                <option value="Primaria">Primaria</option>
                <option value="Basico">Basico</option>
                <option value="Diversificado">Diversificado</option>
                <option value="Universidad">Universidad</option>
              </select>
              <span className="Container-Input__Span">Escolaridad del Padre</span>
            </div>
          </div>


          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Ocupacion del Padre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Telefono del Padre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Cantidad de Hermanos</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input" />
              <span className="Container-Input__Span">Numero que Ocupa</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <textarea className='Container-Input__Input' placeholder=" "></textarea>
              <span className="Container-Input__Span">Motivo de la Consulta</span>
            </div>
          </div>

        </div>

        <div className='Container-Beneficiario__Button'>
          <button className="Button">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
            </div>
            <span className="Button__Span Iniciar">Guardar</span>
          </button>

          <button className="Button">
            <div className="Button__Icono">
            </div>
            <span className="Button__Span Iniciar">Eliminar</span>
          </button>

          <button className="Button">
            <div className="Button__Icono">
            </div>
            <span className="Button__Span Iniciar">Actualizar</span>
          </button>

          <button className="Button">
            <div className="Button__Icono">
            </div>
            <span className="Button__Span Iniciar">Buscar</span>
          </button>
        </div>

      </div>
    </>
  );
}

export default FormBeneficiario