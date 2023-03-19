import React from "react";
import Logo from "../../assets/images/logoUniversidad.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import "./register.css";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  let notify;
  let mensaje;
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    user: "",
    pass: "",
    Nombre: "",
    Apellido: "",
  });
  let tiempo; 
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  
  const motrarPass = () => {
    setShowPass(!showPass);
  };

  const validateName = () => {};
  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const validatePassword = () => {
    /valida que la contraseña tenga al menos una mayuscula y una minuscula ademas de un numero en ella para ser aceptada/
    setPasswordValid(
      user.pass.length >= 8 &&
        /[a-z]/.test(user.pass) &&
        /[A-Z]/.test(user.pass) &&
        /[0-9]/.test(user.pass) &&
        /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/`~]/.test(user.pass)
    );
   
  };


  const validateEmail = () => {
    const correo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(user.user.length >= 0 && correo.test(user.user));
  };

  const saveData = (e) => {
    e.preventDefault();
    if (!passwordValid && !email) {
      alert("no se puede crear por el usuario y la contraseña");
      return;
    } else {
      try {
        axios
          .post("https://analisisapi.netlify.app/registrar", user) //peticion a la api para loguearse
          .then(({ data }) => {
            if (data.auth) {
              alert(data.message);
              setTimeout(() => {
                navigate("/");
              }, 4000);
            } else {
              alert(data.message);
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="Container" >

      <div className="Container_Form2">
        <form className="Form2" onSubmit={(e) => saveData(e)}>
        <div className="Logo2">
          <img src={Logo} alt="logo empresarial" />
        </div>
      
          <div className="Container_Email">
            <div className="Email-Content">
              <input
                placeholder=" "
                type="text"
                className="form-control"
                name="Nombre"
                onChange={saveDataTemporaly}
              />
              <span>Nombre</span>
            </div>
          </div>

          <div className="Container_Email">
            <div className="Email-Content">
              <input
                placeholder=" "
                type="text2"
                className="form-control"
                name="Apellido"
                onChange={saveDataTemporaly}
              />
              <span>Apellido</span>
            </div>
          </div>

          <div className="Container_Email">
            <div className="Email-Content">

              <input
                placeholder=" "
                type="email"
                required="required"
                className="form-control"
                name="user"
                onChange={saveDataTemporaly}
                onBlur={validateEmail}
              />
              {email ? <p className="text-danger">Correo Válido</p> : <p className="text-danger">Correo invalido</p>}
              <span>Correo </span>
            </div>
          </div>

          <div className="Container_password">
            <div className="Container_Email">
              <div className="Email-Content">

                <input
                  placeholder=" "
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  required="required"
                  name="pass"
                  onChange={saveDataTemporaly}
                  onBlur={validatePassword}
                />
                <div className="Container_button">
                  <button className="button_showPassword" onClick={motrarPass} type="button">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                {passwordValid ? <p className="text-danger">Contraseña válida</p> : <p  className="text-danger">Contraseña invalida</p>}
                

                <span>Contraseña</span>
              </div>
            </div>
          </div>
          <div className="Container_button_login">
            <button type="submit" onClick={saveData} className="container-button container-button-registrar">
              <div class="container-button__icono">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </div>
              <span class="container-button__span">Registrar</span>
            </button>
          </div>

          <div className="Container__text">
            <span className="text">¿Ya tienes una cuenta? </span>
            <Link className="link_2register" to={"/"}>Inicia Sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
