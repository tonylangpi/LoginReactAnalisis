import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logoUniversidad.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
function Login() {
   const [showpass, setShowpass] = React.useState(false);

  const showPassword = () => {
    setShowpass(!showpass);
  }
  return (
    <div className="container  w-75  bg-primary mt-5 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
        <div className="col bg-white p-5 rounded-end">
          <div className="text-end">
            <img src={Logo} width="48px" alt="logo empresarial" />
          </div>
          <h2 className="fw-bold text-center py-5">Bienvenido</h2>

          <form action="#">
            <div className="mb-4">
              <label for="email" className="form-label">
                Correo electronico
              </label>
              <input type="email" className="form-control" name="email" />
            </div>
            <label for="texto-ejemplo" class="input-group-addon">Contraseña</label>
            <div className="input-group mb-4">
            <input
                type={showpass ? "text":"password"}
                className="form-control"
                name="password"
              />
              <div className="input-group-btn">
                <button className="btn rounded-circle btn-warning " onClick={showPassword} type="button">
                <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar sesion
              </button>
            </div>

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
