import React from "react";
import Logo from "../../assets/images/logoUniversidad.png";
import "./Validar.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const validarToken = () => {
    
    const apiLogin =  (e) => {
        e.preventDefault();
      
      };

  return (
    <div className="Container">
      <div className="Container_Form3">
        <form className="Form3" onSubmit={(e) => apiToken(e)}>

          <div className="Container_Titulo">
            <h2 className="Title">Ingresa el TOKEN que fue enviado a tu correo registrado</h2>
          </div>

          <div className="Container_Email">
            <div className="Email-Content">
              <input
                placeholder=" "
                type="text"
                className="form-control"
                name="user"
              />
              <span>Token</span>
            </div>
          </div>

          <button type="submit" className="container-button container-button-registrar">
            <div className="container-button__icono">
              <FontAwesomeIcon icon="fa-solid fa-user-check" />
            </div>
            <span className="container-button__span">Registrar</span>
          </button>

          <div className="Container__text">
            <span className="text">¿No te a llegado el TOKEN? </span>
            <Link className="link_2register" to={"/"}>Reenviar Token</Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default validarToken;
