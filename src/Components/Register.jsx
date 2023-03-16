import React from "react";
import Logo from "../../images/logoUniversidad.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import "../register.css";
const Register = () => {
  const [user, setUser] = React.useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const motrarPass = () => {
    setShowPass(!showPass);
  }
  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const validatePassword = () => {
    /*valida que la contraseña tenga al menos una mayuscula y una minuscula ademas de un numero en ella para ser aceptada*/
    setPasswordValid(
      user.password.length >= 8 &&
        /[a-z]/.test(user.password) &&
        /[A-Z]/.test(user.password) &&
        /[0-9]/.test(user.password) &&
        /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/`~]/.test(user.password)
    );
  };

  const saveData = () => {
    if (!passwordValid) {
      alert(
        "la contraseña debe tener al menos 8 caractere incluyendo letras mayusculas y al menos un numero"
      );
      return;
    } else {
      alert(user.email + " ha sido guardado");
    }
  };
  return (
    <div className="container  w-75  bg-primary mt-5 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
        <div className="col bg-white p-5 rounded-end">
          <div className="text-end">
            <img src={Logo} width="48px" alt="logo empresarial" />
          </div>
          <h2 className="fw-bold text-center py-5">Registrate</h2>

          <form onSubmit={saveData}>
            <div className="mb-4">
              <label for="text" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={saveDataTemporaly}
              />
            </div>
            <div className="mb-4">
              <label for="text2" className="form-label">
                Apellido
              </label>
              <input
                type="text2"
                className="form-control"
                name="lastname"
                onChange={saveDataTemporaly}
              />
            </div>
            <div className="mb-4">
              <label for="email" className="form-label">
                Correo electronico
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={saveDataTemporaly}
              />
            </div>
            <label for="texto-ejemplo" class="input-group-addon">Contraseña</label>
            <div className="input-group">
              <input
                type={showPass ? "text":"password"}
                className="form-control"
                name="password"
                onChange={saveDataTemporaly}
                onBlur={validatePassword}
              />
               {passwordValid ? <p className="text-danger">Contraseña válida</p> : <p className="text-danger">La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula y una letra minúscula y al menos un numero</p>}
              <div className="input-group-btn">
                <button className="btn rounded-circle btn-warning " onClick={motrarPass} type="button">
                <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                onClick={saveData}
                className="btn btn-danger"
              >
                Registrar
              </button>
            </div>
            <div className="my-3">
              <span className="pe-3">ya tienes cuenta</span>
              <Link to={"/"}>Inicia Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
