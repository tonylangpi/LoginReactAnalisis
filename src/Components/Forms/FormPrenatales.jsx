import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const FormPrenatales = ({idBen}) => {

    const [isPrenatal, setPrenatal] = useState(false);

    const [Prenatales, setPrenatales] = React.useState({
          EMBARAZO_TERMINO: "",
          EXPLIQUE_EMBARAZO: "",
          PARTO_NORMAL: "",
          EXPLIQUE_PARTO: "",
          COMPLICACIONES: "",
          EXPLIQUE_COMPLICACION: "",
        });

  const saveDataTemporalyPrenatal = (e) => {
    e.preventDefault();
    setPrenatales({
      ...Prenatales,
      [e.target.name]: e.target.value,
    });
  };

  const savePrenatal = (e) => {
    e.preventDefault();
    try {
        if(idBen != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createPrenatales/${idBen}`, Prenatales)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial prenatal")
                : alert(mensaje)
                setPrenatal(true);
            })
            .catch(function (response) {
              alert("No se ha encontrado un registro");
              console.log(response);
            });
        }else{
            alert("No se encontro el id del beneficiario");
        }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="FormPrenatales" className='Container-Beneficiario Antecedentes-Pre-Natales'>

      <div className='Container-Beneficiario__item Titulo'>
        <h1>Antecedentes Pre-Natales</h1>
      </div>
      <form onSubmit={savePrenatal} className="Container-Beneficiario">

        <div className="Container-Beneficiario__item RadioButton">
          <div className="Beneficiario-Container-Radio">
            <label htmlFor="">¿Fue un embarazo de termino?</label>
            <div className='Beneficiario-Container-Radio__Radio'>
              <div className='InputRadio'>
                <input required value="SI" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="EMBARAZO_TERMINO" />SI
              </div>
              <div className='InputRadio'>
                <input required value="NO" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="EMBARAZO_TERMINO" />NO
              </div>
            </div>
          </div>
        </div>

        <div className="Container-Beneficiario__item TextArea">
          <div className="Beneficiario-Container-Input">
            <textarea required disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} name='EXPLIQUE_EMBARAZO' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
            <span className="Beneficiario-Container-Input__Span">Explique:</span>
          </div>
        </div>

        <div className="Container-Beneficiario__item RadioButton">
          <div className="Beneficiario-Container-Radio">
            <label htmlFor="">¿Fue un embarazo normal?</label>
            <div className='Beneficiario-Container-Radio__Radio'>
              <div className='InputRadio'>
                <input required value="SI" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="PARTO_NORMAL" />SI
              </div>
              <div className='InputRadio'>
                <input required value="NO" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="PARTO_NORMAL" />NO
              </div>
            </div>
          </div>
        </div>

        <div className="Container-Beneficiario__item TextArea">
          <div className="Beneficiario-Container-Input">
            <textarea required disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} name='EXPLIQUE_PARTO' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
            <span className="Beneficiario-Container-Input__Span">Explique:</span>
          </div>
        </div>

        <div className="Container-Beneficiario__item RadioButton">
          <div className="Beneficiario-Container-Radio">
            <label htmlFor="">¿Tuvo complicaciones durante el embarazo?</label>
            <div className='Beneficiario-Container-Radio__Radio'>
              <div className='InputRadio'>
                <input required value="SI" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="COMPLICACIONES" />SI
              </div>
              <div className='InputRadio'>
                <input required value="NO" disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} className="" type="radio" name="COMPLICACIONES" />NO
              </div>
            </div>
          </div>
        </div>

        <div className="Container-Beneficiario__item TextArea">
          <div className="Beneficiario-Container-Input">
            <textarea required disabled={isPrenatal} onChange={saveDataTemporalyPrenatal} name='EXPLIQUE_COMPLICACION' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
            <span className="Beneficiario-Container-Input__Span">Explique:</span>
          </div>
        </div>

        {!isPrenatal ? (
          <div className='Container-Beneficiario__Grid-button'>
            <button id="Prenatales" className="Button Button--Guardar">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-file-export" />
              </div>
              <span className="Button__Span Iniciar">Guardar</span>
            </button>
          </div>
        ) : null}

      </form>
    </div>
  )
}

export default FormPrenatales