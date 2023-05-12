import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const formHistorialClinico = ({ idBenefi = 0 }) => {
  const [isHisto, setHisto] = useState(false);

  const [Historial, setHistorial] = React.useState({
    ENFERMEDAD_PADECE: "",
    MEDICAMENTOS_INGIERE: "",
    VACUNAS: "",
    AUDICION: "",
    ORFTAMOLOGICAS: "",
    APARATO_AUDITIVO: "",
    LENTES: "",
    CIRUJIAS: "",
    OTRAS: "",
  });

  const saveDataTemporalyHistorial = (e) => {
    e.preventDefault();
    setHistorial({
      ...Historial,
      [e.target.name]: e.target.value,
    });
  };

  const saveHistorial = (e) => {
    e.preventDefault();
    try {
        if(idBenefi != null){
            axios
            .post(`http://localhost:4000/beneficiarios/createHistorialClinico/${idBenefi}`, Historial)
            .then(function (response) {
              const mensaje =
                response?.data?.message;
              !mensaje
                ? alert("sucedio un error al registrar el historial clinico")
                : alert(mensaje)
                setHisto(true);
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
    <>

      <div id="FormHistorialClinico" className="Container-Beneficiario Historial-Clinico">
        
        <div className="Container-Beneficiario__item Titulo">
          <h1>Historial Clinico</h1>
        </div>

        <form onSubmit={saveHistorial} className="Container-Beneficiario">
          <div className="Container-Beneficiario__item TextArea">
            {/* <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Input">
              <input
                required
                hidden={true}
                value={idBenefi? idBenefi : undefined}
                name="ID_BENEFICIARIO"
                onChange={saveDataTemporalyHistorial}
                placeholder=" "
                type="text"
                className="Beneficiario-Container-Input__Input"
              />
            </div>
          </div> */}

            <div className="Beneficiario-Container-Input">
              <textarea
                required
                name="ENFERMEDAD_PADECE"
                onChange={saveDataTemporalyHistorial}
                disabled={isHisto}
                className="Beneficiario-Container-Input__Input"
                placeholder=" "
              ></textarea>
              <span className="Beneficiario-Container-Input__Span">
                Enfermedades que padece:
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea
                required
                name="MEDICAMENTOS_INGIERE"
                disabled={isHisto}
                onChange={saveDataTemporalyHistorial}
                className="Beneficiario-Container-Input__Input"
                placeholder=" "
              ></textarea>
              <span className="Beneficiario-Container-Input__Span">
                Medicamentos que ingiere:
              </span>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid">
            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Esquema Completo de Vacunas?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="VACUNAS"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="VACUNAS"
                      onChange={saveDataTemporalyHistorial}
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Examenes Auditivos?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="AUDICION"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="AUDICION"
                      onChange={saveDataTemporalyHistorial}
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Pruebas Oftamologicas?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="ORFTAMOLOGICAS"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="ORFTAMOLOGICAS"
                      onChange={saveDataTemporalyHistorial}
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Usa Aparatos Auditivos?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="APARATO_AUDITIVO"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="APARATO_AUDITIVO"
                      onChange={saveDataTemporalyHistorial}
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿lentes?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="LENTES"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="LENTES"
                      onChange={saveDataTemporalyHistorial}
                    />
                    NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Ha tenido Cirugias?</label>
                <div className="Beneficiario-Container-Radio__Radio">
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="SI"
                      type="radio"
                      name="CIRUJIAS"
                      onChange={saveDataTemporalyHistorial}
                    />
                    SI
                  </div>
                  <div className="InputRadio">
                    <input
                      required
                      className=""
                      disabled={isHisto}
                      value="NO"
                      type="radio"
                      name="CIRUJIAS"
                      onChange={saveDataTemporalyHistorial}
                    />
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
                name="OTRAS"
                disabled={isHisto}
                onChange={saveDataTemporalyHistorial}
                className="Beneficiario-Container-Input__Input"
                placeholder=" "
              ></textarea>
              <span className="Beneficiario-Container-Input__Span">
                Otros:
              </span>
            </div>
          </div>
          {!isHisto ? (
            <div className="Container-Beneficiario__Grid-button">
              <button id="button-Historial" className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default formHistorialClinico;
