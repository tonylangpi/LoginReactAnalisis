import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logoUniversidad.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Home from "../Home/Home";
import "../../App.css";
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
    <div className="container  w-75  bg-primary mt-5 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
        <div className="col bg-white p-5 rounded-end">
          <div className="text-end">
            <img src={Logo} width="48px" alt="logo empresarial" />
          </div>
          <h2 className="fw-bold text-center py-5">Bienvenido</h2>

          <form onSubmit={(e) => apiLogin(e)}>
            <div className="mb-4">
              <label for="email" className="form-label">
                Correo electronico
              </label>
              <input
                type="email"
                className="form-control"
                name="user"
                onChange={saveDataTemporaly}
              />
            </div>
            <label for="texto-ejemplo" className="input-group-addon">
              Contraseña
            </label>
            <div className="input-group mb-4">
              <input
                type={showpass ? "text" : "password"}
                className="form-control"
                name="pass"
                onChange={saveDataTemporaly}
              />
              <div className="input-group-btn">
                <button
                  className="btn rounded-circle btn-warning "
                  onClick={showPassword}
                  type="button"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                onClick={notify}
                className="btn btn-primary"
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
              <span className="pe-3">No tienes cuenta</span>
              <Link to={"/registrar"}>Registrarse</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;