import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FormCitas = () => {
  
  
  return (
    <>
     <div className='Container-Citas'>
      
     <div className='Container-Citas_item Titulo'>
          <h1>Area de Citas</h1>
    </div>

    <div className='Container-Citas__Grid'>

        
    <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <select className='Citas-Container-Input__Input' name="" id="">
              <option value="Beneficiario 0"></option>
                <option value="Beneficiario 1">Juan Roberto</option>
                <option value="Beneficiario 2">Carlos Mario</option>
                <option value="Beneficiario 3">Angel Fernandez</option>
               
              </select>
              <span className="Citas-Container-Input__Span">Beneficiario</span>
            </div>
          </div>

          <div className="Container-Citas__Grid-item">
            <div className="Citas-Container-Input">
              <select className='Citas-Container-Input__Input' name="" id="">
              <option value="Session 0"></option>
                <option value="Session 1">Sessión 08:00 A.M - 08:30 A.M</option>
                <option value="Session 2">Sessión 08:30 A.M - 09:00 A.M</option>
                <option value="Session 3">Sessión 09:00 A.M - 09:30 A.M</option>
                <option value="Session 4">Sessión 09:30 A.M - 10:00 A.M</option>
                <option value="Session 5">Sessión 10:00 A.M - 10:30 A.M</option>
                <option value="Session 6">Sessión 10:30 A.M - 11:00 A.M</option>
                <option value="Session 7">Sessión 11:00 A.M - 11:30 A.M</option>
                <option value="Session 8">Sessión 11:30 A.M - 12:00 A.M</option>
                <option value="Session 9">Sessión 12:00 A.M - 12:30 A.M</option>
                <option value="Session 10">Sessión 12:30 A.M - 13:00 A.M</option>
                <option value="Session 11">Sessión 13:00 A.M - 13:30 A.M</option>
                <option value="Session 12">Sessión 14:00 A.M - 14:30 A.M</option>
                <option value="Session 13">Sessión 15:00 A.M - 15:30 A.M</option>
                <option value="Session 14">Sessión 14:00 A.M - 14:30 A.M</option>
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

        <button className="Button Button--Buscar">
            <div className="Button__Icono">
            </div>
            <span className="Button__Span Iniciar" data-bs-toggle="modal">Guardar</span>
           
          </button>
    

     </div>
    </>
  )
}

export default FormCitas