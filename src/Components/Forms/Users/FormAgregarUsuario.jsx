import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddUsers.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormAgregarUsuario() {

  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [level, setLevels] = useState([]);
  const [company, setCompany] = useState([]);
  const [usuario, setUsuarios] = React.useState({
    email: '',
    nombre: '',
    id_nivel: 0,
    id_rol: 0,
    id_empresa: 0,
    id_area: 0,
    telefono: ''
  });

  const [prueba, setPrueba] = React.useState({
    auth: false,
    message: "",
    show: false
  });

  const handleOnClose = () => setshowMyModal(false)

  const Listar = () => {
    
    axios.get(`https://amordownapi-production.up.railway.app/roles/`)
      .then(function (response) {
        setRoles(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

    axios.post(`https://amordownapi-production.up.railway.app/servicios/`, {NOMBRE: ''})
      .then(function (response) {
        setAreas(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

    axios.post(`https://amordownapi-production.up.railway.app/usuarios/getLevels`, {nivel: localStorage.getItem('nivel')})
      .then(function (response) {
        setLevels(response.data);
      })
      .catch(function (error) {
        alert('No se ha encontrado un registro');
      });

    axios.get(`https://amordownapi-production.up.railway.app/usuarios/getCompany`)
      .then(function (response) {
        setCompany(response.data);
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
              autoComplete='off'
              pattern='/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i'
              name="email"
              placeholder=" "
              type="email"
              required
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
              autoComplete='off'
              pattern='^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,19}$'
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
              name="id_nivel"
              onChange={handleChange}>
              <option value=""></option>
              {level.map((row, index) => (
                <option key={index} value={row.ID_NIVEL}>{row.NIVEL}</option>
              ))}
            </select>
            <span className={styles.ContainerInput__Span}>
              Nivel del Usuario
            </span>
          </div>
        </div>

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="id_rol"
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

        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <select
              required
              className={styles.ContainerInput__Input}
              name="id_empresa"
              onChange={handleChange}>
              <option value=""></option>
              {company.map((row, index) => (
                <option key={index} value={row.id_empresa}>{row.nombre}</option>
              ))}
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
            <input
              autoComplete='off'
              name="telefono"
              placeholder=" "
              type="text"
              required
              pattern='/^\d{8}$/'
              onChange={handleChange}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Telefono del Usuario
            </span>
          </div>
        </div>

        <div className={styles.Grid__button}>
          <button id="button-Historial" className={styles.Button}>
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-user-plus" />
            </div>
            <span className={styles.Button__Span}>Guardar Usuario</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormAgregarUsuario