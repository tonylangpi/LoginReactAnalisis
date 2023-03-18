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
  const notify = () =>
    toast("🦄 login correcto, bienvenido", {
      position: "top-center",
      autoClose: 9000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
            alert("no se pudo iniciar sesion");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    setShowpass(!showpass);
  };
  return (
    <div className="Container">
      


      <div className="Container_Form">
        <div className="Logo">
          <img src={Logo} width="48px" alt="logo empresarial" />
        </div>
          <div className="Container_Titulo">
          <h2 className="Title">INGRESAR</h2>
          </div>
        

        <form onSubmit={(e) => apiLogin(e)}>
          <div className="Container_Email">
            <div className="Email-Content">
              <input
                placeholder=" "
                required= "required"
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
                </div>

              </div>


              <div className="container_button">
                <button
                  className="button_showPassword"
                  onClick={showPassword}
                  type="button"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
          </div>



          <div className="Container_button_login">
            <button
              type="submit"
              onClick={notify}
              className="button_login"
            >
              Iniciar sesion
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
            <span className="text">No tienes cuenta </span>
            <Link className="link_register" to={"/registrar"}>Registrarse</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
