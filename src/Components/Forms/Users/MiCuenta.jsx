import React, { useState, useEffect } from "react";
import styles from "./MiCuenta.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_Decode from "jwt-decode";
import axios from "axios";
import {useAuth} from "../../../context/authContext.jsx"
function MiCuenta() {
  const tokenDecode = jwt_Decode(localStorage.getItem("Auth"));
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [level, setLevels] = useState([]);
  const [company, setCompany] = useState([]);
  const { Api } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const [usuario, setUsuarios] = React.useState({
    email: tokenDecode.email,
    nombre: tokenDecode.nombre,
    estado: 1,
    id_nivel: tokenDecode.nivel,
    id_rol: tokenDecode.id_roles,
    id_empresa: tokenDecode.id_empresa,
    id_area: tokenDecode.id_area,
    telefono: "",
  });

  const Listar = () => {
    axios
      .get(`${Api}roles/`)
      .then(function (response) {
        setRoles(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });

    axios
      .post(`${Api}servicios/`, {
        NOMBRE: "",
      })
      .then(function (response) {
        setAreas(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });

    axios
      .post(
        `${Api}usuarios/getLevels`,
        { nivel: tokenDecode.nivel }
      )
      .then(function (response) {
        setLevels(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });

    axios
      .get(`${Api}usuarios/getCompany`)
      .then(function (response) {
        setCompany(response.data);
      })
      .catch(function (error) {
        alert("No se ha encontrado un registro");
      });
  };

  const updateUser = (e)=>{
    e.preventDefault();
    axios
      .post(
        `${Api}usuarios/updateUsers/${tokenDecode.id}`,
        usuario
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const HabilitarDatos = (e) => {
    e.preventDefault();
    setDisabled(false);
    window.scroll(0, 0);
  };

  useEffect(() => Listar(), []);

  const handleChange = (e) => {
    setUsuarios({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const rolFilter1 = roles.filter(function (roles) {
    return roles.id_roles == "1";
  });

  const rolFilter2 = roles.filter(function (roles) {
    return roles.id_roles == "2";
  });

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Mi Cuenta</h1>

      <div className={styles.Imagen}>
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
      </div>

      <form className={styles.Form}>
        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              name="email"
              defaultValue={tokenDecode.email}
              disabled={disabled}
              placeholder=" "
              type="email"
              onChange={handleChange}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Correo Electronico
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              name="nombre"
              placeholder=" "
              type="text"
              disabled={disabled}
              onChange={handleChange}
              pattern="^[a-zA-Z]{5,20}(?:\s[a-zA-Z]{0,15})?$"
              defaultValue={tokenDecode.nombre}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Nombre</span>
          </div>
        </div>

        {disabled ? null : (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                className={styles.ContainerInput__Input}
                name="id_nivel"
                onChange={handleChange}
              >
                <option value=""></option>
                {level.map((row, index) => (
                  <option key={index} value={row.ID_NIVEL}>
                    {row.NIVEL}
                  </option>
                ))}
              </select>
              <span className={styles.ContainerInput__Span}>
                Nivel del Usuario
              </span>
            </div>
          </div>
        )}

        {disabled ? (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <input
                name="nivel"
                placeholder=" "
                type="text"
                disabled={disabled}
                value={tokenDecode.nivel}
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Nivel</span>
            </div>
          </div>
        ) : null}

        {disabled ? null : (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <select
                required={
                  usuario.id_nivel == 1 || usuario.id_nivel == 2 ? true : false
                }
                className={styles.ContainerInput__Input}
                name="id_rol"
                onChange={handleChange}
              >
                <option value=""></option>
                {usuario.id_nivel == 1
                  ? rolFilter1.map((row, index) => (
                      <option key={index} value={row.id_roles}>
                        {row.nombre_rol}
                      </option>
                    ))
                  : usuario.id_nivel == 2
                  ? rolFilter2.map((row, index) => (
                      <option key={index} value={row.id_roles}>
                        {row.nombre_rol}
                      </option>
                    ))
                  : roles.map((row, index) => (
                      <option key={index} value={row.id_roles}>
                        {row.nombre_rol}
                      </option>
                    ))}
              </select>
              <span className={styles.ContainerInput__Span}>
                Rol del Usuario
              </span>
            </div>
          </div>
        )}

        {disabled ? (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <input
                name="rol"
                placeholder=" "
                type="text"
                disabled={disabled}
                value={tokenDecode.nombre_rol}
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Rol</span>
            </div>
          </div>
        ) : null}

        {disabled ? null : (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <select
                required
                className={styles.ContainerInput__Input}
                name="id_empresa"
                onChange={handleChange}
              >
                <option value=""></option>
                {company.map((row, index) => (
                  <option key={index} value={row.id_empresa}>
                    {row.nombre}
                  </option>
                ))}
              </select>
              <span className={styles.ContainerInput__Span}>
                Empresa del Usuario
              </span>
            </div>
          </div>
        )}

        {disabled ? (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <input
                name="direccion"
                value={tokenDecode.direccion}
                disabled={disabled}
                placeholder=" "
                type="text"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Empresa</span>
            </div>
          </div>
        ) : null}

        {disabled ? null : (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <select
                required={
                  usuario.id_nivel == 1 || usuario.id_nivel == 2 ? false : true
                }
                className={styles.ContainerInput__Input}
                name="id_area"
                onChange={handleChange}
              >
                <option value=""></option>
                {usuario.id_nivel == 1 || usuario.id_nivel == 2
                  ? null
                  : areas.map((row, index) => (
                      <option key={index} value={row.ID_AREA}>
                        {row.NOMBRE}
                      </option>
                    ))}
              </select>
              <span className={styles.ContainerInput__Span}>
                Area del Usuario
              </span>
            </div>
          </div>
        )}

        {disabled ? (
          <div className={styles.Form__item}>
            <div className={styles.ContainerInput}>
              <input
                name="area"
                disabled={disabled}
                value={tokenDecode.nombre_area}
                placeholder=" "
                type="text"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Area</span>
            </div>
          </div>
        ) : null}

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              name="telefono"
              disabled={disabled}
              value={tokenDecode.telefono}
              placeholder=" "
              type="text"
              pattern="^\d{8}$"
              required
              onChange={handleChange}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Numero de Telefono
            </span>
          </div>
        </div>

        {disabled ? null : (
          <div className={styles.Form__item}>
            <button onClick={updateUser} className={styles.Button}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
              </div>
              <span className={styles.Button__Span}>Actualizar Datos</span>
            </button>
          </div>
        )}

        {disabled ? (
          <div className={styles.Form__item}>
            <button onClick={HabilitarDatos} className={styles.Button}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
              </div>
              <span className={styles.Button__Span}>Actualizar Datos</span>
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default MiCuenta;
