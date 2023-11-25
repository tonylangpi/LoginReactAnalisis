import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Home from "../Home/Home";
import styles from "./Login.module.scss";
import ImagenFondo from '../../assets/images/wave.svg';

function Login() {
  const navigate = useNavigate();
  const [showpass, setShowpass] = React.useState(false);
  const [usuario, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [modal, setModal] = React.useState({
    auth: false,
    message: "",
    show: false
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setUser({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const apiLogin = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/auth/login", usuario) //peticion a la api para loguearse
        .then(({ data }) => {
          if (data.auth) {
            localStorage.setItem("Auth", data.token);
            //aqui se redirige al usuario a la pagina home
            navigate(0);
          } else {
            setModal({
              auth: data.auth,
              message: data.message,
              show : true
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  let icono ="fa-eye-slash";
  if (showpass) {
    icono ="fa-eye";
  } else {
    icono ="fa-eye-slash";
  }

  const showPassword = () => {
    setShowpass(!showpass);
  };

  function Desaparecer() {
    setModal({show: false});
  }

  return (
    <div className={styles.Container}>
      
      <div className={modal.show ? styles.ModalShow : "Container-Modal"}>
        <div className="Container-Modal__Modal">
          <FontAwesomeIcon className="Container-Modal__Modal-Icono Modal-Item" icon="fa-solid fa-triangle-exclamation" />
          <div className="Container-Modal__Modal-Message Modal-Item">
            <p className="Titulo">ERROR 🙁</p>
            <p className="Message">{modal.message}</p>
          </div>
          <FontAwesomeIcon className="Container-Modal__Modal-Icono-Cerrar Modal-Item" onClick={Desaparecer} icon="fa-solid fa-xmark" />
        </div>
      </div>

      <div className={styles.Background}></div>

      <div className="Container-Form">
        <div className="Container-Form__Logo">
          <img src={Logo} alt="logo empresarial" />
        </div>
        <form className="Container-Form__Form" onSubmit={(e) => apiLogin(e)}>
          <div className="Container-Form__Form-item">
            <h2 className="Title">BIENVENIDO</h2>
          </div>
          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                autoComplete="off"
                placeholder=" "
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
                className="Container-Input__Input"
                name="email"
                onChange={saveDataTemporaly}
              />
              <span className="Container-Input__Span">Correo Electronico</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                autoComplete="off"
                type={showpass ? "text" : "password"}
                className="Container-Input__Input"
                name="password"
                placeholder=" "
                onChange={saveDataTemporaly}
              />
              <span className="Container-Input__Span">Contraseña</span>
              <button className="Container-Input__Button" onClick={showPassword} type="button">
                <FontAwesomeIcon icon={`${icono}`} />
              </button>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <button type="submit" className="Button">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
              </div>
              <span className="Button__Span Iniciar">Iniciar Sesion</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;