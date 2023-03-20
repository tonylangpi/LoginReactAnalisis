import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logoUniversidad.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Home from "../Home/Home";
import "../../App.css";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [showpass, setShowpass] = React.useState(false);
  const [usuario, setUser] = React.useState({
    user: "",
    pass: "",
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
            document.getElementById('Modal').style.display = "flex";
            document.getElementById('Error').textContent = data.message;
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
    <div className="Container">
      
      <div id="Modal" className="Container-Modal">
        <div className="Container-Modal__Capa">
          <div className="Container-Modal__Modal">
            <FontAwesomeIcon className="Container-Modal__Icono" icon="fa-solid fa-triangle-exclamation" />
            <div className="Container-Modal__Error">
              <p className="Titulo">ERROR ☹</p>
              <p className="Error" id="Error"></p>
            </div>
            <FontAwesomeIcon className="Container-Modal__Icono-Cerrar" onClick={Desaparecer} icon="fa-solid fa-xmark" />
          </div>
        </div>
      </div>

      <div className="Container_Form">
        <div className="Logo">
          <img src={Logo} alt="logo empresarial" />
        </div>

        <form className="Form" onSubmit={(e) => apiLogin(e)}>
          <div className="Container_Titulo">
            <h2 className="Title">BIENVENIDO</h2>
          </div>
          <div className="Container_Email">
            <div className="Email-Content">
              <input
                placeholder=" "
                type="email"
                className="form-control"
                name="user"
                onChange={saveDataTemporaly}
              />
              <span>Correo Electronico</span>
            </div>
          </div>

          <div className="Container_password">
            <div className="Container_Email">
              <div className="Email-Content">
                <input
                  type={showpass ? "text" : "password"}
                  className="form-control"
                  name="pass"
                  placeholder=" "
                  onChange={saveDataTemporaly}
                />
                <span>Contraseña</span>
                <button className="button_showPassword" onClick={showPassword} type="button">
                  <FontAwesomeIcon icon={`${icono}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="Container_button_login">
            <button type="submit" className="container-button container-button-registrar">
              <div class="container-button__icono">
                <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
              </div>
              <span class="container-button__span-iniciar">Iniciar Sesion</span>
            </button>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={9000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div className="my-3">
            <span className="text">¿No tienes una cuenta? </span>
            <Link className="link_register" to={"/registrar"}>Registrarse</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
