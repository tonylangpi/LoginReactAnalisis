import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
const FormPerinatales = ({idBen}) => {
    const [isPerinatal, setPerinatal] = useState(false);

    const [Perinatal, setPerinatales] = React.useState({
        LLORO_INMEDIATAMENTE: "",
        COLORACION: "",
          INCUBADORA: "",
          COLOR: ""
        });

  const saveDataTemporalyPerinatal = (e) => {
    e.preventDefault();
    setPerinatales({
      ...Perinatal,
      [e.target.name]: e.target.value,
    });
  };

  const savePerinatal = (e) => {
    e.preventDefault();
    try {
        if(idBen != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createPeriNatales/${idBen}`, Perinatal)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial perinatal")
                : alert(mensaje)
                setPerinatal(true);
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
    <div
      id="FormPeriNatales"
      className="Container-Beneficiario Antecedentes-Peri-Natales"
    >
      <div className="Container-Beneficiario__item Titulo">
        <h1>Antecedentes Peri-Natales</h1>
      </div>

      <form onSubmit={savePerinatal} className="Container-Beneficiario__Grid">
        <div className="Container-Beneficiario__Grid">
          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿El niño lloro inmediatamente?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    disabled={isPerinatal}
                    onChange={saveDataTemporalyPerinatal}
                    value="SI"
                    className=""
                    type="radio"
                    name="LLORO_INMEDIATAMENTE"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    value="NO"
                    disabled={isPerinatal}
                    onChange={saveDataTemporalyPerinatal}
                    type="radio"
                    name="LLORO_INMEDIATAMENTE"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Su coloracion fue normal?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input required value="SI" disabled={isPerinatal} onChange={saveDataTemporalyPerinatal} className="" type="radio" name="COLORACION" />
                  SI
                </div>
                <div className="InputRadio">
                  <input required value="NO" disabled={isPerinatal} onChange={saveDataTemporalyPerinatal} className="" type="radio" name="COLORACION" />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Estuvo en incubadora?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input required value="SI" disabled={isPerinatal} onChange={saveDataTemporalyPerinatal} className="" type="radio" name="INCUBADORA" />
                  SI
                </div>
                <div className="InputRadio">
                  <input required value="NO" disabled={isPerinatal} onChange={saveDataTemporalyPerinatal} className="" type="radio" name="INCUBADORA" />
                  NO
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Container-Beneficiario__item TextArea">
          <div className="Beneficiario-Container-Input">
            <textarea
              required
              name="COLOR"
              onChange={saveDataTemporalyPerinatal} 
              disabled={isPerinatal}
              className="Beneficiario-Container-Input__Input"
              placeholder=" "
            ></textarea>
            <span className="Beneficiario-Container-Input__Span">
              ¿Nacio amarillo o morado?:
            </span>
          </div>
        </div>

        {!isPerinatal ? (
            <div className="Container-Beneficiario__Grid-button">
          <button id="Perinatales" className="Button Button--Guardar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-file-export" />
            </div>
            <span className="Button__Span Iniciar">Guardar</span>
          </button>
        </div>
            ) : null}


      </form>
    </div>
  );
};

export default FormPerinatales;
