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
  const [showpass, setShowpass] = React.useState(true);
  const [usuario, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [prueba, setPrueba] = React.useState({
    auth: false,
    message: "",
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
        .post("https://analisisapi.netlify.app/login", usuario) //peticion a la api para loguearse
        .then(({ data }) => {
          if (data.auth) {
            const token = data.token;
            localStorage.setItem("Auth", token);
            //aqui se redirige al usuario a la pagina home
            navigate(0);
          } else {
            setPrueba({
              auth: data.auth,
              message: data.message
            });
            document.getElementById('Modal').style.display = "flex";
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  // Cambio de icono en el evento clic
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
    document.getElementById('Modal').style.display = "none";
  }

  return (
    <div className={styles.Container}>
      
      <div id="Modal" className="Container-Modal">
        <div className="Container-Modal__Modal">
          <FontAwesomeIcon className="Container-Modal__Modal-Icono Modal-Item" icon="fa-solid fa-triangle-exclamation" />
          <div className="Container-Modal__Modal-Message Modal-Item">
            <p className="Titulo">ERROR 🙁</p>
            <p className="Message">{prueba.message}</p>
          </div>
          <FontAwesomeIcon className="Container-Modal__Modal-Icono-Cerrar Modal-Item" onClick={Desaparecer} icon="fa-solid fa-xmark" />
        </div>
      </div>

      <div className={styles.Background}>
      </div>

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
                placeholder=" "
                type="email"
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

          <div className="Container-Form__Form-item">
            <span className="Message">¿No tienes una cuenta? </span>
            <Link className="Link" to={"/registrar"}>Registrate</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;