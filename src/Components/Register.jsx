import React from "react";
import Logo from "../../images/logoUniversidad.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import "../register.css";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const notify = () => toast("Usuario creado!");
  const navigate = useNavigate(); 
  const [user, setUser] = React.useState({
    user: "",
    pass: "",
    Nombre: "",
    Apellido: "",
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
      user.pass.length >= 8 &&
        /[a-z]/.test(user.pass) &&
        /[A-Z]/.test(user.pass) &&
        /[0-9]/.test(user.pass) &&
        /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/`~]/.test(user.pass)
    );
  };

  const saveData =  (e) => {
    debugger; 
    e.preventDefault(); 
    
    if (!passwordValid) {
      alert(
        "la contraseña debe tener al menos 8 caractere incluyendo letras mayusculas y al menos un numero"
      );
      return;
    } else {
      try {
         axios
        .post("https://analisisapi.netlify.app/registrar", user) //peticion a la api para loguearse
        .then(({data}) => {
          setTimeout(() => {
            navigate('/');
          }, 5000);
        })
        .catch((error) => console.log(error));

      } catch (error) {
        console.log(error)
      }
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

          <form onSubmit={(e) => saveData(e)}>
            <div className="mb-4">
              <label for="text" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="Nombre"
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
                name="Apellido"
                onChange={saveDataTemporaly}
              />
            </div>
            <div className="mb-4">
              <label for="email" className="form-label">
                Correo electronico
              </label>
              <input
                type="email"
                required ="required"
                className="form-control"
                name="user"
                onChange={saveDataTemporaly}
              />
            </div>
            <label for="texto-ejemplo" className="input-group-addon">Contraseña</label>
            <div className="input-group">
              <input
                type={showPass ? "text":"password"}
                className="form-control"
                name="pass"
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
                onClick={notify}
                className="btn btn-danger"
              >
                Registrar
              </button>
            </div>
            <ToastContainer/>
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
