import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const FormPostNatal = ({ idBen }) => {
  const [isPostnatal, setPostnatal] = useState(false);

  const [Postnatal, setPostnatales] = React.useState({
    TRATAMIENTO: "",
    INFECCIONES: "",
    FIEBRE: "",
    CONVULCIONES: "",
    LENGUAJE: "",
    CAMINA: "",
    OBSERVACIONES: "",
  });

  const saveDataTemporalyPostnatal = (e) => {
    e.preventDefault();
    setPostnatales({
      ...Postnatal,
      [e.target.name]: e.target.value,
    });
  };

  const savePostnatal = (e) => {
    e.preventDefault();
    try {
      if (idBen != null) {
        axios
          .post(
            `http://localhost:4000/beneficiarios/createPostNatales/${idBen}`,
            Postnatal
          )
          .then(function (response) {
            const mensaje = response?.data?.message;
            !mensaje
              ? alert("sucedio un error al registrar el historial perinatal")
              : alert(mensaje);
            setPostnatal(true);
          })
          .catch(function (response) {
            alert("No se ha encontrado un registro");
            console.log(response);
          });
      } else {
        alert("No se encontro el id del beneficiario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="FormPostNatales"
      className="Container-Beneficiario Antecedentes-Post-Natales"
    >
      <div className="Container-Beneficiario__item Titulo">
        <h1>Antecedentes Post-Natales</h1>
      </div>

      <form onSubmit={savePostnatal} className="Container-Beneficiario__Grid">
        <div className="Container-Beneficiario__Grid">
          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo tratamiento despues del parto?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    disabled={isPostnatal}
                    value="SI"
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="TRATAMIENTO"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    value="NO"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    type="radio"
                    name="TRATAMIENTO"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo infecciones?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    value="SI"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    type="radio"
                    name="INFECCIONES"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    disabled={isPostnatal}
                    value="NO"
                    onChange={saveDataTemporalyPostnatal}
                    type="radio"
                    name="INFECCIONES"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo Fiebre?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    value="SI"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="FIEBRE"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    value="NO"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="FIEBRE"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo convulciones?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    disabled={isPostnatal}
                    value="SI"
                    onChange={saveDataTemporalyPostnatal}
                    type="radio"
                    name="CONVULCIONES"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    className=""
                    disabled={isPostnatal}
                    value="NO"
                    onChange={saveDataTemporalyPostnatal}
                    type="radio"
                    name="CONVULCIONES"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tiene lenguaje?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    value="SI"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="LENGUAJE"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    value="NO"
                    disabled={isPostnatal}
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="LENGUAJE"
                  />
                  NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__Grid-item">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Camina?</label>
              <div className="Beneficiario-Container-Radio__Radio">
                <div className="InputRadio">
                  <input
                    required
                    value="SI"
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="CAMINA"
                  />
                  SI
                </div>
                <div className="InputRadio">
                  <input
                    required
                    value="NO"
                    onChange={saveDataTemporalyPostnatal}
                    className=""
                    type="radio"
                    name="CAMINA"
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
              name="OBSERVACIONES"
              onChange={saveDataTemporalyPostnatal}
              className="Beneficiario-Container-Input__Input"
              placeholder=" "
            ></textarea>
            <span className="Beneficiario-Container-Input__Span">
              Observaciones
            </span>
          </div>
        </div>
        {!isPostnatal ? (
          <div className="Container-Beneficiario__Grid-button">
            <button id="Postnatales" className="Button Button--Guardar">
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

export default FormPostNatal;
