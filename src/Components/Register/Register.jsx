import React from "react";
import Logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    user: "",
    pass: "",
    name: "",
    lastName: "",
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
        .post("https://analisisapi.netlify.app/register", user) //peticion a la api para loguearse
        .then(({ data }) => {
          if (data.auth) {
            setPrueba({
              auth: data.auth,
              message: data.message
            });
            document.getElementById('Modal').style.display = "flex";
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

  function Desaparecer() {
    document.getElementById('Modal').style.display = "none";
  }

  return (
    <div className="Container" >

        <div id="Modal" className="Container-Modal">
          <div className={`Container-Modal__Modal ${prueba.auth ? 'Valido' : 'Invalido'}`}>
            <FontAwesomeIcon className="Container-Modal__Modal-Icono Modal-Item" icon={`fa-solid ${prueba.auth ? 'fa-circle-check' : 'fa-triangle-exclamation'} `} />
            <div className="Container-Modal__Modal-Message Modal-Item">
              <p id="Titulo" className="Titulo">{prueba.auth ? 'USUARIO REGISTRADO 🙂' : 'ERROR 🙁'}</p>
              <p className="Message">{prueba.message}</p>
            </div>
            <FontAwesomeIcon className="Container-Modal__Modal-Icono-Cerrar Modal-Item" onClick={Desaparecer} icon="fa-solid fa-xmark" />
          </div>
        </div>

      <div className="Container_Form Container-Form">
        
        <div className="Container-Form__Logo">
          <img src={Logo} alt="logo empresarial" />
        </div>

        <form className="Container-Form__Form" onSubmit={(e) => saveData(e)}>
          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text"
                className="Container-Input__Input"
                name="Nombre"
                onChange={saveDataTemporaly}
              />
              <span className="Container-Input__Span">Nombre</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="text2"
                className="Container-Input__Input"
                name="Apellido"
                onChange={saveDataTemporaly}
              />
              <span className="Container-Input__Span" >Apellido</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type="email"
                required="required"
                className="Container-Input__Input"
                name="user"
                onChange={saveDataTemporaly}
                onBlur={validateEmail}
              />
              <span className="Container-Input__Span" >Correo Electronico</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <div className="Container-Input">
              <input
                placeholder=" "
                type={showPass ? "text" : "password"}
                className="Container-Input__Input"
                required="required"
                name="pass"
                onChange={saveDataTemporaly}
                onBlur={validatePassword}
              />
              <button className="Container-Input__Button" onClick={motrarPass} type="button">
                <FontAwesomeIcon icon={`${icono}`} />
              </button>
              <span className="Container-Input__Span">Contraseña</span>
            </div>
          </div>

          <div className="Container-Form__Form-item">
            <button type="submit" onClick={saveData} className="Button">
              <div className="Button__Icono">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              </div>
              <span className="Button__Span">Registrar</span>
            </button>
          </div>

          <div className="Container-Form__Form-item">
            <span className="Message">¿Ya tienes una cuenta? </span>
            <Link className="Link" to={"/"}>Inicia Sesión</Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;