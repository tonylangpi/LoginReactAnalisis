import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddUsers.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormAgregarUsuario() {

  const [roles, setRoles] = useState([]);
  const [showMyModal, setshowMyModal] = useState(false);
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuarios] = React.useState({
    email: '',
    nombre: '',
    id_roles: 0,
    id_empresa: 0,
    id_area: 0
  });
  const [prueba, setPrueba] = React.useState({
    auth: false,
    message: "",
    show: false
  });

  const handleOnClose = () => setshowMyModal(false)

  const Listar = () => {
    axios.get(`http://localhost:4000/roles/`)
      .then(function (response) {
        setRoles(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

    axios.post(`http://localhost:4000/servicios/`, {NOMBRE: ''})
      .then(function (response) {
        setAreas(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });
  };

  const fileSubmit = (e)=>{
    e.preventDefault();
    axios.post(`https://amordownapi-production.up.railway.app/usuarios/create`, usuario)
      .then(function (response) {
        if (!response.data.auth) {
          setPrueba({
            auth: response.data.auth,
            message: response.data.message,
            show: true
          });
        } else {
          setPrueba({
            auth: response.data.auth,
            message: response.data.message,
            show: true
          });
        }
        console.log(response)
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const Desaparecer = ()=>{
    setPrueba({show: false});
  }

  const handleChange = (e) => {
    setUsuarios({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <div className={styles.Container}>

      <div id="Modal" className={prueba.show ? styles.ModalShow : "Container-Modal"}>
        <div className={`Container-Modal__Modal ${prueba.auth ? 'Valido' : 'Invalido'}`}>
          <FontAwesomeIcon className="Container-Modal__Modal-Icono Modal-Item" icon={`fa-solid ${prueba.auth ? 'fa-circle-check' : 'fa-triangle-exclamation'} `} />
          <div className="Container-Modal__Modal-Message Modal-Item">
            <p id="Titulo" className="Titulo">{prueba.auth ? 'USUARIO REGISTRADO 🙂' : 'ERROR 🙁'}</p>
            <p className="Message">{prueba.message}</p>
          </div>
          <FontAwesomeIcon className="Container-Modal__Modal-Icono-Cerrar Modal-Item" onClick={Desaparecer} icon="fa-solid fa-xmark" />
        </div>
      </div>

      <div className={styles.Titulo}>
        <h1>Agregar Nuevo Usuario</h1>
      </div>

      <form onSubmit={fileSubmit} className={styles.Grid}>
        
        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <input
              name="email"
              placeholder=" "
              type="email"
              required="required"
              onChange={handleChange}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Correo Electronico
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <input
              name="nombre"
              placeholder=" "
              type="text"
              required="required"
              onChange={handleChange}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Nombre de Usuario
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="id_area"
              onChange={handleChange}>
              <option value=""></option>
              {areas.map((row, index)=>(
                <option key={index} value={row.ID_AREA}>{row.NOMBRE}</option>
              ))}
            </select>
            <span className={styles.ContainerInput__Span}>
              Area del Usuario
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="id_empresa"
              onChange={handleChange}>
              <option value=""></option>
              <option value="1">Coatepeque</option>
              <option value="2">Pajapita</option>
              <option value="3">Ayutla</option>
              <option value="4">RBC</option>
            </select>
            <span className={styles.ContainerInput__Span}>
              Empresa del Usuario
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="id_roles"
              onChange={handleChange}>
              <option value=""></option>
              {roles.map((row, index) => (
                <option key={index} value={row.id_roles}>{row.nombre_rol}</option>
              ))}
            </select>
            <span className={styles.ContainerInput__Span}>
              Rol del Usuario
            </span>
          </div>
        </div>

        <div className="Container-Beneficiario__Grid-button">
          <button onClick={()=>setshowMyModal(true)} id="button-Historial" className="Button Button--Guardar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-file-export" />
            </div>
            <span className="Button__Span Iniciar">Guardar</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormAgregarUsuario