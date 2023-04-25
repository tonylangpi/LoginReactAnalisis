import React from "react";
import Logo from "../../assets/images/logoUniversidad.png";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const validarToken = () => {
    
    const apiLogin =  (e) => {
        e.preventDefault();
      
      };

  return (
    <div className="Container">
      <div className="Container-Form">
        <form className="Container-Form__Form" onSubmit={(e) => apiToken(e)}>
          <div className="Container-Form__Form-item">
            <h3 className="titulo">Ingresa el TOKEN que fue enviado a tu correo registrado</h3>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input"
                name="user"
              />
              <span className="Container-Input__Span">Token</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <button type="submit" className="Button">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-user-check" />
              </div>
              <span className="Button__Span Iniciar">Registrar</span>
            </button>
          </div>

          <div className="Container-Form__Form-item">
            <span className="Message">¿No te a llegado el TOKEN? </span>
            <Link className="Link" to={"/"}>Reenviar Token</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default validarToken;
