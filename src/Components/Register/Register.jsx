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
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    user: "",
    pass: "",
    Nombre: "",
    Apellido: "",
  });

  const [passwordValid, setPasswordValid] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [prueba, setPrueba] = React.useState({
    auth: false,
    message: "",
  });
  
  let icono ="fa-eye-slash";
  if (showPass) {
    icono ="fa-eye";
  } else {
    icono ="fa-eye-slash";
  }

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
    //valida que la contraseña tenga al menos una mayuscula y una minuscula ademas de un numero en ella para ser aceptada/
    const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passregex.test(user.pass)) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const validateEmail = () => {
    const correo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correo.test(user.user)) {
      setEmail(false);
    } else {
      setEmail(true);
    }
  };

  const saveData = (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://analisisapi.netlify.app/registrar", user) //peticion a la api para loguearse
        .then(({ data }) => {
          if (data.auth) {
            setPrueba({
              auth: data.auth,
              message: data.message
            });
            document.getElementById('Modal').style.display = "flex";
            // document.getElementById('Error').textContent = data.message;
            document.getElementById('Modal-Color').style.color = "#5b6f53";
            document.getElementById('Modal-Color').style.backgroundColor = "#def2d5";
            document.getElementById('iconoModal').style.display = "none";
            document.getElementById('iconoModal2').style.display = "flex";
          } else {
            setPrueba({
              auth: data.auth,
              message: data.message
            });
            document.getElementById('Modal').style.display = "flex";
            // document.getElementById('Error').textContent = data.message;
            document.getElementById('Modal-Color').style.color = "#95722d";
            document.getElementById('Modal-Color').style.backgroundColor = "#f8f3d6";
            document.getElementById('iconoModal').style.display = "flex";
            document.getElementById('iconoModal2').style.display = "none";
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const Validar = (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://analisisapi.netlify.app/confirmar", user) //peticion a la api para loguearse 
        .then(({ data }) => {
          if (data.auth) {
            alert(data.message);
            setTimeout(() => {
              navigate("/validarToken");
            }, 4000);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  function Desaparecer() {
    document.getElementById('Modal').style.display = "none";
  }

  return (
    <div className="Container" >

      <div id="Modal" className="Container-Modal">
        <div className="Container-Modal__Capa">
          <div id="Modal-Color" className={`Container-Modal__Modal ${prueba ? 'prueba_Valido' : 'prueba_Invalido'}`}>
            <FontAwesomeIcon id="iconoModal" className="Container-Modal__Icono" icon="fa-solid fa-triangle-exclamation" />
            <FontAwesomeIcon id="iconoModal2" className="Container-Modal__Icono" icon="fa-solid fa-circle-check" />
            <div className="Container-Modal__Error">
              <p id="Titulo" className="Titulo">{prueba ? 'USUARIO REGISTRADO 🙂' : 'ERROR 🙁'}</p>
              <p className="Error" id="Error">{prueba.message}</p>
            </div>
            <FontAwesomeIcon className="Container-Modal__Icono-Cerrar" onClick={Desaparecer} icon="fa-solid fa-xmark" />
          </div>
        </div>
      </div>

      <div className="Container_Form">
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
                    <FontAwesomeIcon icon={`${icono}`} />
                  </button>
                </div>
                <span>Contraseña</span>
              </div>
            </div>
          </div>
          <div className="Container_button_login">
            <button type="submit" onClick={saveData} className="container-button container-button-registrar">
              <div className="container-button__icono">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </div>
              <span className="container-button__span">Registrar</span>
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